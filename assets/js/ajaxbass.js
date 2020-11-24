//ajax的基本配置
$.ajaxPrefilter(function (options) {
    // 在每次jQ发送ajax请求前会执行该函数，通过该函数的形参options可以获取到ajax的配置项
    // 修改每次请求前的配置项
    options.url="http://ajax.frontend.itheima.net"+options.url
    console.log( options.url );
})