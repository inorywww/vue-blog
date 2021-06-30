module.exports = {
    devServer: {
        disableHostCheck: true,
        port: 7070,
        proxy: 'http://localhost:3000/'
    },
    chainWebpack: config => {
        config.module
            .rule("md")
            .test(/\.md$/)
            .use("vue-loader")
            .loader("vue-loader")
            .end()
            .use("vue-markdown-loader")
            .loader("vue-markdown-loader/lib/markdown-compiler")
            .options({
                raw: true
            });
    },
    lintOnSave: false,
    runtimeCompiler: true,
}
