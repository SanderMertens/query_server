
Vue.config.devtools = true;

function request(url, onmsg, onloadend) {
  const Http = new XMLHttpRequest();
  Http.open("GET", url);
  if (onloadend) {
    Http.onloadend = function() { onloadend(Http); };
  }
  Http.send();
  Http.onreadystatechange = (e)=>{
    if (Http.readyState == 4) {
      if (Http.responseText && Http.responseText.length) {
        onmsg(JSON.parse(Http.responseText));
      } else {
        onmsg({});
      }
    }
  }
}

var app = new Vue({
  el: '#app',

  methods: {
    query_on_changed(e) {
      this.query = e.query;

      if (!this.query || !this.query.length) {
        this.data = undefined;
        this.error = false;
        return;
      }

      host = this.host;
      let url = this.host + "query";
      if (this.query && this.query.length) {
        url += "?expr=" + encodeURIComponent(this.query);
      }

      request(url, 
        // On message received
        (msg) => {
          this.data = msg;
          this.error = !msg.valid;
          this.query_ok = this.query;
        }, 
        // On load end
        (Http) => {
          if(Http.status == 404) {
            this.error = true;
          }
        });      
    },

    example_clicked(e) {
      this.$refs.query.set_query(e);
    }
  },

  data: {
    host: window.location.href,
    query: "",
    query_ok: "",
    error: false,
    data: undefined,
    entity: undefined
  }
});
