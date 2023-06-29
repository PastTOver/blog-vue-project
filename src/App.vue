<template>
  <div class="containerhead" v-if="labelshow">
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
          <!-- <li>博客</li> -->
        </router-link>
        <router-link to="/login">
          <li class="login-btn" v-show="loginShow" @click="labelshowTF">登录</li>
        </router-link>
      </ul>
    </nav>
    <img class="img-fluidshadow" :src="this.img" @click="toggleDropdown" v-show="loginimg" /> <!--头像标签-->
    <div class="dropdown" v-if="showDropdown">
      <!-- 下拉框内容 -->
      <ul>
        <a @click="toggleDropdown"><router-link to="/personalCenter/inPersonalCenter">
          <li>个人信息</li>
          <!-- <li><a @click.prevent="Personal">个人信息</a></li> -->
        </router-link></a>
        <li><a @click.prevent="exitbut" @click="toggleDropdown">退出登录</a></li>
      </ul>
    </div>
  </div>
  <router-view @returnToIndex="performActionOnIndex" @returntitle="labelshowTF"></router-view>
</template>

<script>
import { setToken, getToken, clearToken, getImg } from './storage.js'  //临时存放Token
export default {
  data() {
    return {
      token: "",
      loginShow: true,   //未登录时默认为true，显示图标
      loginimg: false,
      img: "",
      labelshow: true,
      showDropdown: false, // 控制下拉框的显示和隐藏

    }
  },
  methods: {
    labelshowTF() {
      this.labelshow = false;
    },
    toggleDropdown() {
      this.showDropdown = !this.showDropdown; // 点击头像时切换显示和隐藏
    },
    performActionOnIndex(token) {
      // 在返回到 index.vue 时执行的操作，并返回参数
      console.log('App.vue 在返回到 index.vue 时执行的操作+123' + token)
      this.token = token
      // console.log(this.token.length)
      // if (this.token.length != 0) {
      //   this.loginShow = false
      //   this.loginimg = true
      //   setToken(token)
      // } else {
      //   this.loginShow = true
      //   this.loginimg = false
      // }

    }, exitbut() {   //退出登录按钮
      console.log(getToken())
      this.$axios.get(this.$globalInternet + "/user/logout", {
        headers: {
          token: getToken()
        }
      })
      clearToken();
      location.reload();
    }, Personal() {
      this.showDropdown = !this.showDropdown; // 点击头像时切换显示和隐藏
      console.log("跳转到个人信息页面")
    }
  },
  mounted() {   //页面刷新后，自动判断是否有Token
    const token = getToken()
    this.img = getImg()
    console.log(getImg())
    this.performActionOnIndex(token);
    if (token !== null) {
      if (token.length !== 0) {
        this.loginShow = false
        this.loginimg = true
        console.log("abca")
      } else {
        this.loginShow = true
        this.loginimg = false
      }

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

.img-fluidshadow {
  width: 50px;
  height: 50px;
  cursor: pointer;
  border-radius: 50%;
}

.containerhead {
  height: 6vh;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 0px;
  margin-bottom: 30px;
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

/* < !--这下面是关于点击头像出现下拉框的css代码--> */
.avatar {
  width: 50px;
  height: 50px;
  cursor: pointer;
}

.dropdown {
  position: absolute;
  top: 80px;
  left: -3%;
  width: 100px;
  background-color: #f1f1f1;
  border: 1px solid #ccc;
  padding: 10px;
  z-index: 999;
}

.dropdown ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.dropdown li {
  padding: 5px;
  cursor: pointer;
}

ui {
  z-index: 9999;
}
</style>