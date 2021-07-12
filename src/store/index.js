import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"
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
        isShowComment:false,
        isCollapse:false,
        allTabs:[],
        currentView:'Home'
    },
    mutations: {
        delAllTab(state){
            state.allTabs = [];
        },
        addTab(state,tab){
            const isHas = state.allTabs.find(item => {
                return item.name === tab.name 
            });
            if(!isHas){ // 不存在才加入
                state.allTabs.push(tab);
            }
        },
        delTab(state,name){
            state.allTabs = state.allTabs.filter(item => {
                return item.name !== name
            })
        },
        changeCurrentView(state,cv){
            state.currentView = cv;
        },
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
