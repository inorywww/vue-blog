module.exports = {
    devServer: {
        disableHostCheck: true,
        port: 7070,
        proxy: 'http://localhost:3000/'
    },
    lintOnSave: false,

}
