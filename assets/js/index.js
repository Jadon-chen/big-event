$(function () {
    let layer = layui.layer;
    $.ajax({
        url: "/my/userinfo",
        success: function (res) {
            // console.log(res);
            if (res.status !== 0) {
                return layer.msg("获取用户信息失败")
            }
            // layer.msg("获取用户信息成功")
            //   处理头像和昵称

            let name = res.data.nickname || res.data.username;
            // console.log(name, name[0].toUpperCase());
            let first = name[0].toUpperCase();
            $("#welcome").text("欢迎" + name)

            // 处理头像
            if (res.data.user_pic) {
                // 如果有用户头像，展示用户头像，隐藏文字头像=没有就反之
                $(".layui-nav-img").show().attr("src".res.data.user_pic);
                $(".text-avatar").hide()
            } else {
                $(".layui-nav-img").hide();
                $(".text-avatar").text(first).show()
            }
        }
        // complete: function (xhr) {
        //     // 请求完成就会执行的函数（不论是失败还是成功都会执行的）
        //     // 形参可以获取到xhr对象
        //     //   console.log(xhr);
        //     if (
        //       xhr.responseJSON.status === 1 &&
        //       xhr.responseJSON.message === "身份认证失败！"
        //     ) {
        //       // 回到登录页面重新登录
        //       // 把token也清除掉
        //       localStorage.removeItem("token");
        //       location.href = "login.html";
        //     }
        //   }, 
        });      
    $("#logout").click(function () {
        layer.confirm('确认退出登录?', { icon: 3, title: '提示' }, function (index) {
            // 点击确认执行的函数
            localStorage.removeItem("token");
            location.href = "login.html";
            layer.close(index);
        });
    })
})