<template>
  <div class="containerhead">
    <nav>
      <ul>
        <router-link to="/"><li>首页</li></router-link>
        <router-link to="/resources"><li>资源</li></router-link>
        <router-link to="/videos"><li>视频</li></router-link>
        <router-link to="/docs"><li>视频</li></router-link>
        <router-link to="/posts"><li>视频</li></router-link>
        <router-link to="/login"><li class="login-btn">登录</li></router-link>
      </ul>
    </nav>
  </div>
  <router-view></router-view>
</template>
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
  margin-left: 0px; /* 改导航栏位置 */
}

.containerhead nav {
  background: #9e9e9e; /* 改导航栏背景颜色 */
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
  color: #d4d4d4; /* 改导航栏字体颜色 */
  cursor: pointer;
  position: relative;
  z-index: 2;
  transition: color 0.5s;
}

.containerhead nav ul li::after {
  content: '';
  background: #303030; /* 改导航栏接触颜色 */
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
  background: #818181; /* 改登录按钮背景颜色 */
  color: #fff; /* 改登录按钮字体颜色 */
  font-weight: bold;
  padding: 13px 25px;
  border-radius: 50px;
  left: 15px;
}

.containerhead nav ul li.login-btn::after {
  display: none;
  
}
</style>