//导入vue和vue-router组件
import Vue from "vue"
import VueRouter from "vue-router";

const Home = () => import('../view/Home'); //组件懒加载
const Login = () => import('../view/Login');
const Register = () => import('../view/Register');
const Article = () => import('../view/Article');
const Tags = () => import('../view/Tags');

const notFoundError = () => import('../view/404');
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
    {
        path: '/404',
        meta: {
            title: '404'
        },
        component: notFoundError
    },
];

const router = new VueRouter({
    mode: 'history',
    routes,
    scrollBehavior(to,from,saveTop){
        if(saveTop){
            return saveTop;
        }else{
            return {x:0,y:0}
        }
    },
});

export default router;

