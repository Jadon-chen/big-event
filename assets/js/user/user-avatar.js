$(function () {
    // 1.1 获取裁剪区域的 DOM 元素\
    let layer=layui.layer;
    var $image = $('#image')

    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    // 点击上传按钮，模拟点击文件域
    $("#uploadBtn").click(function () {
        $("#file").click();
    })

    $("#file").on("change", function () {
        //当选择的文件改变了。该事件就会触发
        //  如果两次选择的文件一样，该事件不会触发
        // files属性是文件域的DOM对象的属性，记录用户选择的所有文件
        // 以下代码获取到用户选择的文件
        let file = this.files[0]
        //把选择的文件得到对应的url地址
        var newImgURL = URL.createObjectURL(file)

        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })

    //上传头像
    $("#suerBtn").click(function () {
        let dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
            $.ajax({
                type: "POST",
                url: "/my/update/avatar",
                data: {
                  avatar: dataURL,
                },
                success: function (res) {
                  console.log(res);
          
                  if (res.status !== 0) {
                    return layer.msg("更换头像失败！");
                  }
          
                  layer.msg("更换头像成功！");
                  // 调用父页面（index）的函数，从而更新导航和侧边栏的头像
                  window.parent.getAvatarAndName();
                }
        })
    })
})