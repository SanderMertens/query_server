
Vue.component('error', {
    props: ['data'],
    template: `
      <div class="query" v-if="data.error">
        <template v-if="data && !data.valid">
            <span class="error">{{data.error}}</span>
        </template>
      </div>
      `
  });
