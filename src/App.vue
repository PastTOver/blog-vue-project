<template>
  <div class="containerhead">
    <nav>
      <ul>
        <router-link to="/">
          <li>首页</li>
        </router-link>
        <router-link to="/resources">
          <li>资源</li>
        </router-link>
        <router-link to="/videos">
          <li>视频</li>
        </router-link>
        <router-link to="/docs">
          <li>文档</li>
        </router-link>
        <router-link to="/posts">
          <li>博客</li>
        </router-link>
        <router-link to="/login">
          <li class="login-btn" v-show="loginShow">登录</li>
        </router-link>
      </ul>
    </nav>
    <img class="img-fluid shadow" src="./assets/logo.png" @click="toggleMenu" v-show="loginimg" />
    <button @click.prevent="exitbut">退出登录</button>
  </div>
  <router-view @returnToIndex="performActionOnIndex"></router-view>
</template>

<script>
import { setToken, getToken, clearToken } from './storage.js'  //临时存放Token
export default {
  data() {
    return {
      token: "",
      loginShow: true,   //未登录时默认为true，显示图标
      loginimg: false
    }
  },
  methods: {
    performActionOnIndex(token) {
      // 在返回到 index.vue 时执行的操作，并返回参数
      console.log('App.vue 在返回到 index.vue 时执行的操作+123' + token)
      this.token = token
      console.log(this.token.length)
      // if (this.token.length != 0) {
      //   this.loginShow = false
      //   this.loginimg = true
      //   setToken(token)
      // } else {
      //   this.loginShow = true
      //   this.loginimg = false
      // }

    }, exitbut() {   //退出登录按钮
      clearToken();
      location.reload();
    }
  },
  mounted() {   //页面刷新后，自动判断是否有Token
    const token = getToken();
    console.log(token)
    this.performActionOnIndex(token);
    if (token.length != 0) {
      this.loginShow = false
      this.loginimg = true
    } else {
      this.loginShow = true
      this.loginimg = false
    }

  }

}

</script>
  
<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}

.containerhead {
  height: 6vh;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 0px;
  /* 改导航栏位置 */
}

.containerhead nav {
  background: #9e9e9e;
  /* 改导航栏背景颜色 */
  border-radius: 50px;
  padding: 10px;
  box-shadow: 0 10px 20px -20px rgba(0, 0, 0, 0.4);
}

.containerhead nav ul li {
  list-style: none;
  display: inline-block;
  padding: 13px 35px;
  margin: -10px;
  font-size: 18px;
  font-weight: 500;
  color: #d4d4d4;
  /* 改导航栏字体颜色 */
  cursor: pointer;
  position: relative;
  z-index: 2;
  transition: color 0.5s;
}

.containerhead nav ul li::after {
  content: '';
  background: #303030;
  /* 改导航栏接触颜色 */
  width: 75%;
  height: 75%;
  border-radius: 30px;
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: -1;
  opacity: 0;
  transition: top 0.5s, opacity 0.5s;
}

.containerhead nav ul li:hover {
  color: #fff;
}

.containerhead nav ul li:hover::after {
  top: 50%;
  opacity: 1;
}

.containerhead nav ul li.login-btn {
  background: #818181;
  /* 改登录按钮背景颜色 */
  color: #fff;
  /* 改登录按钮字体颜色 */
  font-weight: bold;
  padding: 13px 25px;
  border-radius: 50px;
  left: 15px;
}

.containerhead nav ul li.login-btn::after {
  display: none;

}
</style>