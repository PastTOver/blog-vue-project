<template>
  <section class="w3l-form-36">
    <div class="form-36-mian section-gap">
      <div class="wrapper">
        <div class="form-inner-cont">
          <span
            class="loginow">立即登录&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</span>
          <a href="#reload" @click.prevent="returnhtml()"><span class="exitnow">返回</span></a>
          <form action="#" method="post" class="signin-form">
            <div class="form-input">
              <span class="fa fa-envelope-o" aria-hidden="true"></span>
              <input type="email" name="email" placeholder="邮箱" required v-model.lazy="user" />
            </div>
            <div class="form-input">
              <span class="fa fa-key" aria-hidden="true"></span>
              <input type="password" name="password" placeholder="密码" required v-model.lazy="pwd" />
            </div>
            <div class="login-remember d-grid">
              <label class="check-remaind">
                <input value="optionValue" v-model="selectedOptions" type="checkbox" />
                <span class="checkmark"></span>
                <p class="remember">同意用户协议</p>
              </label>
              <button class="btn theme-button" @click.prevent="itbaizhanContents()">登录</button>
            </div>
            <!-- <div class="new-signup">
              <a href="#reload" class="signuplink">忘记密码?点击找回</a>
            </div> -->
          </form>
          <div class="social-icons">
            <p class="continue"><span>Or</span></p>
            <div class="social-login">
              <a href="#weixin">
                <div class="weixin">
                  <span class="fa fa-weixin" aria-hidden="true" @click.prevent="closeModal"></span>
                </div>
              </a>
            </div>
          </div>
          <p class="signup">没有网站账号? <a href="#" class="signuplink" @click.prevent="registerHTML">点击注册</a></p>
        </div>
        <!-- copyright -->
        <div class="copy-right">
          <p>
            &copy; 2023.Company name All rights reserved.
            <a target="_blank" href="#" @click.prevent="">用户协议</a>
          </p>
        </div>
        <div class="modal" v-show="showModal" style="width: 500px; height: 500px;">
          <div class="modal-content">
            <!-- 弹窗内容 -->
            <img id="qrCodeImgId" :src="qrCodeSrc" v-show="showQrCode" alt="QR Code"
              style="width: 200px; height: 200px; " />
            <p>点击关闭按钮或背景以关闭弹窗</p>
            <button @click="closeModalexit">关闭</button>
          </div>
        </div>
        <!-- //copyright -->
      </div>
    </div>
  </section>
</template>

<script>
var sceneStr;
var t;
import axios from 'axios';
import { useTransitionFallthroughEmits } from 'element-plus'
import { setToken, getToken, clearToken, setImg } from '../storage.js'  //临时存放Token
export default {
  data() {
    return {
      user: "",
      pwd: "",
      showModal: false,
      qrCodeSrc: "",  //这两个是关于二维码弹窗的
      showQrCode: false,
      intervalId: null,
      sceneStr: "",
      selectedOptions: [] // 绑定选中的复选框值
    }
  },
  methods: {   //函数或方法
    returnhtml() {  //调用VUE事件
      this.$emit('returntitle');
      this.$router.push('/').then(() => { //网页跳转，并进行刷新
        location.reload()
      })
    },
    closeModal() {   //微信登录弹窗
      if (!this.selectedOptions.includes('optionValue')) {
        alert('请勾选用户协议');
        return
      }
      this.showModal = true
      this.$axios.get(this.$globalInternet + "/qrCodeFirstLogin/getQrCode").then(res => {
        console.log(res.data)
        if (res.data.code === 200) {
          console.log(res.data.data.sceneStr)
          this.sceneStr = res.data.data.sceneStr
          this.qrCodeSrc = "https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=" + res.data.data.ticket;
          this.showQrCode = true;
          this.startInterval();
        } else {
          alert('登录失败');
        }
      })

    },
    getOpenId(res) {
      console.log(this.sceneStr + "!!!!")
      axios.get(this.$globalInternet + "/qrCodeFirstLogin/getOpenId", {

        params: {
          eventKey: this.sceneStr
        }
      }).then(res => {
        console.log("========getOpenId==========");
        console.log(res.data);
        const data = res.data;
        if (data.code === 200) {
          clearInterval(this.intervalId);
          alert("登录成功，欢迎你 " + data.data.userdata.userName + " !");
          this.hideQrCode();
          console.log('登录成功')
          console.log(res.data.data.userdata)
          const userData = res.data.data.userdata
          console.log(userData)
          const avatarRegex = /avatar=(.*?),/;  //获取JSON中的链接，这个是匹配
          const match = avatarRegex.exec(res.data.data.userdata);  //匹配数据
          if (match && match[1]) {
            const avatar = match[1];
            setImg(avatar)
            console.log(avatar);  //如果有就打印
          } else {
            console.log('Unable to extract avatar data');   //否则就错误
          }
          // console.log(res.data.code)
          // console.log(res.data.data.token)
          this.$globaltoken = res.data.data.token
          const token = res.data.data.token
          setToken(token)   //存放token到js中
          console.log(getToken())
          this.$emit('returnToIndex', token);   //将token返回给vue
          this.$router.push('/').then(() => { //网页跳转，并进行刷新
            location.reload()
          })
        } else {
          this.restartQrCode();
        }
      });
    },
    startInterval() {
      this.intervalId = setInterval(this.getOpenId, 10000);
    },
    stopInterval() {
      clearInterval(this.intervalId);
    },
    hideQrCode() {
      this.qrCodeImgSrc = '';
    },
    restartQrCode() {
      clearInterval(this.intervalId);
      this.closeModal();
    },
    beforeDestroy() {
      this.stopInterval();
    },



    closeModalexit() {   //关闭按钮
      this.showModal = false
      location.reload();
    },
    itbaizhanContents() {   //当用户点击后，用户密码传递给后端
      if (!this.selectedOptions.includes('optionValue')) {
        alert('请勾选用户协议');
        return
      }
      console.log(this.$globalInternet + "/user/login")
      if (this.user.length != 0 && this.pwd.length != 0) {
        this.$axios.post(this.$globalInternet + "/user/login", this.$querystring.stringify({
          email: this.user,   //通过post请求，并且携带参数，同时使用querystring修改格式
          password: this.pwd,
        }))
          .then(res => {
            if (res.data.code === 200) {
              console.log('登录成功')
              const userData = res.data.data.userdata
              console.log(userData)
              const avatarRegex = /avatar=(.*?),/;  //获取JSON中的链接，这个是匹配
              const match = avatarRegex.exec(res.data.data.userdata);  //匹配数据
              if (match && match[1]) {
                const avatar = match[1];
                setImg(avatar)
                console.log(avatar);  //如果有就打印
              } else {
                console.log('Unable to extract avatar data');   //否则就错误
              }
              // console.log(res.data.code)
              // console.log(res.data.data.token)
              this.$globaltoken = res.data.data.token
              const token = res.data.data.token
              setToken(token)   //存放token到js中
              console.log(getToken())
              this.$emit('returnToIndex', token);   //将token返回给vue
              this.$router.push('/').then(() => { //网页跳转，并进行刷新
                location.reload()
              })
              // this.$router.push({ name: 'index', params: { token: "123" } });
            } else {
              alert('账号密码错误');
            }
          })

      } else {
        console.log("321")
        alert('用户名或密码不能为空');
      }
    },
    registerHTML() {   //注册按钮跳转页面
      this.$router.push({ name: 'register' });
    }
  }
}
</script>

<style>
@import '../assets/css/font-awesome.css';

:root {
  --theme-color: #1F2323;
  --title-color: #051b35;
  --text-color: #333333;
}

html {
  scroll-behavior: smooth;
}

body,
html {
  margin: 0;
  padding: 0;
  color: #585858;
}

* {
  box-sizing: border-box;
}

.wrapper {
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}

@media (min-width: 576px) {
  .wrapper {
    max-width: 540px;
  }
}

@media (min-width: 768px) {
  .wrapper {
    max-width: 720px;
  }
}

@media (min-width: 992px) {
  .wrapper {
    max-width: 960px;
  }
}

@media (min-width: 1200px) {
  .wrapper {
    max-width: 1140px;
  }
}

.d-grid {
  display: grid;
}

.d-flex {
  display: flex;
  display: -webkit-flex;
  flex-wrap: wrap;
}

.text-center {
  text-align: center;
}

.text-left {
  text-align: left;
}

.text-right {
  text-align: right;
}

button,
input,
select {
  -webkit-appearance: none !important;
  appearance: none !important;
  outline: none;
}

button,
.btn,
select {
  cursor: pointer;
}

a {
  text-decoration: none;
}


h1,
h2,
h3,
h4,
h5,
h6,
p,
ul,
ol {
  margin: 0;
  padding: 0;
}

.theme-button {
  min-width: 130px;
  cursor: pointer;
  text-decoration: none;
  -webkit-appearance: none !important;
  appearance: none !important;
  display: inline-block;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  text-align: center;
  color: #fff;
  background: var(--theme-color);
  padding: 14px 18px;
  border-radius: 4px;
  transition: 0.3s ease;
  border: 1px solid var(--theme-color);
}

.theme-button:hover {
  background: #ffffff;
  color: #000000;
}

.form-36-mian {
  background-size: cover;
  /* 背景图片 */
  background-image: linear-gradient(to right, rgba(0, 0, 0, 0.85), rgba(255, 255, 255, 0)), url(../assets/images/logo.png);
  background-attachment: fixed;
  min-height: 100vh;
  display: grid;
  align-items: center;
  padding: 2rem 0;
}

.form-inner-cont {
  max-width: 370px;
  margin-right: auto;
  background: #fff;
  padding: 2rem;
  border-radius: 4px;
}

.form-inner-cont h3 {
  font-size: 25px;
  line-height: 30px;
  color: var(--title-color);
}

.form-input span.fa {
  color: var(--title-color);
  font-size: 14px;
  border-right: 1px solid #eee;
  margin-right: 5px;
}

.form-input input[type="text"],
.form-input input[type="email"],
.form-input input[type="password"] {
  background: transparent;
  border: none;
  outline: none;
  width: 100%;
  font-size: 16px;
  padding: 0px 12px 0px 0px;
  color: var(--title-color);
  height: 45px;
  -webkit-appearance: none !important;
  appearance: none !important;
}

.form-input {
  margin-top: 20px;
  background: rgba(31, 35, 35, 0.03);
  display: grid;
  grid-template-columns: .1fr 1fr;
  align-items: center;
  padding-left: 15px;
  border: 1px solid rgba(31, 94, 180, 0.22);
  border-radius: 4px;
}

.login-remember {
  grid-template-columns: auto auto;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
}

.checkbox {
  width: 16px;
  height: 16px;
  color: #F5F9FC;
  background: #304659;
  float: left;
}

p.remember {
  font-size: 13px;
  line-height: 18px;
  color: var(--text-color);
}

.new-signup a {
  font-size: 14px;
  margin-top: 25px;
  /* display: block; */
  color: #ff0000;
  text-decoration: underline;
}

.social-icons {
  align-items: center;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  padding: 30px 0px 20px;
  margin-top: 40px;
  position: relative;
}

.continue {
  text-align: center;
  display: inline-block;
  width: 14%;
  position: absolute;
  top: -20px;
  left: 43%;
}

.continue span {
  font-style: normal;
  font-weight: bold;
  font-size: 13px;
  background: #f7f7f7;
  color: var(--title-color);
  text-align: center;
  display: inline-block;
  width: 40px;
  border-radius: 50%;
  height: 40px;
  line-height: 40px;
}

button.btn {
  line-height: 40px;
  padding: 0;
  min-width: 100px;
}

.weixin {
  font-weight: bold;
  display: block;
  width: 35px;
  height: 35px;
  line-height: 35px;
  text-align: center;
  margin: 0 10px;
  border-radius: 50%;
}

.weixin span {
  display: block;
  line-height: 35px;
  color: #fff;
  font-size: 14px;
}


.weixin {
  background: #09bb07;
}

.weixin:hover {
  opacity: 0.9;
}

p.signup {
  color: var(--text-color);
  font-size: 15px;
  line-height: 25px;
  display: block;
  margin-top: 20px;
}

p.signup a {
  font-weight: bold;
  color: var(--theme-color);
}

p.signup a:hover {
  text-decoration: underline;
}

.social-login {
  display: flex;
  justify-content: center;
}

/* 单选框样式 */
.check-remaind {
  display: block;
  position: relative;
  padding-left: 25px;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* 隐藏单选框 */
.check-remaind input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* 创建一个圆圈 */
.checkmark {
  position: absolute;
  top: 0px;
  left: 0;
  height: 17px;
  width: 17px;
  background-color: #E1E9F0;
}

/* 鼠标移上去时，添加背景颜色 */
.check-remaind:hover input~.checkmark {
  background-color: #E1E9F0;
}

/* 创建圆圈中的勾号（白色背景）*/
.check-remaind input:checked~.checkmark {
  background-color: var(--theme-color);
}

/* 显示勾号 */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* 显示勾号 */
.check-remaind input:checked~.checkmark:after {
  display: block;
}

/* 位置和大小勾号 */
.check-remaind .checkmark:after {
  left: 5px;
  top: 2px;
  width: 4px;
  height: 9px;
  border: solid white;
  border-width: 0 2px 2px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}

.copy-right {
  margin-top: 25px;
}

.copy-right p {
  color: #fff;
  font-size: 14px;
  line-height: 22px;
}

.copy-right p a {
  color: #fff;
  font-size: 16px;
  text-decoration: underline;
}

.copy-right p a:hover {
  text-decoration: none;
}

@media(max-width:414px) {
  .social-icons {
    margin-top: 30px;
  }
}

.loginow {
  font-size: 25px;
  line-height: 30px;
  color: var(--title-color);
  font-weight: bold;
}

.exitnow {
  font-size: 20px;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  /* 半透明背景，可以根据需要调整透明度 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  /* 确保弹窗在其他内容之上 */
}

.modal-content {
  background-color: #fff;
  /* 弹窗内容的背景颜色 */
  padding: 20px;
  border-radius: 5px;
}

.modal button {
  margin-top: 10px;
}

.modal-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  /* 添加透明背景 */
}
</style>