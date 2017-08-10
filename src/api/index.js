const Mock = require('mockjs')

// 前端笔记
Mock.mock('/notes', 'get', {
  type: 'get',
  'list|1-10': [{
    'id|+1': 1,
    'title|1': '@ctitle(15, 30)',
    'details|1': '@cparagraph(15, 100)'
  }]
})
