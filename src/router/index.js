//导入vue和vue-router组件
import Vue from "vue"
import VueRouter from "vue-router";

const Home = () => import('../view/home/Home'); //组件懒加载
const ArticleDetail = () => import('../view/home/ArticleDetail');
const Tags = () => import('../view/home/Tags');
const Articles = () => import('../view/home/Articles');
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
        component: Home,
    },
    {
        path: '/article',
        meta: {
            title: 'article'
        },
        component: Articles
    },
    {
        path: '/article/:id',
        meta: {
            title: 'article/:id'
        },
        component: ArticleDetail
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

