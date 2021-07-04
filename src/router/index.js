//导入vue和vue-router组件
import Vue from "vue"
import VueRouter from "vue-router";

//组件懒加载
const Index = () => import('@/view/home/Index');
const notFoundError = () => import('@/view/404/Index');
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
                path: '/tags/:id',
                meta: {
                    title: '标签列表'
                },
                component: () => import('@/view/home/Tags')
            },
        ]
    },

    {
        path: '/404',
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

export default router;