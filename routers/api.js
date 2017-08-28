var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Notes = require('../models/Notes');

// 统一返回格式
var responseData;

router.use(function (req, res, next) {
  responseData = {
    code: 0,
    msg: ''
  }
  next();
});

/*
 * 获取登录信息
 * */
router.get('/user/login', function (req, res) {
  let userInfo = req.cookies.get('userInfo');
  if (userInfo) {
    try {
      userInfo = JSON.parse(userInfo);
      User.findById(userInfo._id).then(function (userInfo) {
        responseData = {
          userName: userInfo.userName,
          isAdmin: Boolean(userInfo.isAdmin)
        };
        res.json(responseData);
        return false;
      });
    } catch (err) {
      responseData = {
        code: 1,
        msg: '用户未登录！'
      }
      res.json(responseData);
      return false;
    }
  } else {
    responseData = {
      code: 1,
      msg: '用户未登录！'
    }
    res.json(responseData);
    return false;
  }
});

/*
* 用户登录
* */
router.post('/user/login', function (req, res) {
  var userName = req.body.userName || '';
  var passWord = req.body.passWord || '';
  if(userName == '') {
    responseData.code = 1;
    responseData.msg = '用户名不能为空';
    res.json(responseData);
    return false;
  }
  if(passWord == '') {
    responseData.code = 2;
    responseData.msg = '密码不能为空';
    res.json(responseData);
    return false;
  }
  //保存用户注册的信息到数据库中
  User.findOne({
    userName: userName,
    passWord: passWord
  }).then(function (userInfo) {
    if (!userInfo) {
      responseData.code = 2;
      responseData.msg = '用户名或密码错误';
      res.json(responseData);
      return false;
    }
    // 登录成功
    responseData.msg = '登录成功！';
    req.cookies.set('userInfo', JSON.stringify({
      _id: userInfo._id,
      userName: userInfo.userName
    }));
    res.json(responseData);
    return false;
  });
});

/*
* 用户注册
* */
router.post('/user/register', function (req, res) {
  var userName = req.body.userName || '',
      passWrod = req.body.passWord || '',
      rePassWord = req.body.passWord || '';

  if ( userName == '' ) {
    responseData.code = 1;
    responseData.message = '用户名不能为空';
    res.json(responseData);
    return;
  }
  if (passWrod == '') {
    responseData.code = 2;
    responseData.message = '密码不能为空';
    res.json(responseData);
    return;
  }
  if (passWrod != rePassWord) {
    responseData.code = 3;
    responseData.message = '两次输入的密码不一致';
    res.json(responseData);
    return;
  }
  User.findOne({
    userName: userName
  }).then(function (userInfo) {
    if (userInfo) {
      // 说明数据库中已存在该用户名
      responseData = {
        code: 4,
        msg: '用户名已经注册了'
      };
      res.json(responseData);
      return false;
    }
    // 保存到数据库中
    var user = new User({
      userName: userName,
      passWord: passWrod
    });
    return user.save();
  }).then(function (newUserInfo) {
    responseData.message = '注册成功';
    res.json(responseData);
  });

});

/*
* 用户退出登录
* */
router.get('/user/logOut', function (req, res) {
  req.cookies.set('userInfo', null)
  res.json(responseData);
});

/*
* 笔记的获取
* */
router.get('/getNotes', function(req, res) {
  var limit = Number(req.query.limit) || 10;
  Notes.find().limit(limit).sort({addTime: -1}).then(function(notes) {
    responseData.data = notes;
    res.json(responseData);
    return false;
  })
});


module.exports = router;
