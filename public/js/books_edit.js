$(function () {
  // 接口
  var bookEditUrl = '/admin/books/edit';  // 书籍的编辑保存接口

  // 封面接口
  var coverUrl = '/admin/books/uploadCover';  // 上传封面图片的接口
  var delCoverUrl = '/admin/books/delCover';  // 删除封面图片的接口
  var picSaveUrl = '/admin/books/editCover'; // 图片的上传替换接口

  // 变量
  var bookId = $('#bookId').val();
  var picPath = '/public/images/book/'; // 图片的保存路径

  // 书籍封面上传
  var $coverPic = $('#coverPic');
  var $coverPath = $('#coverPath');

  $('#coverFile').on('change', function() {
    var formData = new FormData($('#booksEditForm')[0]);

    if(!/\.(jpg|jpeg|png)$/i.test(this.value)) {
      Layer.msg_lose('图片格式不对，只支持png和jpg格式图片');
      this.value = '';
      return false;
    }

    var oldCoverPath = $coverPath.val() || '';  // 获取上一个封面图片名称
    var _this = this;
    $.ajax({
      url: coverUrl,
      type: 'POST',
      data: formData,
      /**
       * 必须false才会避开jQuery对 formdata 的默认处理
       * XMLHttpRequest会对 formdata 进行正确的处理
       */
      processData: false,
      /**
       *必须false才会自动加上正确的Content-Type
       */
      contentType: false,
      success: function(result) {
        if(!result.code) {
          // 保存图片名称到数据库
          var cover = result.coverPath;
          $.ajax({
            type: 'GET',
            url: picSaveUrl + '?id='+ bookId + '&cover='+ cover,
            success: function(result) {
              if(!result.code) {  // 保存成功删除，之前的图片
                if(oldCoverPath) { // 删除之前的图片
                  delCover(oldCoverPath);
                }
                // 设置图片
                $coverPath.val(cover);
                // 显示图片
                $coverPic.attr('src', picPath + cover);
              } else {
                Layer.msg_lose('图片上传失败，请重新上传！');
              }
            }
          });
        } else {
          Layer.msg_lose(result.msg);
          _this.value = '';
        }
      }
    })
  });

  // 删除封面图片
  function delCover(path) {
    $.ajax({
      type: 'GET',
      url: delCoverUrl + '?oldCoverPath=' + path,
      success: function(str) {

      }
    });
  }

  $('#booksEditForm').validate({
    submitHandler: function(form) {
      var data = {
        id: form.bookId.value,
        name: $.trim(form.name.value),
        bookClassify: form.classify.value,
        description: $.trim(form.description.value),
        cover: form.coverImg.value,
        downloadLink: $.trim(form.downloadLink.value),
        downloadPw: $.trim(form.downloadPw.value)
      };
      $.ajax({
        type: 'post',
        url: bookEditUrl,
        data: data,
        success: function (result) {
          if (!result.code) {
            Layer.confirm_add('书籍内容编辑成功！是否跳转到书籍资料列表页面？', '/admin/books');
          } else {
            Layer.msg_lose(result.msg);
          }
        }
      });
    },
    rules: {
      name: {
        required: true
      },
      classify: {
        required: true
      },
      description: {
        required: true
      },
      downloadLink: {
        required: true
      },
      downloadPw: {
        required: true
      }
    },
    messages: {
      name: {
        required: '书籍名称不能为空'
      },
      classify: {
        required: '书籍分类不能为空'
      },
      description: {
        required: '书籍简介不能为空'
      },
      downloadLink: {
        required: '书籍下载链接不能为空'
      },
      downloadPw: {
        required: '下载密码不能为空'
      }
    }
  });
});
