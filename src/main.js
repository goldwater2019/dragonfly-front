import Vue from 'vue'
import App from './App.vue'
import store from "@/store";

import router from './router'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';


Vue.config.productionTip = false

Vue.use(Antd);
Vue.use(ElementUI);

// /* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   components: { App },
//   template: '<App/>',
// });

import './assets/css/style.css';


new Vue({
  router,
  render: h => h(App),
  store
}).$mount('#app')
