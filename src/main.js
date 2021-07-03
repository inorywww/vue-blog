import Vue from 'vue'
import App from './App.vue'

import router from './router' //自动扫描路由配置
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'

import animated from 'animate.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// import base from './base'//全局函数
// Vue.use(base);//将全局函数当做插件来进行注册

Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(VueAxios, axios);
Vue.use(animated);
Vue.use(require('vue-moment'));


new Vue({
    render: h => h(App),
    router, //直接使用即可
    store,
    components: {
        App
    },
}).$mount('#app');
