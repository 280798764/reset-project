/* 登陆页面 仿http://malladmin.isesoldev.com/#/public/login */
<template>
  <section class="loginInfo">
    <div class="header">
      <div class="logo"><img src="~@/assets/images/header-Logo.png" alt=""></div>
      <div class="title"><span></span> isesol设备监控平台</div>
    </div>
    <!--<div class="bg"></div>-->
    <div class="content-wraper">
      <div class="content">
        <div class="content-header">
          <img src="~@/assets/images/header-Logo-top.png">
          <span> isesol设备监控平台</span>
        </div>
        <div class="line-bottom"></div>
        <div class="content-top">
        </div>
        <div class="content-info" @keyup.enter="login">
          <ul>
            <li>
              <i class="pre-icon icon-phone"></i>
              <input name="username" type="text" v-model.trim="paramsLogin.account" class="long-text" placeholder="请输入手机号码">
            </li>
            <li>
              <i class="pre-icon icon-pwd"></i>
              <input name="password" type="password" v-model.trim="paramsLogin.password" class="long-text" placeholder="请输入密码">
            </li>
            <li>
              <i class="pre-icon icon-code"></i>
              <input class="text" type="text" v-model.trim="paramsLogin.verifyValue" placeholder="请输入图片验证码" maxlength="6">
              <div class="verify-code" @click="getVerifyImage">
                <img :src="verifyImageSrc" alt="">
              </div>
            </li>
          </ul>
        </div>
        <div class="radio" @click="saveUser">
          <Radio label="apple" v-model="checked">
            <span>记住用户名？</span>
          </Radio>
        </div>
        <div class="operate-btns">
          <div class="btn-yellow" @click="login(paramsLogin.account)">登录<span class="login-right"></span></div>
        </div>
      </div>
    </div>
    <footer class="copyright-wrapper">
      <div>
        <span>Copyright©2007-2014  沈机（上海）智能系统研发设计有限公司  All right reserved.   沪ICP备17028152号-2</span>
      </div>
    </footer>
  </section>
</template>

<script>
// import { menuUrls } from '@/const/menu'
import util from '@/utils/util'
// import tool from '@/utils/tool'
export default {
  data () {
    return {
      captchaUuid: '',
      checked: false, // radio
      verifyImageSrc: '',
      errorInfo: '', // 错误信息提示
      verifyImg: '',
      params: {
        verifyKey: ''
      },
      paramsLogin: {
        account: '', // 登录名
        password: '', // 密码
        verifyKey: '', // 验证码
        verifyValue: '' // 验证码
      }
    }
  },
  created () {
    this.init()
    sessionStorage.clear()
  },
  mounted () {
    // 读取本地的用户名
    this.getLocal()
    // 获取验证码(调接口)
    this.paramsLogin.verifyKey = util.uuid(32)
    this.$store.dispatch('a:login/getImage', {verifyKey: this.paramsLogin.verifyKey}).then(
      res => {
        // this.paramsLogin.verifyKey = res
        this.verifyImageSrc = 'data:image/jpg;base64,' + res
      },
      rej => {
        this.alert(rej.errorInfo, 'error')
      }
    )
  },
  methods: {
    saveUser () {
      this.checked = !this.checked
    },
    // 设置本地的用户名
    setLocal () {
      localStorage.setItem('userName', this.paramsLogin.account)
      localStorage.setItem('checked', this.checked)
    },
    // 读取本地的用户名
    getLocal () {
      this.paramsLogin.account = localStorage.getItem('userName')
      this.checked = Boolean(localStorage.getItem('checked'))
    },
    // 清除本地的用户名
    clearLocal () {
      localStorage.setItem('userName', '')
      localStorage.setItem('checked', '')
    },
    // 获取图片验证码
    getVerifyImage () {
      this.verifyImageKey = Math.random()
      this.$store.dispatch('a:login/getVerifyImage', this.paramsLogin.verifyKey).then(
        res => {
          // this.paramsLogin.verifyKey = res.verifyKey
          this.verifyImageSrc = 'data:image/jpg;base64,' + res
        }
      )
    },
    // 初始化验证码
    init () {
      this.getVerifyImage()
    },
    // 登录
    login (userName) {
      // 判断复选框是否被勾选
      if (this.checked === true) {
        // 传入账号名和保存天数2个参数
        this.setLocal(userName, 7)
      } else {
        // 清空Local
        this.clearLocal()
      }
      // 非空字段验证
      if (!this.paramsLogin.account) {
        this.errorInfo = '请输入手机号码!'
        this.alert(this.errorInfo, 'error')
      } else if (!this.paramsLogin.password) {
        this.errorInfo = '请输入密码!'
        this.alert(this.errorInfo, 'error')
      } else if (!this.paramsLogin.verifyValue) {
        this.errorInfo = '请输入验证码!'
        this.alert(this.errorInfo, 'error')
      } else {
        this.$store.dispatch('a:login/login', this.paramsLogin).then(
          res => {
            sessionStorage.setItem('userToken', res.token)
            this.getMenus(res.token)
            this.$router.push('/NetworkInfo/Index')
            /* if (this.$route.query.redirect) {
              this.$router.push(this.$route.query.redirect)
            } else {
              if (!res.userModule.length) {
                this.alert('此用户无权限登录！', 'error')
              } else {
                sessionStorage.setItem('userToken', res.token)
                sessionStorage.setItem('name', res.memberName)
                sessionStorage.setItem('i5osMenu', JSON.stringify(res.userModule))
                this.$store.commit('m:common/changeNavList', res.userModule)
                let routerList = this.getRouters(res.userModule)
                this.$router.push(routerList[0])
                this.$Message.success('登录成功！')
              }
            } */
          },
          rej => {
            this.paramsLogin.verifyValue = ''
            this.alert(rej.errorInfo, 'error')
            this.getVerifyImage()
          }
        )
      }
    },
    getMenus () {
      this.$store.dispatch('a:login/getMenus', { appId: 'operation' }).then(
        res => {
          sessionStorage.setItem('navList', JSON.stringify(res || []))
        }
      )
    }
    // 获取有权限的router数组
    /*  getRouters (userModule) {
      let routerList = []
      for (let i = 0; i < userModule.length; i++) {
        let pages = userModule[i].pages
        for (let j = 0; j < pages.length; j++) {
          let item = menuUrls.find(item => {
            return pages[j].pageId === item.pageId
          })
          if (item) {
            if (typeof item.url === 'string') {
              routerList.push(item.url)
            } else {
              routerList.push(...item.url) // 数组的场合
            }
          }
        }
      }
      if (routerList.length) {
        sessionStorage.setItem('routerList', JSON.stringify(routerList))
        return routerList
      }
      return ''
    } */
  }
}
</script>

<style lang="less" scoped>
  @import '~@/assets/styles/modules/login.less';
</style>
