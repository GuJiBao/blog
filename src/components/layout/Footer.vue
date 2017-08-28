<template>
  <footer id="footer">
    <p class="text-center">Copyright © 2013-2017 菜鸟教程  runoob.com All Rights Reserved. 备案号：闽ICP备15012807号-1</p>
  </footer>
</template>
<script>
  const dataList = ['首页', '前端资讯', '笔记', 'psd下载', '个人简介']
  export default {
    data () {
      return {
        navList: dataList
      }
    }
  }
</script>
<style lang="less" scoped>
  footer {
    width: 100%;
    margin-top: 35px;
    background-color: #f6f6f6;
    border-top: 1px solid #e4e4e4;
    p{
      width: 100%;
      padding: 15px 0;
      color: #999;
      font-size: 12px;
    }
  }
</style>
