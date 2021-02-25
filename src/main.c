#include <query_server.h>

static ecs_strbuf_t err_buf = ECS_STRBUF_INIT;
bool str_set = false;

static 
void capture_error(
    const char *fmt,
    va_list args)
{
    if (!str_set) {
        ecs_strbuf_vappend(&err_buf, fmt, args);
        str_set = true;
    }
}

char* get_error() {
    str_set = false;
    return ecs_strbuf_get(&err_buf);
}

static
char *eval_query(
    ecs_world_t *world,
    const char *expr)
{
    ecs_strbuf_t reply = ECS_STRBUF_INIT;

    ecs_strbuf_list_push(&reply, "{", ",");

    ecs_rule_t *r = ecs_rule_new(world, expr);
    if (r) {
        bool is_true = false;
        bool has_this = false;

        char *str = ecs_rule_str(r);
        printf("%s\n", str);
        ecs_os_free(str);

        ecs_strbuf_list_appendstr(&reply, "\"valid\": true");

        /* List variable names */
        ecs_strbuf_list_appendstr(&reply, "\"variables\":");
        ecs_strbuf_list_push(&reply, "[", ",");

        int32_t var_count = ecs_rule_variable_count(r);
        for (int i = 0; i < var_count; i ++) {
            if (!strcmp(ecs_rule_variable_name(r, i), ".")) {
                has_this = true;
            }
            if (!ecs_rule_variable_is_entity(r, i)) {
                continue;
            }
            const char *var_name = ecs_rule_variable_name(r, i);
            ecs_strbuf_list_append(&reply, "\"%s\"", var_name);
        }

        ecs_strbuf_list_pop(&reply, "]");

        if (has_this) {
            ecs_strbuf_list_appendstr(&reply, "\"has_this\": true");
        } else {
            ecs_strbuf_list_appendstr(&reply, "\"has_this\": false");
        }

        ecs_strbuf_list_appendstr(&reply, "\"results\":");
        ecs_strbuf_list_push(&reply, "[", ",");

        ecs_iter_t it = ecs_rule_iter(r);
        while (ecs_rule_next(&it)) {
            /* Begin result */
            ecs_strbuf_list_next(&reply);
            ecs_strbuf_list_push(&reply, "{", ",");

            /* Output variables */
            ecs_strbuf_list_appendstr(&reply, "\"variables\":");
            ecs_strbuf_list_push(&reply, "[", ",");
            for (int i = 0; i < var_count; i ++) {
                if (!ecs_rule_variable_is_entity(r, i)) {
                    continue;
                }
                ecs_entity_t var = ecs_rule_variable(&it, i);
                const char *var_value = ecs_get_name(world, var);
                ecs_strbuf_list_append(&reply, "\"%s\"", var_value);
            }
            ecs_strbuf_list_pop(&reply, "]");

            /* Output entities */
            ecs_strbuf_list_appendstr(&reply, "\"entities\":");
            ecs_strbuf_list_push(&reply, "[", ",");
            for (int i = 0; i < it.count; i ++) {
                const char *var_value = ecs_get_name(world, it.entities[i]);
                ecs_strbuf_list_append(&reply, "\"%s\"", var_value);
            }
            ecs_strbuf_list_pop(&reply, "]");

            /* End result */
            ecs_strbuf_list_pop(&reply, "}");

            is_true = true;
        }

        ecs_strbuf_list_pop(&reply, "]");

        if (is_true) {
            ecs_strbuf_list_appendstr(&reply, "\"is_true\": true");
        } else {
            ecs_strbuf_list_appendstr(&reply, "\"is_true\": false");
        }

        ecs_rule_free(r);
    } else {
        ecs_strbuf_list_append(&reply, "\"valid\": false");

        char *err = get_error();
        ecs_strbuf_list_append(&reply, "\"error\": \"%s\"", err);
        ecs_os_free(err);
    }

    ecs_strbuf_list_pop(&reply, "}");

    return ecs_strbuf_get(&reply);
}

static
bool endpoint_query(
    ecs_world_t *world,
    ecs_entity_t entity,
    EcsHttpEndpoint *endpoint,
    EcsHttpRequest *request,
    EcsHttpReply *reply)
{
    char buffer[1024];

    if (ecs_http_get_query_param(
        request->params, "expr", buffer, sizeof(buffer)))
    {
        reply->body = eval_query(world, buffer);
    }

    return true;
}

static
bool endpoint_files(
    ecs_world_t *world,
    ecs_entity_t entity,
    EcsHttpEndpoint *endpoint,
    EcsHttpRequest *request,
    EcsHttpReply *reply)
{
    const char *file = request->relative_url;
    char path[1024];

    if (!file || !strlen(file)) {
        file = "index.html";
    }

    sprintf(path, "etc/%s", file);

    FILE *f = fopen(path, "r");
    if (!f) {
        return false;
    } else {
        fclose(f);
    }

    reply->body = ecs_os_strdup(path);
    reply->is_file = true;

    return true;
}

int main(int argc, char *argv[]) {
    bake_set_os_api();

    ecs_os_api.log_error_ = capture_error;

    ecs_world_t *world = ecs_init();

    ECS_IMPORT(world, FlecsComponentsHttp);
    ECS_IMPORT(world, FlecsSystemsCivetweb);

    // Load database
    if (ecs_plecs_from_file(world, "db.plecs")) {
        printf("failed to load db.plecs\n");
    }  

    // Create HTTP server
    ecs_entity_t server = ecs_set(world, 0, EcsHttpServer, {.port = 9000});
          ecs_entity_t e_query = ecs_new_w_entity(world, ECS_CHILDOF | server);
            ecs_set(world, e_query, EcsName, {"e_query"});
            ecs_set(world, e_query, EcsHttpEndpoint, {
                .url = "query",
                .action = endpoint_query,
                .synchronous = true,
                .ctx = NULL
            });

    ecs_entity_t e_files = ecs_new_w_entity(world, ECS_CHILDOF | server);
        ecs_set(world, e_files, EcsHttpEndpoint, {
            .url = "",
            .action = endpoint_files
        });  

    ecs_set_target_fps(world, 60);

    while (ecs_progress(world, 0)) {
    }

    /* Cleanup */
    return ecs_fini(world);
}
