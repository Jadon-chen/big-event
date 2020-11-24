$(function () {
     // 切换页面
     // 去注册页面
     $("#gotoRegi").click(function () {
          $(".regiBox").show();
          $(".loginBox").hide();
     })
     // 去登陆页面
     $("#gotoLogin").click(function () {
          $(".regiBox").hide();
          $(".loginBox").show();
     });

     //表单校验
     //    从layui中获取到form表单的功能
     let form = layui.form;
     let layer = layui.layer;
     form.verify({
          //我们既支持上述函数式的方式，也支持下述数组的形式
          //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
          pass: [
               /^[\S]{6,12}$/
               , '密码必须6到12位，且不能出现空格'
          ],

          // 再次确认密码的校验。需要和密码框的内容保持一致==>函数写法
          repass: function (value, item) {
               // console.log( value,item );
               // 注册表单中密码框的内容
               let pwd = $(".regiBox input[name=password]").val()
               console.log(pwd);
               // 判断密码框内容是否与确认框密码保持一致
               if (value !== pwd) {
                    return "两次输入的密码不一致"
               }
          }
     });

     //    注册的ajax代码
     $("#regiForm").on("submit", function (e) {
          e.preventDefault();
          $.ajax({
               type: "POST",
               url: "/api/reguser",
               data: $(this).serialize(),
               //    data:{
               //         username,
               //         password
               //    }
               success: function (res) {
                    console.log(res);
                    if (res.status !== 0) {
                         // return console.log( "注册失败!" + res.message );
                         return layer.msg("注册失败!" + res.message);
                    }
                    // console.log( '注册成功' );
                    layer.msg('注册成功');
                    // 注册成功，去登录页面
                    $("#gotoLogin").click();
               }
          })
     }),

     $("#loginForm").on("submit",function (e) {
           e.preventDefault();
           let data=$(this).serialize();
           $.ajax({
                type:"POST",
                url:"/api/login",
                data,
                success:function (res) {
                      console.log( res );
                    if(res.status!==0) {
                         return layer.msg("登录失败")
                    }
                  
                 
               // 登录成功
               // 1.提示框==》layer.msg
               // layer.msg("登录成功，即将跳转")
               // // 2.需要将token储存到本地中（localstorage）
               localStorage.setItem("token",res.token)
               // // 3.跳转页面操作
               // location.href="index.html"
               layer.msg('登录成功，即将跳转',{
                    time:1000//一秒关闭。不设置默认三秒
               }, function(){
                    //do something
                    location.href="index.html"
                  }); 
                }
           })
     })
})