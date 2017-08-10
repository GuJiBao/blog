var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Cookies = require('cookies');
var app = express();

var User = require('./models/User');

/*
* 托管静态文件
* 前台
* 后台
* */
app.use('/static', express.static(__dirname + '/dist/static'));
app.use('/public', express.static(__dirname + '/public'));

// 配置应用模板
// 定义当前应用所使用的模板引擎
// 第一个参数：模板引擎的名称，同时也是模板文件的后缀，第二个参数表示用于解析处理模板内容的方法
app.engine('art', require('express-art-template'));
app.set('view options', {
  debug: process.env.NODE_ENV !== 'production'
})
// 设置模板文件存放的目录，第一个参数必须是views，第二个参数是目录
app.set('views', './views');
// 注册所使用的模板引擎，第一个参数必须是 view engine，第二个参数和app.engine这个方法中定义的模板引擎的名称（第一个参数）是一致的
app.set('view engine', 'art');

// bodyparser设置
app.use(bodyParser.urlencoded({ extended: true }));

// 设置cookie
app.use(function (req, res, next) {
  req.cookies = new Cookies(req, res);

  // 解析登录用户的cookie信息
  req.userInfo = {};
  if (req.cookies.get('userInfo')) {
    try {
      req.userInfo = JSON.parse(req.cookies.get('userInfo'));
      //获取当前登录用户的类型，是否是管理员
      User.findById(req.userInfo._id).then(function(userInfo) {
        req.userInfo.isAdmin = Boolean(userInfo.isAdmin);
        next();
      })
    } catch (e) {
      next();
    }
  } else {
    next();
  }
});

/*
* 不同的功能划分不同的模块
* */
app.use('/admin', require('./routers/admin'));
app.use('/api', require('./routers/api'));
app.use('/', require('./routers/main'));

//监听http请求
mongoose.connect('mongodb://localhost:27017/blog', function(err) {
  if (err) {
    console.log('数据库连接失败');
  } else {
    console.log('数据库连接成功');
    if (!module.parent) {
      app.listen(3000);
      console.log('Express started on port 3000');
    }
  }
});
