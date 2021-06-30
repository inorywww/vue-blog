//导入vue和vue-router组件
import Vue from "vue"
import VueRouter from "vue-router";

const Home = () => import('../view/Home') //组件懒加载
const Login = () => import('../view/Login')
const Register = () => import('../view/Register')
const Article = () => import('../view/Article')
const Tags = () => import('../view/Tags')
//安装路由，相当于类的实例化操作
Vue.use(VueRouter);

const routes=[
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
        component: Login
    },
    {
        path: '/register',
        meta: {
            title: 'register'
        },
        component: Register
    },
    {
        path: '/article/:id',
        meta: {
            title: 'article'
        },
        component: Article
    },
    {
        path: '/tags/:id',
        meta: {
            title: 'tags'
        },
        component: Tags
    },
]

const router = new VueRouter({
    mode: 'history',
    routes,
})

export default router;

