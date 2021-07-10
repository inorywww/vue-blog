//导入vue和vue-router组件
import Vue from "vue"
import VueRouter from "vue-router";
import store from '../store';
import { getToken } from "@/utils/auth";
import { alertInfo } from "@/utils/index";
//组件懒加载
const Index = () => import('@/view/home/Index');
const notFoundError = () => import('@/view/404/Index');
const Login = () => import('@/view/login/Index')
Vue.use(VueRouter);

const routes = [{
        path: '/',
        redirect: '/home',
        component: Index,
        children: [{
                path: 'home',
                name: 'Home',
                component: () => import('@/view/home/Home'),
                meta: {
                    title: 'inroyww的博客'
                }
            },
            {
                path: 'article',
                meta: {
                    title: '文章列表'
                },
                component: () => import('@/view/home/Articles')
            },
            {
                path: '/article/:id',
                meta: {
                    title: 'articleDetail'
                },
                component: () => import('@/view/home/ArticleDetail')
            },
            {
                path: '/tags',
                meta: {
                    title: '标签列表'
                },
                component: () => import('@/view/home/Tags')
            },
            {
                path:'/says',
                meta:{
                    title:'碎碎念',
                },
                component: () => import('@/view/home/Says')
            },
            {
                path: '/archive',
                meta: {
                    title: '归档'
                },
                component: () => import('@/view/home/Archive')
            },
            {
                path:'/about',
                meta:{
                    title:'关于我'
                },
                component:() => import('@/view/home/AboutMe')
            },
            {
                path:'/message',
                meta: {
                    title:'留言'
                },
                component: () => import('@/view/home/GuestMessage')
            }
        ]
    },
    {
        path:'/login',
        meta:{
            title:'管理员登录'
        },
        component: Login
    },
    {
        path:'/dashboard',
        meta:{
            title:'管理面板',
            requireAuth:true,
        },
        component: () => import('@/view/admin/DashBoard'),
    },
    {
        path: '*',
        name:'/404',
        meta: {
            title: '这里什么都没有'
        },
        component: notFoundError
    },
];

const router = new VueRouter({
    mode: 'history',
    routes,
    // 跳转路由的时候返回到最顶端
    scrollBehavior(to, from, saveTop) { 
        if (saveTop) {
            return saveTop;
        } else {
            return {
                x: 0,
                y: 0
            }
        }
    },
});

// 路由发生变化修改页面title
router.beforeEach( (to, from, next) => {
    // 判断当前页面是否需要授权
    if(to.meta.requireAuth){
        if(!getToken()){
            alertInfo('尚未授权！','error');
            next('/login');
            return;
        }
    }
    if (to.meta.title) {
        if (to.meta.title!=='articleDetail') {
            document.title = to.meta.title;
            store.state.isShowComment = false;
        }
        // 显示评论顶部评论按钮
        else{
            store.state.isShowComment = true;
        }
    }
    next()
});

export default router;