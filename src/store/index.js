import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"
import fa from "element-ui/src/locale/lang/fa";
Vue.use(Vuex);
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
        allArticles:[],
        showListOrTable:{
            article:false,
            tags:false,
            archive:false,
        },
        articleShowList:false,
        isLoading:true,
    },
    mutations: {
        updateShow(state, show) {
            state.headerIsShow = show;
        },
        changeShowWay(state,el){
            state.showListOrTable[el] = !state.showListOrTable[el];
        }
    },
    plugins: [createPersistedState()]
});
export default store
