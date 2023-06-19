<template>
    <h3>注册</h3>
    <div>
        <input type="text" v-model.lazy="registeruser" name="registeruser" placeholder="请输入用户名" required />
    </div>
    <div>
        <input type="password" v-model.lazy="registerpwd" name="registerpwd" placeholder="请输入密码" required />
    </div>
    <div>
        <input type="email" v-model.lazy="registeremail" name="registeremail" placeholder="请输入邮箱" required />
    </div>
    <div>
        <input type="text" v-model.lazy="registercode" name="registercode" placeholder="请输入验证码" required />
        <button @click.prevent="getcode">发送验证码</button>
    </div>
    <button @click.prevent="registerbut">注册</button>
    <button @click.prevent="returnlogin">登录</button>
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
            phonenumber: ""
        }
    },
    methods: {   //函数或方法
        registerbut() {   //当用户点击后，用户密码等传递给后端
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
        getcode() {
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
        returnlogin() {
            this.$router.push({ name: 'login' });
        }
    }
}
</script>