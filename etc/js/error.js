
Vue.component('error', {
    props: ['data'],
    template: `
      <div class="error" v-if="data && data.error">
        <template v-if="data && !data.valid">
            <span class="error">{{data.error}}</span>
        </template>
      </div>
      `
  });
