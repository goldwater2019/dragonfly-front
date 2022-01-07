import Vue from 'vue'
import App from './App.vue'
import store from "@/store";

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

Vue.config.productionTip = false

Vue.use(Antd);

// /* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   components: { App },
//   template: '<App/>',
// });


new Vue({
  render: h => h(App),
  store
}).$mount('#app')
