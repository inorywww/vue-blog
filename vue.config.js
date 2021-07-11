module.exports = {
    lintOnSave: false,
    runtimeCompiler: true,
    devServer: {
        open: true,
        host: "localhost", 
        port: 7070,
        https: false, //协议
        hotOnly:false,
        proxy: {  // 开发环境代理配置
            '/api': {  // 当请求是api开头的请求，都走代理
                // 目标服务器地址
                target: 'http://localhost:5000/api/',
                ws:true,
                changeOrigin: true,   
                pathRewrite: {
                    '^/api': '/',
                }
            }
        },
    },
    chainWebpack: config => {
        config.module.rule('md')
            .test(/\.md/)
            .use('vue-loader')
            .loader('vue-loader')
            .end()
            .use('vue-markdown-loader')
            .loader('vue-markdown-loader/lib/markdown-compiler')
            .options({
                raw: true
            })
    },
};
