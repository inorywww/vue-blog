import Vue from 'vue'
import App from './App.vue'
import router from './router' //自动扫描路由配置
import Vuex from 'vuex'

import animated from 'animate.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false

Vue.use(ElementUI);
    Vue.use(Vuex);
Vue.use(animated)

const store = new Vuex.Store({
    state: {
        themes : {
            themeDark: {
                bodyColor:'#171D20',
                cardColor:'#2F3133',
                fontColor:'#F4F4F4',
            },
            themeLight:{
                bodyColor:'#F4F4F4',
                cardColor:'#FFFFFF',
                fontColor:'#171D20',
            }
        },
        headerIsShow:'',
    },
    mutations: {
        updateShow(state,show){
            state.headerIsShow = show;
        }
    }
})

new Vue({
    render: h => h(App),
    router, //直接使用即可
    store,
    components: {App},
}).$mount('#app')
