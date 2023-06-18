<template>
    <div class="alert alert-success" role="alert">
    </div>
    <div class="form-36-mian section-gap">
        <div class="wrapper">
            <div class="form-inner-cont">
                <h3>立即登录</h3>
                <form action="#" method="post" class="signin-form">
                    <div class="form-input">
                        <span class="fa fa-envelope-o" aria-hidden="true"></span> <input v-model.lazy="user" name="email"
                            placeholder="Username" required />
                    </div>
                    <div class="form-input">
                        <span class="fa fa-key" aria-hidden="true"></span> <input v-model.lazy="pwd" type="password"
                            name="password" placeholder="Password" required />
                    </div>
                    <div class="new-signup">
                    </div>

                    <button @click.prevent="itbaizhanContents()">登录</button>
                    <a @click.prevent="registerHTML" href="#">注册</a>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { useTransitionFallthroughEmits } from 'element-plus'
import { setToken, getToken, clearToken } from '../storage.js'  //临时存放Token
export default {
    data() {
        return {
            user: "",
            pwd: "",
        }
    },
    methods: {   //函数或方法
        itbaizhanContents() {   //当用户点击后，用户密码传递给后端
            console.log(this.$globalInternet + "/user/login")
            if (this.user.length != 0 && this.pwd.length != 0) {
                this.$axios.post(this.$globalInternet + "/user/login", this.$querystring.stringify({
                    email: this.user,   //通过post请求，并且携带参数，同时使用querystring修改格式
                    password: this.pwd,
                }))
                    .then(res => {
                        if (res.data.code === 200) {
                            console.log('登录成功')
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