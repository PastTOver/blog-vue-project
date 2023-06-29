<template>
    <vue-particles class="particles-js" color="#fff" :particleOpacity="0.7" :particlesNumber="60" shapeType="circle"
        :particleSize="4" linesColor="#fff" :linesWidth="1" :lineLinked="true" :lineOpacity="0.4" :linesDistance="150"
        :moveSpeed="2" :hoverEffect="true" hoverMode="grab" :clickEffect="true" clickMode="push">
    </vue-particles>
    <section class="w3l-form-36">
        <div class="form-36-mian section-gap">
            <div class="wrapper">
                <div class="form-inner-cont">
                    <h3>立即注册</h3>
                    <form action="#" method="post" class="signin-form">
                        <div class="form-input">
                            <span class="fa fa-user" aria-hidden="true"></span>
                            <input v-model.lazy="registeruser" type="users" name="users" placeholder="请输入用户名" required />
                        </div>
                        <div class="form-input">
                            <span class="fa fa-key" aria-hidden="true"></span>
                            <input v-model.lazy="registerpwd" type="password" name="password" placeholder="请输入密码"
                                required />
                        </div>
                        <div class="form-input">
                            <span class="fa fa-envelope-o" aria-hidden="true"></span>
                            <input v-model.lazy="registeremail" type="email" name="email" placeholder="请输入邮箱" required />
                        </div>
                        <div class="form-input-code">
                            <span class="fa fa-code" aria-hidden="true">&nbsp;&nbsp;</span>
                            <input v-model.lazy="registercode" type="code" name="code" placeholder="请输入验证码" required />
                            <button @click.prevent="getcode">发送验证码</button>
                        </div>

                        <div class="login-remember d-grid">
                            <label class="check-remaind">
                                <input value="optionValue" v-model="selectedOptions" type="checkbox" />
                                <span class="checkmark"></span>
                                <p class="remember">同意用户协议</p>
                            </label>
                            <button class="btn theme-button" @click.prevent="registerbut">注册</button>
                        </div>
                    </form>
                    <p class="signup">已有网站账号? <a href="#" class="signuplink" @click.prevent="returnlogin">点击登录</a></p>
                </div>

                <!-- copyright -->
                <div class="copy-right">
                    <p>
                        &copy; 2023.Company name All rights reserved.
                        <a target="_blank" href="" @click.prevent="">用户协议</a>
                    </p>
                </div>
                <!-- //copyright -->
            </div>
        </div>
    </section>
</template>

<script>
import { setToken, getToken, clearToken, setImg } from '../storage.js'  //临时存放Token
export default {
    data() {
        return {
            registeruser: "",
            registeremail: "",
            registerpwd: "",
            registercode: "",
            inputcode: "",
            phonenumber: "",
            selectedOptions: [] // 绑定选中的复选框值
        }
    },
    mounted(){
      this.$emit('returntitle');

  },
    methods: {   //函数或方法
        registerbut() {   //当用户点击后，用户密码等传递给后端
            if (!this.selectedOptions.includes('optionValue')) {
                alert('请勾选用户协议');
                return
            }
            if (this.registeruser.length != 0 && this.registeremail.length != 0 && this.registerpwd.length != 0 && this.registercode.length != 0) {
                console.log("123")
                this.$axios.post(this.$globalInternet + "/registeredCode", this.$querystring.stringify({
                    code: this.registercode,
                    email: this.registeremail,   //通过post请求，并且携带参数，同时使用querystring修改格式
                    password: this.registerpwd,
                    phonenumber: this.phonenumber,
                    username: this.registeruser
                })).then(res => {
                    if (res.data.code === 200) {
                        const userData = res.data.data.userdata  //下面是保存token和图片链接
                        const avatarRegex = /avatar=(.*?),/;  //获取JSON中的链接，这个是匹配
                        const match = avatarRegex.exec(res.data.data.userdata);  //匹配数据
                        if (match && match[1]) {
                            const avatar = match[1];
                            setImg(avatar)
                            console.log(avatar);  //如果有就打印
                        } else {
                            console.log('Unable to extract avatar data');   //否则就错误
                        }
                        alert('注册成功');
                    } else {
                        alert('注册失败失败');
                    }
                })
            } else {
                alert('输入框不能为空');
            }
        },
        getcode() {   // 验证码
            if (this.registeremail.length != 0) {
                this.$axios.post(this.$globalInternet + "/registeredCode", this.$querystring.stringify({
                    email: this.registeremail,   //通过post请求，并且携带参数，同时使用querystring修改格式
                }))
                    .then(res => {
                        if (res.data.code === 200) {
                            alert('验证码已发送');
                        } else {
                            alert('验证码发送失败');
                        }
                    })
            } else {
                alert('邮箱不能为空');
                //这边还需要接受后端发来的验证码 赋值给inputcode
            }
        },
        returnlogin() {   //返回登录页面
            this.$router.push({ name: 'login' });
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

.particles-js {
    width: 100%;
    height: calc(100% - 100px);
    position: absolute;
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
    margin-left: 23%;
    position: absolute;
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
        max-width: 370px;
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
    /* 将背景图片向上移动100px */
    /* top: 100px; */
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
.form-input input[type="users"],
.form-input input[type="code"],
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

.form-input-code span.fa {
    color: var(--title-color);
    font-size: 14px;
    border-right: 1px solid #eee;
    margin-right: 4px;
}

.form-input-code {
    margin-top: 20px;
    background: rgba(31, 35, 35, 0.03);
    /* display: grid; */
    grid-template-columns: .1fr 1fr;
    align-items: center;
    padding-left: 15px;
    border: 1px solid rgba(31, 94, 180, 0.22);
    border-radius: 4px;
}

.form-input-code input[type="code"] {
    background: transparent;
    border: none;
    outline: none;
    width: 50%;
    font-size: 16px;
    padding: 0px 12px 0px 0px;
    color: var(--title-color);
    height: 45px;
    -webkit-appearance: none !important;
    appearance: none !important;
}

.form-input-code button {
    min-width: 117.5px;
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
    padding: 12px 6px;
    border-radius: 4px;
    transition: 0.3s ease;
    border: 1px solid var(--theme-color);
}

.form-input-code button:hover {
    background: #ffffff;
    color: #000000;
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



button.btn {
    line-height: 40px;
    padding: 0;
    min-width: 100px;
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
</style>