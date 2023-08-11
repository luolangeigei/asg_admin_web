module.exports = {
  // 开启代理服务器（方式二）
  devServer: {
    proxy: {
      //请求前缀是api才开启代理服务器
      '/api': {
        target: 'https://124.223.35.239',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api'
        }
    },
  },
  port: 8080,
  host: 'localhost',
 }
}
