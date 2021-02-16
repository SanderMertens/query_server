
Vue.component('tables', {
    props: ['data', 'query'],
    template: `
      <div v-if="data && data.valid" class="ecs-table">    
        <div class="ecs-table" v-if="data.is_true && (data.variables.length || data.has_this)">
          <table>
            <thead>
              <tr>
                <th v-if="data.has_this">This (.)</th>
                <th v-for="var_name in data.variables" class="ecs-table">
                  {{var_name}}
                </th>
              </tr>
            </thead>
            <tbody>
              <template v-for="result in data.results">
                <template v-if="data.has_this">
                  <tr v-for="entity in result.entities" class="ecs-table">
                    <td>{{entity}}</td>
                    <td v-for="variable in result.variables" class="ecs-table">
                      {{variable}}
                    </td>
                  </tr>
                </template>
                <template v-else>
                  <tr class="ecs-table">
                    <td v-for="variable in result.variables" class="ecs-table">
                      {{variable}}
                    </td>
                  </tr>
                </template>
              </template>
            </tbody>
          </table>
        </div>
        <div v-else>
          <p v-if="data.is_true">
            Yes
          </p>
          <p v-else>
            No
          </p>  
        </div>
      </div>
      `
  });
