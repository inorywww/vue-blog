```js
import Vuex from 'vuex'
Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        headerIsShow:'',
    },
     mutations: {
        updateShow(state,show){
            state.headerIsShow = show;
        }
    }
})
new Vue({
    store,
}).$mount('#app')

```

```bash
npm install vuex --save
```

修改：

```js
this.$store.commit('updateShow','header-hidden');//修改值
```

使用：

```js
let themes = this.$store.state.themes;
```

