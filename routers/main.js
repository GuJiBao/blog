var express = require('express');
var path = require('path');
var router = express.Router();

/*
* 前台首页
* */
router.get('/', function (req, res, next) {
  var options = {
    root: path.resolve(__dirname, '../dist/'),
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
  }
  res.sendFile('index.html', options, function (err) {
    if (err) {
      console.log(err);
      res.status(err.status).end();
    } else {
      console.log('Sent:', 'index');
    }
  })
});

/*
 * 登录
 * */
router.get('/login', function (req, res, next) {
  res.render('main/login', {
    userInfo: 'admin'
  })
});

module.exports = router;
