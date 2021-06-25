import Vue from 'vue'
import App from './App.vue'
import router from './router' //自动扫描路由配置
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false
Vue.use(ElementUI);
new Vue({
  render: h => h(App),
  router, //直接使用即可
  components: { App },
}).$mount('#app')
