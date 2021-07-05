import Vue from 'vue'
import App from './App.vue'

import router from './router' //自动扫描路由配置
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios);

import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
Vue.component("mavon-editor", mavonEditor);

import animated from 'animate.css'
Vue.use(animated);

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import API from './api'
Vue.prototype.$api = API;
Vue.config.productionTip = false;
Vue.use(require('vue-moment'));

new Vue({
    render: h => h(App),
    router, //直接使用即可
    store,
    components: {
        App
    },
}).$mount('#app');
