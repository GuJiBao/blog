$(function() {
  // 添加、修改菜单弹框html
  var getNoteClassifyPopHtml = function(data) {
    var id = data && data._id || '';
    var order = data && data.order || '';
    var name = data && data.name || '';
    var url = data && data.url || '';
    var html = '<div class="page-pop">';
    html += '<form class="form-horizontal">';
    html += '<div class="form-group">';
    html += '<label for="order" class="col-md-3 control-label">序号：</label>';
    html += '<div class="col-md-7"><input type="text" class="form-control" name="order" value="'+ order +'" id="order"></div>';
    html += '</div>';
    html += '<div class="form-group">';
    html += '<label for="name" class="col-md-3 control-label">分类名称：</label>';
    html += '<div class="col-md-7"><input type="text" class="form-control" name="name" value="'+ name +'" id="name"></div>';
    html += '</div>';
    html += '<div class="form-group">';
    html += '<label for="url" class="col-md-3 control-label">分类导航：</label>';
    html += '<div class="col-md-7"><input type="text" class="form-control" name="url" value="'+ url +'" id="url"></div>';
    html += '</div>';
    html += '<div class="form-group">';
    if (id) {
      html += '<input type="hidden" name="id" value="'+ id +'">';
    }
    html += '<div class="col-md-offset-3 col-md-7"><input type="submit" class="btn btn-success" value="提交"></div>';
    html += '</div>';
    html += '</form>';
    html += '</div>';
    return html;
  };

  // 添加
  $('#addBtn').on('click', function () {
    layer.open({
      type: 1,
      title: '添加笔记分类',
      content: '<div id="addNoteClassify">'+ getNoteClassifyPopHtml() +'</div>',
      area: ['420px', '280px']
    });
    var $addNoteClassify = $('#addNoteClassify');
    var $form = $addNoteClassify.find('form');
    var $order = $form.find('input[name="order"]');
    var $name = $form.find('input[name="name"]');
    var $url = $form.find('input[name="url"]');
    $form.submit(function () {
      if (!$order.val()) {
        Layer.msg_lose('序号不能为空！');
        $order.focus();
        return false;
      }
      if (!$name.val()) {
        Layer.msg_lose('分类名称不能为空！');
        $name.focus();
        return false;
      }
      if (!$url.val()) {
        Layer.msg_lose('分类导航不能为空！');
        $url.focus();
        return false;
      }
      $.ajax({
        type: 'post',
        url: '/admin/noteClassify/add',
        data: {
          order: $.trim($order.val()),
          name: $.trim($name.val()),
          url: $.trim($url.val())
        },
        dataType: 'json',
        success: function (result) {
          if (!result.code) {
            Layer.msg_success('分类添加成功！');
          } else {
            Layer.msg_lose(result.msg);
          }
        }
      });
      return false;
    });
  });

  // 编辑
  $('.editBtn').on('click', function () {
    var id = $(this).attr('data-id');
    // 获取数据
    $.ajax({
      type: 'get',
      url: '/admin/noteClassify/edit?id=' + id,
      dataType: 'json',
      success: function(result) {
        if (!result.code) {
          layer.open({
            type: 1,
            title: '编辑笔记分类',
            content: '<div id="editNoteClassify">'+ getNoteClassifyPopHtml(result.data) +'</div>',
            area: ['420px', '280px']
          });
          var $editNoteClassify = $('#editNoteClassify');
          var $form = $editNoteClassify.find('form');
          var $order = $form.find('input[name="order"]');
          var $name = $form.find('input[name="name"]');
          var $url = $form.find('input[name="url"]');
          $form.submit(function () {
            if (!$order.val()) {
              Layer.msg_lose('序号不能为空！');
              $order.focus();
              return false;
            }
            if (!$name.val()) {
              Layer.msg_lose('分类名称不能为空！');
              $name.focus();
              return false;
            }
            if (!$url.val()) {
              Layer.msg_lose('分类导航不能为空！');
              $url.focus();
              return false;
            }
            var data = $form.serialize();
            $.ajax({
              type: 'post',
              url: '/admin/noteClassify/edit',
              data: data,
              dataType: 'json',
              success: function (result) {
                if (!result.code) {
                  Layer.msg_success('分类修改成功！');
                } else {
                  Layer.msg_lose(result.msg);
                }
              }
            });
            return false;
          });
        } else {
          Layer.msg_lose(result.msg);
        }
      }
    })

  });

  // 删除
  $('.delBtn').on('click', function() {
    var id = $(this).attr('data-id');
    Layer.confirm_del(function () {
      $.ajax({
        type: 'get',
        url: '/admin/noteClassify/delete?id='+ id,
        dataType: 'json',
        success: function (result) {
          if (!result.code) {
            Layer.msg_success('删除成功！');
          }
        }
      });
    });
  });

});
