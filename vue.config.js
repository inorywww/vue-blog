module.exports = {
    outputDir:'dist',
    assetsDir:'static',
    
    lintOnSave: false,
    runtimeCompiler: true,
    devServer: {
        open: true,
        host: "localhost", 
        port: 7070,
        https: false, //协议
        hotOnly:false,
        proxy: {  
            '/api': {  
                // 'http://49.234.17.206:5000/api/',http://localhost:5000/api/
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
