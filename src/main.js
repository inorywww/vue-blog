import Vue from 'vue'
import App from './App.vue'

import router from './router' //自动扫描路由配置
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'

import animated from 'animate.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import 'github-markdown-css/github-markdown.css'
// import base from './base'//全局函数
// Vue.use(base);//将全局函数当做插件来进行注册

Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.use(Vuex);
Vue.use(VueAxios, axios);
Vue.use(animated)
Vue.use(require('vue-moment'));

const store = new Vuex.Store({
    state: {
        themes: {
            themeDark: {
                bodyColor: '#171D20',
                cardColor: '#2F3133',
                fontColor: '#F4F4F4',
            },
            themeLight: {
                bodyColor: '#F4F4F4',
                cardColor: '#FFFFFF',
                fontColor: '#171D20',
            }
        },
        headerIsShow: '',
    },
    mutations: {
        updateShow(state, show) {
            state.headerIsShow = show;
        }
    }
})

new Vue({
    render: h => h(App),
    router, //直接使用即可
    store,
    components: {
        App
    },
}).$mount('#app')
