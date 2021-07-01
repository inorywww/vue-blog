# Vue-Router

# 一 基本操作

## 1.安装

```shell
npm install vue-router
```

## 2.使用

首先在src文件夹下新建router文件夹，再在router文件夹中新建index.js

然后在index.js写入以下内容

```js
// index.js
import Vue from "vue" //导入vue和vue-router组件
import VueRouter from "vue-router";
// 导入页面
const pageA = () => import('@/pages/pageA');
const pageB = () => import('@/pages/pageB');
Vue.use(VueRouter);

const routes = [
    {
        path:'/pageA',
        name:'pageA',
        component:pageA,
    },
    {
        path:'/pageB',
        name:'pageB',
        component:pageB,
    },
]

const router = new VueRouter({
     // 分为hash和history，默认为hash，hash模式下url后面会有一个#号，很丑，这里使用history模式。
    mode: 'history',
    routes,
})

export default router; // 导出
```

然后在入口文件main.js写入以下内容

```js
import router from './router' //自动扫描路由配置
new Vue({
    render: h => h(App),
    router, //直接使用即可
}).$mount('#app')
```

接下来需要在app.vue这样写

```html
<template>
    <div id="app">
        <router-view/> //必须加，不然页面无法显示
    </div>
</template>
```

然后就可以通过改变url访问pageA和pageB了，当然我们实际中不会通过改变url来访问页面，接下来说下跳转路由的几种方式

## 3.跳转路由

- 直接通过改变url访问页面：

  ```js
  http://localhost:8080/pageA
  ```

- 通过<router-link></router-link>标签跳转，这种方式就相当于使用a标签进行跳转。

  ```html
  <router-link to="/pageA">to A</router-link>
  ```

- 通过this.$router.push()方法跳转

  ```html
  <!--html -->
  <button @click="toA">to A</button>
  ```

  ```js
  //js -> methods:
  toA(){
      this.$router.push('/pageA')
  }
  ```

- 通过this.$router.go()方法跳转，该方法参数只能接受一个整数，表示向前或者先后走n个页面

  ```html
  <!--html -->
  <button @click="toForward">toForward</button>
  <button @click="toBack">toBack</button>
  ```

  ```js
  // js -> methods
  toForward(){
     //向前走一个页面，相等于window.history.forward()
      this.$router.go(1) 
  }
  toBack(){
      //向后走2个页面，相当于window.history.back()
      this.$router.go(-2) 
  }
  ```

- 下面还有一种是element-ui里面的NavMenu组件提供的路由跳转，使用非常方便，因为本人经常使用element-ui，所以在这里顺便一提。

  在NavMenu里面有个属性是router，官方文档解释是：是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转，

  链接：https://element.eleme.cn/#/zh-CN/component/menu

  具体使用方法：

  ```html
  <!--html -->
  <div id="app">
       <!--这里写router，然后子菜单加上index="page"-->
      <el-menu router>
          <el-menu-item index="/pageA">toA</el-menu-item>
          <el-menu-item index="/pageB" 
                        :route="{ path: '/pageB', query: { id:3 } }"><!-- 传参 -->
              toB
          </el-menu-item>
  	</el-menu>
  	<router-view/> <!--必须加上，用于渲染其他组件-->
  </div>
  
  ```

# 二 路由传参



# 三 子路由

## 一层路由

### root容器（App.vue）

```html
<el-container>
        <h3>this is home</h3>
        <template v-for="(item,index) in items">
            <template>
                <el-button :index="item.pageName" :key="index" @click="toOther(item.pageName)">
                    <template>{{ item.title }}<br></template>
                </el-button>
            </template>
        </template>
    </el-container>
```

### 路由写法

```js
const route = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/home',
            name: 'home',
            //跳转的组件
            component: Home,
            children: []
        },
        {
            path: '/login',
            meta: {
                title: 'login'
            },
            component:Login
        },
        {
            path: '/register',
            meta: {
                title: 'register'
            },
            component: Register
        }
    ]
})
export default route;
```

​	Root的子路由展示是在Root中的，切换路由其实只是切换了`router-view`容器的内容

## 二层路由

### profile容器

```html
<div>
    <h1>profile</h1>
    <!-- 承载profile子路由的容器 -->
    <router-view />
  </div>
```

### profile子路由

```json
[
  {
    path: '/profile'
    component: profile, // 此处不能少
    children: [
      {
        path: '/profile/list',
        component: profileList
      },
      {
        path: '/profile/item',
        component: profileItem
      }
    ]
  },
  ...
]
```

任何子路由都是在其父路由的组件中切换显示，不管是多少层的路由嵌套，都是这样的理解，所以父路由需要有以下两点，二者缺一不可

- 有组件引用
- 组件中有router-view组件

## 缺点：

- 单页面，无法记住前进后退的位置

