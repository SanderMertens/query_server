
Vue.component('info', {
    data: function() {
        return {
          text: ""
        }
    },
    methods: {
      set_info(text) {
        this.text = text;
      }
    },
    template: `
      <div class="info" v-if="text && text.length">
          <span class="prompt">&gt;</span> <span>{{text}}</span>
      </div>
      `
  });
