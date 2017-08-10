/*
 * layer弹框封装
 * */
// 弹框全局配置
layer.config({
  anim: 1
})
var Layer = {
  msg_success: function (str, fn) {
    layer.closeAll()
    layer.msg(str, {icon: 1, time: 1500}, function () {
      if (fn) {
        fn.call(null)
      } else {
        window.location.reload()
      }
    })
  },
  msg_lose: function (str) {
    layer.msg(str, {icon: 5, time: 1500})
  },
  confirm_del: function (fn) {
    layer.confirm('确定删除？', {icon: 3, title: '提示'}, function (index) {
      if (fn) {
        fn.call(null)
      }
      layer.close(index)
    })
  },
  confirm_add: function (msg, url) {
    var index = layer.confirm(msg, {
      btn: ['是', '否'] //按钮
    }, function () {
      window.location.href = url
    }, function () {
      layer.close(index)
    })
  }
}

/*
 * 公用方法
 * */
var gMethod = {
  getCookie: function (c_name) {
    if (document.cookie.length > 0) {
      c_start = document.cookie.indexOf(c_name + '=')
      if (c_start != -1) {
        c_start = c_start + c_name.length + 1
        c_end = document.cookie.indexOf(';', c_start)
        if (c_end == -1) c_end = document.cookie.length
        return unescape(document.cookie.substring(c_start, c_end))
      }
    }
    return ''
  },
  setCookie: function (c_name, value, expiredays) {
    var exdate = new Date()
    exdate.setDate(exdate.getDate() + expiredays)
    document.cookie = c_name + '=' + escape(value) +
      ((expiredays == null) ? '' : ';expires=' + exdate.toGMTString())
  }
}



