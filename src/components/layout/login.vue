<template>
  <div class="r-aside r-login">
    <div class="r-aside-title">
      <h3><i class="fa fa-user fa-title" aria-hidden="true"></i>用户信息</h3>
    </div>
    <div class="r-aside-content">
      <div v-if="userInfo.loginStatus">
        <div v-if="userInfo.isAdmin" class="login-admin">
          <h3>欢迎你，<strong>{{ userInfo.name }}</strong>管理员</h3>
          <p>进入<a href="http://localhost:3000/admin" class="a-link">后台管理</a><a href="javascript:;" class="a-logOut" @click="logOut">退出登录</a></p>
        </div>
        <div class="login-user" v-else>
          <div class="img-head"><img src="../../assets/images/head_default.jpg" width="40" height="40" alt=""></div>
          <h3><strong>{{ userInfo.name }}</strong></h3>
          <p>欢迎你，来到我的博客<a href="javascript:;" class="a-logOut" @click="logOut">退出登录</a></p>
        </div>
      </div>
      <div v-else>
        <div class="login" id="loginBox" v-if="loginFlag">
          <div class="line"><label class="label">用户名：</label><input type="text" class="input-text" v-model="userName"></div>
          <div class="line"><label class="label">密码：</label><input type="password" class="input-text" v-model="passWord"></div>
          <div class="line"><button type="submit" class="btn btn-primary" @click="loginHandle">登录</button></div>
          <p class="text text-right">还没注册？<a href="javascript:;" class="loginMint" @click="loginFlagToggle">马上注册</a></p>
          <p class="text-Warning text-center mt10">{{ loginErrMsg }}</p>
        </div>
        <div class="login" v-else id="registerBox">
          <div class="line"><label class="label">用户名：</label><input type="text" class="input-text" v-model="registerUserName"></div>
          <div class="line"><label class="label">密码：</label><input type="password" class="input-text" v-model="registerPassWord"></div>
          <div class="line"><label class="label">确认密码：</label><input type="password" class="input-text" v-model="rePassWord"></div>
          <div class="line"><button type="submit" class="btn btn-success" @click="registerHandle">注册</button></div>
          <p class="text text-right">已有账号？<a href="javascript:;" class="loginMint" @click="loginFlagToggle">马上登录</a></p>
          <p class="text-Warning text-center mt10">{{ registerErrMsg }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import axios from 'axios'
  const qs = require('qs')  // 解决formdata问题

  export default {
    data () {
      return {
        userName: '',
        passWord: '',
        registerUserName: '',
        registerPassWord: '',
        rePassWord: '',
        loginErrMsg: '',
        registerErrMsg: '',
        loginFlag: true
      }
    },
    created () {
      this.$store.dispatch('login/getLoginInfo')
    },
    computed: {
      ...mapGetters({
        userInfo: 'login/getUserInfo',
        userMsg: 'login/getUserMsg'
      })
    },
    methods: {
      clearForm () {
        this.userName = ''
        this.passWord = ''
        this.registerUserName = ''
        this.registerPassWord = ''
        this.rePassWord = ''
        this.loginErrMsg = ''
        this.registerErrMsg = ''
      },
      loginFlagToggle: function () {
        this.clearForm()
        this.loginFlag = !this.loginFlag
      },
      loginHandle: function () {
        if (!this.userName) {
          this.loginErrMsg = '用户名不能为空'
          return false
        }
        if (!this.passWord) {
          this.loginErrMsg = '密码不能为空'
          return false
        }
        let _self = this
        axios({
          method: 'post',
          url: '/api/user/login',
          data: qs.stringify({
            userName: this.userName,
            passWord: this.passWord
          })
        }).then(function (result) {
          let data = result.data
          if (!data.code) {
            window.location.reload()
          } else {
            _self.loginErrMsg = data.msg
          }
        }).catch(function (error) {
          console.log(error)
        })
      },
      registerHandle: function () {
        if (!this.registerUserName) {
          this.registerErrMsg = '用户名不能为空'
          return false
        }
        if (!this.registerPassWord) {
          this.registerErrMsg = '密码不能为空'
          return false
        }
        if (!this.rePassWord) {
          this.registerErrMsg = '确认密码不能为空'
          return false
        }
        if (this.rePassWord !== this.registerPassWord) {
          this.registerErrMsg = '两次输入的密码不一致'
          return false
        }
        let _self = this
        axios({
          method: 'post',
          url: '/api/user/register',
          data: qs.stringify({
            userName: this.registerUserName,
            passWord: this.registerPassWord,
            rePassWord: this.rePassWord
          })
        }).then(function (result) {
          if (!result.data.code) {
            _self.registerErrMsg = '注册成功，请登录'
          } else {
            _self.registerErrMsg = '注册失败！'
          }
        })
      },
      logOut: () => {
        axios.get('/api/user/logOut').then(function (result) {
          if (!result.code) {
            window.location.reload()
          }
        })
      }
    }
  }
</script>
<style lang="less" scoped>
  /*用户登录*/
  .r-login {
    margin-top: 20px;
  }
  .login {
    width: 280px;
    margin: 30px auto 0;
    padding-bottom: 15px;
    &-user {
      padding: 15px 20px;
      .img-head {
        width: 60px;
        height: 60px;
        margin: 0 auto;
        background-color: #f9f9f9;
        border: 1px solid #eee;
        line-height: 60px;
        text-align: center;
        border-radius: 50%;
        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
      }
      h3 {
        width: 100%;
        margin: 8px 0;
        text-align: center;
        color: #CC6633;
        font-size: 18px;
      }
      p {
        padding-top: 10px;
        font-size: 14px;
        overflow: auto;
        color: #666;
        .a-logOut {
          float: right;
          color: #CC3333;
        }
      }
    }
    &-admin {
      padding: 25px 20px;
      h3 {
        width: 100%;
        font-size: 16px;
        strong {
          margin: 0 5px;
          color: #CC6633;
        }
      }
      p {
        margin-top: 20px;
        overflow: hidden;
        .a-link {
          color: #42b983;
        }
        .a-logOut {
          float: right;
          color: #CC3333;
        }
      }
    }
    .label {
      display: inline-block;
      width: 80px;
      padding-right: 10px;
      text-align: right;
    }
    .input-text {
      height: 30px;
      line-height: 30px;
    }
    .btn {
      margin-left: 80px;
    }
    .text {
      font-size: 12px;
      color: #666;
      a {
        color: #42b983;
      }
    }
  }
  .login .line {
    margin-bottom: 10px;
  }
</style>
