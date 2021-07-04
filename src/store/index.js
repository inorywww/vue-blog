import Vue from 'vue'
import Vuex from 'vuex'
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
    },
    mutations: {
        updateShow(state, show) {
            state.headerIsShow = show;
        }
    }
});
export default store
