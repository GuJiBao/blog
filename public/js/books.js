$(function () {
  // 接口
  var delCoverUrl = '/admin/books/delCover';  // 删除封面图片的接口

  // 删除封面图片
  function delCover(path) {
    $.ajax({
      type: 'GET',
      url: delCoverUrl + '?oldCoverPath=' + path,
      success: function(str) {
        console.log(str);
      }
    });
  }

  // 书籍资料的删除
  $('.delBtn').on('click', function () {
    var id = $(this).attr('data-id');
    Layer.confirm_del(function () {
      $.ajax({
        type: 'get',
        url: '/admin/books/delete?id=' + id,
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
