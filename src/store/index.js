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
        articleShowList:false,
    },
    mutations: {
        updateShow(state, show) {
            state.headerIsShow = show;
        },
        changeArticleShow(state){
            state.articleShowList = !state.articleShowList;
        }
    },
    plugins: [createPersistedState()]
});
export default store
