var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');
var Menus = require('../models/Menus');
var User = require('../models/User');
var Notes = require('../models/Notes');
var NoteClassify = require('../models/NoteClassify');
var Books = require('../models/Books');
var BookClassify = require('../models/BookClassify');

require('../assist/artTemplateFilter'); // 载入art-teplate过滤器

// 统一返回格式
var responseData;

router.use(function (req, res, next) {

  // 判断是否登录
  if (!req.userInfo.isAdmin) {
    res.send('对不起，只有管理员才可以进入后台管理');
    return false;
  }

  // 返回格式
  responseData = {
    code: 0,
    msg: ''
  };

  try {
    // 获取菜单
    Menus.find().sort({order: 1}).then(function (menus) {
      req.menuLists = [];
      for (var i = 0, len = menus.length; i < len; i++) {
        req.menuLists.push({
          name: menus[i].name,
          url: menus[i].url
        });
      }
      next();
    });
  } catch (err) {
    next();
  }
});

/*
* 后台首页
* */
router.get('/', function (req, res, next) {
  res.render('admin/index', {
    userInfo: req.userInfo,
    menuLists: req.menuLists
  })
});

/*
 * 笔记分类的首页
 * */
router.get('/classifies/noteClassify', function (req, res, next) {
  var page = Number(req.query.page || 1);
  var limit = 5;
  var pages = 0;

  NoteClassify.count().then(function (count) {
    pages = Math.ceil(count / limit);
    page = Math.min(page, pages);
    page = Math.max(page, 1);
    var skip = (page - 1) * limit;
    NoteClassify.find().sort({order: 1}).limit(limit).skip(skip).then(function (noteClassifies) {
      res.render('admin/classifies/noteClassify', {
        menuLists: req.menuLists,
        noteClassifies: noteClassifies,
        count: count,
        pages: pages,
        limit: limit,
        page: page,
        url: '/admin/classifies/noteClassify'
      })
    });
  });
});

/*
 * 笔记分类的添加
 * */
router.post('/noteClassify/add', function (req, res, next) {
  var order = Number(req.body.order || 0);
  var name = req.body.name || '';
  var url = req.body.url || '';

  if(!order || !name || !url) {
    responseData.code = 1;
    responseData.msg = '序号或分类名称或分类导航不能为空'
    res.json(responseData);
    return false;
  }

  NoteClassify.findOne({
    '$or': [{name: name}, {order: order}]
  }).then(function (rs) {
    if(rs) {
      // 该菜单已在数据库中
      responseData.code = 2;
      responseData.msg = '分类的序号或分类的名称已存在，请重新填写！';
      res.json(responseData);
      return Promise.reject();
    } else {
      // 该菜单不存在，可以保存
      return new NoteClassify({
        order: order,
        name: name,
        url: url
      }).save();
    }
  }).then(function () {
    res.json(responseData);
    return false;
  });
});

/*
 * 笔记分类的编辑
 * */
router.get('/noteClassify/edit', function(req, res) {
  var id = req.query.id || '';
  NoteClassify.findOne({
    _id: id
  }).then(function(noteClassify) {
    if(!noteClassify) {
      responseData.code = 1;
      responseData.msg = '笔记分类不存在！';
    } else {
      responseData.data = noteClassify;
    }
    res.json(responseData);
    return false;
  });
});

/*
 * 笔记分类的编辑保存
 * */
router.post('/noteClassify/edit', function (req, res) {
  var id = req.body.id || '',
    order = Number(req.body.order || 1),
    name = req.body.name || '',
    url = req.body.url || '';
  NoteClassify.findOne({
    _id: id
  }).then(function (noteClassify) {
    if (!noteClassify) {
      responseData.code = 1;
      responseData.msg = '笔记分类不存在';
      res.json(responseData);
      return false;
    } else {
      // 判断当前是否做了修改
      if (order == noteClassify.order && name == noteClassify.name && url == noteClassify.url) {
        res.json(responseData);
        return false;
      } else {
        // 要修改的菜单名称是否已经在数据库中存在
        return NoteClassify.findOne({
          _id: {$ne: id},
          '$or': [{name: name}, {order: order}]
        });
      }
    }
  }).then(function (sameNoteClassify) {
    if (sameNoteClassify) {
      responseData = {
        code: 2,
        msg: '数据库中已经存在同序号的菜单或同名菜单'
      };
      res.json(responseData);
      return false;
    } else {
      return NoteClassify.update({
        _id: id
      }, {
        order: order,
        name: name,
        url: url
      });
    }
  }).then(function () {
    res.json(responseData);
    return false;
  });
});

/*
 * 笔记分类的删除
 * */
router.get('/noteClassify/delete', function (req, res) {
  var id = req.query.id || '';
  NoteClassify.remove({
    _id: id
  }).then(function () {
    res.json(responseData);
    return false;
  });
});

/*
* 笔记的首页
* */
router.get('/notes', function (req, res, next) {
  var page = Number(req.query.page || 1);
  var limit = 10;
  var pages = 0;

  Notes.count().then(function (count) {
    pages = Math.ceil(count / limit); // 总页数
    page = Math.min(page, pages); // 取值不能超过pages
    page = Math.max(page, 1); // 取值不能小于1
    var skip = (page - 1) * limit;// 忽略的数据条数
    /*
     * 1: 升序
     * -1: 降序
     * */
    Notes.find().limit(limit).skip(skip).populate(['noteClassify']).sort({addTime: -1}).then(function (notes) {
      res.render('admin/notes', {
        menuLists: req.menuLists,
        count: count,
        notes: notes,
        pages: pages,
        limit: limit,
        page: page,
        url: 'notes'
      });
    });
  });
});

/*
* 笔记的新增页面
* */
router.get('/notes/add', function (req, res, next) {
  // 获取笔记的分类
  NoteClassify.find().then(function (noteClassifies) {
    res.render('admin/notes_add', {
      noteClassifies: noteClassifies
    });
  });
});

/*
* 笔记的新增
* */
router.post('/notes/add', function (req, res, next) {
  var noteClassify = req.body.noteClassify || '';
  var title = req.body.title || '';
  var description = req.body.description || '';
  var content = req.body.content || '';

  if (!title) {
    responseData = {
      code: 1,
      msg: '内容标题不能为空'
    }
    res.json(responseData);
    return false;
  }
  if (!description) {
    responseData = {
      code: 2,
      msg: '内容简介不能为空'
    }
    res.json(responseData);
    return false;
  }
  if (!content) {
    responseData = {
      code: 3,
      msg: '内容不能为空'
    }
    res.json(responseData);
    return false;
  }
  // 保存到数据库
  new Notes({
    noteClassify, noteClassify,
    title: title,
    user: req.userInfo._id.toString(),
    description: description,
    content: content
  }).save().then(function (rs) {
    responseData.msg = '内容保存成功';
    res.json(responseData);
    return false;
  });
});

/*
* 笔记的编辑页面
* */
router.get('/notes/edit', function (req, res, next) {
  var id = req.query.id || '';

  var noteClassifies = [];
  NoteClassify.find().sort({order: 1}).then(function (result) {
    noteClassifies = result;

    return Notes.findOne({
      _id: id
    }).populate('noteClassify');
  }).then(function (note) {
    if(!note) {
      res.render('admin/error', {
        message: '指定内容不存在'
      });
      return Promise.reject();
    } else {
      res.render('admin/notes_edit', {
        noteClassifies: noteClassifies,
        note: note
      });
    }
  });
});

/*
* 笔记的编辑保存
* */
router.post('/notes/edit', function (req, res, next) {
  var id = req.body.id || '';
  var noteClassify = req.body.noteClassify || '';
  var title = req.body.title || '';
  var description = req.body.description || '';
  var content = req.body.content || '';

  if (!title) {
    responseData = {
      code: 1,
      msg: '内容标题不能为空'
    }
    res.json(responseData);
    return false;
  }
  if (!description) {
    responseData = {
      code: 2,
      msg: '内容简介不能为空'
    }
    res.json(responseData);
    return false;
  }
  if (!content) {
    responseData = {
      code: 3,
      msg: '内容不能为空'
    }
    res.json(responseData);
    return false;
  }
  Notes.update({
    _id: id
  }, {
    noteClassify: noteClassify,
    title: title,
    description: description,
    content: content
  }).then(function () {
    responseData.msg = '内容保存成功';
    res.json(responseData);
    return false;
  });
});

/*
* 笔记的删除
* */
router.get('/notes/delete', function (req, res, next) {
  var id = req.query.id || '';
  Notes.remove({
    _id: id
  }).then(function () {
    res.json(responseData);
    return false;
  });
});

/*
 * 书籍分类的首页
 * */
router.get('/classifies/bookClassify', function (req, res, next) {
  var page = Number(req.query.page || 1);
  var limit = 5;
  var pages = 0;

  BookClassify.count().then(function (count) {
    pages = Math.ceil(count / limit);
    page = Math.min(page, pages);
    page = Math.max(page, 1);
    var skip = (page - 1) * limit;
    BookClassify.find().sort({order: 1}).limit(limit).skip(skip).then(function (bookClassiflies) {
      res.render('admin/classifies/bookClassify', {
        menuLists: req.menuLists,
        bookClassiflies: bookClassiflies,
        count: count,
        pages: pages,
        limit: limit,
        page: page,
        url: '/admin/classifies/bookClassify'
      })
    });
  });
});

/*
* 书籍分类的添加
* */
router.post('/bookClassify/add', function (req, res, next) {
  var order = Number(req.body.order || 0);
  var name = req.body.name || '';

  if(!order || !name) {
    responseData.code = 1;
    responseData.msg = '序号或分类名称不能为空'
    res.json(responseData);
    return false;
  }

  BookClassify.findOne({
    '$or': [{name: name}, {order: order}]
  }).then(function (rs) {
    if(rs) {
      // 该菜单已在数据库中
      responseData.code = 2;
      responseData.msg = '分类的序号或分类的名称已存在，请重新填写！';
      res.json(responseData);
      return Promise.reject();
    } else {
      // 该菜单不存在，可以保存
      return new BookClassify({
        order: order,
        name: name
      }).save();
    }
  }).then(function () {
    res.json(responseData);
    return false;
  });
});


/*
* 书籍资料的首页
* */
router.get('/books', function (req, res, next) {
  var page = Number(req.query.page || 1);
  var limit = 10;
  var pages = 0;

  Books.count().then(function (count) {
    pages = Math.ceil(count / limit);
    page = Math.min(page, pages);
    page = Math.max(page, 1);
    var skip = (page - 1) * limit;

    Books.find().limit(limit).skip(skip).populate(['bookClassify']).sort({addTime: -1}).then(function (books) {
      res.render('admin/books', {
        menuLists: req.menuLists,
        count: count,
        books: books,
        pages: pages,
        limit: limit,
        page: page,
        url: 'books'
      });
    });
  });
});

/*
* 书籍资料的添加页面
* */
router.get('/books/add', function (req, res, next) {
  BookClassify.find().then(function (bookClassifies) {
    res.render('admin/books_add', {
      menuLists: req.menuLists,
      bookClassifies: bookClassifies
    })
  });
});

/*
* 书籍资料的添加
* */
router.post('/books/add', function (req, res, next) {
  var name = req.body.name || '',
      bookClassify = req.body.bookClassify || '',
      description = req.body.description || '',
      cover = req.body.cover || '',
      downloadLink = req.body.downloadLink || '',
      downloadPw = req.body.downloadPw || '';

  if(!name) {
    responseData.code = 1;
    responseData.msg = '书籍名称不能为空';
    res.json(responseData);
    return false;
  }
  if(!bookClassify) {
    responseData.code = 1;
    responseData.msg = '书籍分类不能为空';
    res.json(responseData);
    return false;
  }
  if(!description) {
    responseData.code = 1;
    responseData.msg = '书籍简介不能为空';
    res.json(responseData);
    return false;
  }
  if(!cover) {
    responseData.code = 1;
    responseData.msg = '书籍封面不能为空';
    res.json(responseData);
    return false;
  }
  if(!downloadLink) {
    responseData.code = 1;
    responseData.msg = '下载链接不能为空';
    res.json(responseData);
    return false;
  }
  if(!downloadPw) {
    responseData.code = 1;
    responseData.msg = '下载密码不能为空';
    res.json(responseData);
    return false;
  }
  // 保存书籍到数据库
  new Books({
    name: name,
    bookClassify: bookClassify,
    description: description,
    cover: cover,
    downloadLink: downloadLink,
    downloadPw: downloadPw
  }).save().then(function(rs) {
    responseData.msg = '书籍资料添加成功';
    res.json(responseData);
    return false;
  });
});

/*
* 书籍资料的编辑
* */
router.get('/books/edit', function(req, res, next) {
  var id = req.query.id || '';

  var bookClassifies = [];
  BookClassify.find().sort({order: 1}).then(function (result) {
    bookClassifies = result;

    return Books.findOne({
      _id: id
    }).populate('bookClassify');
  }).then(function (book) {
    if(!book) {
      res.render('admin/error', {
        message: '指定内容不存在'
      });
      return Promise.reject();
    } else {
      res.render('admin/books_edit', {
        bookClassifies: bookClassifies,
        book: book
      });
    }
  });
});

/*
* 书籍资料的编辑保存
* */
router.post('/books/edit', function(req, res, next) {
  var id = req.body.id || '',
    name = req.body.name || '',
    bookClassify = req.body.bookClassify || '',
    description = req.body.description || '',
    cover = req.body.cover || '',
    downloadLink = req.body.downloadLink || '',
    downloadPw = req.body.downloadPw || '';

  if(!name) {
    responseData.code = 1;
    responseData.msg = '书籍名称不能为空';
    res.json(responseData);
    return false;
  }
  if(!bookClassify) {
    responseData.code = 1;
    responseData.msg = '书籍分类不能为空';
    res.json(responseData);
    return false;
  }
  if(!description) {
    responseData.code = 1;
    responseData.msg = '书籍简介不能为空';
    res.json(responseData);
    return false;
  }
  if(!cover) {
    responseData.code = 1;
    responseData.msg = '书籍封面不能为空';
    res.json(responseData);
    return false;
  }
  if(!downloadLink) {
    responseData.code = 1;
    responseData.msg = '下载链接不能为空';
    res.json(responseData);
    return false;
  }
  if(!downloadPw) {
    responseData.code = 1;
    responseData.msg = '下载密码不能为空';
    res.json(responseData);
    return false;
  }

  Books.update({
    _id: id
  }, {
    name: name,
    bookClassify: bookClassify,
    description: description,
    cover: cover,
    downloadLink: downloadLink,
    downloadPw: downloadPw
  }).then(function() {
    responseData.msg = '书籍资料的内容编辑成功';
    res.json(responseData);
    return false;
  });
});

// 删除书籍封面
function delCoverHandle(path) {
  var delDir = 'public/images/book/';
  fs.unlinkSync(delDir + path);
}

/*
* 书籍资料的删除
* */
router.get('/books/delete', function(req, res) {
  var id = req.query.id || '';

  Books.findOne({
    _id: id
  }).then(function(rs) {
    if(rs.cover) {  // 删除图片
      delCoverHandle(rs.cover);
    }
    Books.remove({
      _id: id
    }).then(function() {
      res.json(responseData);
      return false;
    });
  });
});

/*书籍封面上传*/
router.post('/books/uploadCover', function(req, res) {
  var bookCover_UPLOAD_FOLDER = '/images/book/';

  var form = new formidable.IncomingForm(); // 创建上传表单
  form.encoding = 'utf-8';                  // 设置编辑
  form.uploadDir = 'public' + bookCover_UPLOAD_FOLDER;    // 设置上传目录
  form.keepExtensions = true;               // 保留后缀
  form.maxFieldsSize = 2 * 1024 * 1024;     // 文件大小
  form.parse(req, function (err, fields, files) {
    if(err) {
      responseData.code = 1;
      responseData.msg = err;
      res.json(responseData);
      return false;
    }

    var extName = ''; // 后缀名
    switch (files.cover.type) {
      case 'image/pjpeg':
      case 'image/jpeg':
        extName = 'jpg';
        break;
      case 'image/png':
      case 'image/x-png':
        extName = 'png';
        break;
    }

    if (extName.length == 0) {
      responseData.code = 2;
      responseData.msg = '只支持png和jpg格式图片';
      res.json(responseData);
      return false;
    }

    var bookName = Math.random() + '.' + extName;
    var newPath = form.uploadDir + bookName;  // 图片写入地址；
    var coverPath = bookName; // 显示地址；
    fs.renameSync(files.cover.path, newPath);  // 重命名
    responseData.coverPath = coverPath;
    res.json(responseData);
    return false;
  });
});

/*
* 书籍封面的修改
* */
router.get('/books/editCover', function(req, res) {
  var id = req.query.id || '';
  var cover = req.query.cover || '';
  Books.update({
    _id: id
  }, {
    cover: cover
  }).then(function() {
    responseData.msg = '封面图片替换成功';
    res.json(responseData);
    return false;
  });
});

/*
* 书籍封面的删除
* */
router.get('/books/delCover', function(req, res) {
  var coverPath = req.query.oldCoverPath;
  if(coverPath) {
    delCoverHandle(coverPath);
  }
  responseData.msg = '封面删除成功';
  res.json(responseData);
  return false;
});







module.exports = router;
