$(function () {
  var $loginForm = $('#loginForm');
  var $user = $loginForm.find('input[name="user"]');
  var $password = $loginForm.find('input[name="password"]');
  $loginForm.submit(function () {
    if(!$user.val()) {
      Layer.msg_lose('用户名不能为空！');
      $user.focus();
      return false;
    }
    if(!$password.val()) {
      Layer.msg_lose('密码不能为空！');
      $password.focus();
      return false;
    }
    $.ajax({
      type: 'post',
      url: '/api/user/login',
      data: {
        userName: $user.val(),
        passWord: $password.val()
      },
      dataType: 'json',
      success: function (result) {
        if(result.code === 0) {
          Layer.msg_success('登录成功，跳转到后台首页！', function () {
            window.location.href = '/admin';
          });
        } else {
          Layer.msg_lose(result.msg);
        }
      }
    });
    return false;
  });
});
