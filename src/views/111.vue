<template>
    <section class="w3l-form-36">
        <div class="form-36-mian section-gap">
            <div class="wrapper">
                <div class="form-inner-cont">
                    <h3>立即登录</h3>
                    <form action="#" method="post" class="signin-form">
                        <div class="form-input">
                            <span class="fa fa-envelope-o" aria-hidden="true"></span>
                            <input type="email" v-model="email" placeholder="邮箱" required />
                        </div>
                        <div class="form-input">
                            <span class="fa fa-key" aria-hidden="true"></span>
                            <input type="password" v-model="password" placeholder="密码" required />
                        </div>
                        <div class="login-remember d-grid">
                            <label class="check-remaind">
                                <input type="checkbox" v-model="autoLogin" />
                                <span class="checkmark"></span>
                                <p class="remember">自动登录</p>
                            </label>
                            <button class="btn theme-button" @click="login">登录</button>
                        </div>
                        <div class="new-signup">
                            <a href="#reload" class="signuplink">忘记密码?点击找回</a>
                        </div>
                    </form>
                    <div class="social-icons">
                        <p class="continue"><span>Or</span></p>
                        <div class="social-login">
                            <a href="#weixin">
                                <div class="weixin">
                                    <span class="fa fa-weixin" aria-hidden="true"></span>
                                </div>
                            </a>
                        </div>
                    </div>
                    <p class="signup">没有网站账号? <a href="#signup.html" class="signuplink">点击注册</a></p>
                </div>

                <div class="copy-right">
                    <p>
                        {{ getCopyRightText() }}
                        <a target="_blank" href="">用户证书</a>
                    </p>
                </div>
            </div>
        </div>
    </section>
</template>
  
<script>
export default {
    data() {
        return {
            email: '',
            password: '',
            autoLogin: false
        };
    },
    methods: {
        login() {

            console.log('Email:', this.email);
            console.log('Password:', this.password);
            console.log('Auto Login:', this.autoLogin);

        },
        getCopyRightText() {
            const currentYear = new Date().getFullYear();
            return `版权所有 &copy; ${currentYear}. 公司名称 保留所有权利.`;
        }
    }
};
</script>
  
<style>
@import 'css/font-awesome.css';


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
    -webkit-appearance: none;
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
    -webkit-appearance: none;
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
    background-image: linear-gradient(to right, rgba(0, 0, 0, 0.85), rgba(255, 255, 255, 0)), url(../images/women.jpg);
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
    -webkit-appearance: none;
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
    display: block;
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
</style>
  