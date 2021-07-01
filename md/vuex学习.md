# 一 基本操作

## 1.vuex安装

```shell
npm install vuex
```

## 2.使用

首先在src下面新建文件夹为store，然后在下面新建index.js，在index.js里面写入以下内容

```js
//  src/store/index.js
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        count: 0,
    },
    mutations: {//用于更改数据，使用this.$store.commit('add',num)
        add(state,num) {
            state.count+=num;
        }
    }
})
export default store
```

然后在main.js引用store

```js
//  src/main.js
import store from './store'; 
new Vue({
    store,
  	render: h => h(App),
}).$mount('#app');
```

具体使用：

```html
 <!-- html -->
<h2>{{$store.state.count}}</h2>
<input type="number" v-model="count">
<button @click="addCount">+</button>
```

```js
// js
data() {
    return {
        count:0,
    }
},
methods: {
    addCount(){
        this.$store.commit('add',Number(this.count))//更改数据
    },
}
```