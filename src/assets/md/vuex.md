# Vue-Router

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
