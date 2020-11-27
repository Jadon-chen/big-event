$(function () {
  // 发送ajax获取用户的基本信息

  let form = layui.form;
  let layer = layui.layer;

  getInfo();
  function getInfo() {
    $.ajax({
      url: "/my/userinfo",
      success: function (res) {
        console.log(res);
        if (res.status !== 0) {
          return layer.msg("获取用户基本信息失败！");
        }

        //   获取信息成功，把响应回来的数据填充到form中
        // 给表单赋值 语法：form.val('filter', object);
        // userForm 即 class="layui-form" 所在元素属性 lay-filter="" 对应的值
        form.val("userForm", res.data);
        //   需要注意：给表单赋值，这个是按照name属性来一一对应的
      },
    });
  }

  //   重置功能
  $("#resetBtn").click(function (e) {
    e.preventDefault();
    // 再次发送ajax获取数据，填充到form中
    getInfo();
  });

  // 修改功能
  $("#userForm").submit(function (e) {
    e.preventDefault();
    let data = $(this).serialize();
    $.ajax({
      url: "/my/userinfo",
      type: "POST",
      data,
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("修改用户信息失败")
        }
        layer.msg("修改用户信息成功")
 
        // 通过window.parent可以获取到index.html，把之前获取用户信息封装成全局函数，再次调用即可
        window.parent.getAvatarAndName();
      }
    })
  })
  // 表单验证功能
  form.verify({
    nickname: function (value, item) {
      if (value.length > 6) {
        return "请输入1-6之间的字符"
      }
    }
  });

});
