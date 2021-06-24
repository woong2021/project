import Vue from 'vue'
import App from './App.vue'
import ChartPlugin from './pluging/ChartPlugin.js';

Vue.config.productionTip = false

Vue.use(ChartPlugin);

new Vue({
  render: h => h(App),
}).$mount('#app')