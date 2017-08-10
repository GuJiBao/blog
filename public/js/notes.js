$(function () {

  // 新增笔记
  $('#notesAddForm').validate({
    submitHandler: function(form) {
      var data = {
        noteClassify: form.classify.value,
        title: $.trim(form.title.value),
        description: $.trim(form.description.value),
        content: $.trim(form.content.value)
      };
      $.ajax({
        type: 'post',
        url: '/admin/notes/add',
        data: data,
        success: function (result) {
          if (!result.code) {
            Layer.confirm_add('内容添加成功！是否跳转到学习笔记列表页面？', '/admin/notes');
          } else {
            Layer.msg_lose(result.msg);
          }
        }
      });
    },
    rules: {
      classify: {
        required: true
      },
      title: {
        required: true
      },
      description: {
        required: true
      },
      content: {
        required: true
      }
    },
    messages: {
      classify: {
        required: '分类不能为空'
      },
      title: {
        required: '内容标题不能为空'
      },
      description: {
        required: '内容简介不能为空'
      },
      content: {
        required: '内容不能为空'
      }
    }
  });

  // 笔记的编辑
  $('#notesEditForm').validate({
    submitHandler: function(form) {
      var data = {
        id: form.noteId.value,
        noteClassify: form.classify.value,
        title: $.trim(form.title.value),
        description: $.trim(form.description.value),
        content: $.trim(form.content.value)
      }
      $.ajax({
        type: 'post',
        url: '/admin/notes/edit',
        data: data,
        success: function (result) {
          if (!result.code) {
            Layer.confirm_add('内容编辑成功！是否跳转到学习笔记列表页面？', '/admin/notes');
          } else {
            Layer.msg_lose(result.msg);
          }
          console.log(result);
        }
      });
    },
    rules: {
      classify: {
        required: true
      },
      title: {
        required: true
      },
      description: {
        required: true
      },
      content: {
        required: true
      }
    },
    messages: {
      classify: {
        required: '分类不能为空'
      },
      title: {
        required: '内容标题不能为空'
      },
      description: {
        required: '内容简介不能为空'
      },
      content: {
        required: '内容不能为空'
      }
    }
  });

  // 笔记的删除
  $('.delBtn').on('click', function () {
    var id = $(this).attr('data-id');
    Layer.confirm_del(function () {
      $.ajax({
        type: 'get',
        url: '/admin/notes/delete?id=' + id,
        success: function (result) {
          if(!result.code) {
            Layer.msg_success('删除成功！');
          } else {
            Layer.msg_lose('删除失败！');
          }
        }
      });
    });


  });

});
