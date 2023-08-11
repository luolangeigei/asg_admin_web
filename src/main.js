import Vue from 'vue'
import App from './App.vue'
import VueRouter from  'vue-router'
//引入路由器
import router from './router'
Vue.use(VueRouter)
//引入store
import store from './store/index'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import SlideVerify from 'vue-monoplasty-slide-verify';

Vue.use(SlideVerify);
Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
