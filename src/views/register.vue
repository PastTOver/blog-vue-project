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
export default {
    data() {
        return {
            registeruser: "",
            registeremail: "",
            registerpwd: "",
            registercode: "",
            inputcode: ""
        }
    },
    methods: {   //函数或方法
        registerbut() {   //当用户点击后，用户密码等传递给后端
            if (this.registeruser.length != 0 && this.registeremail.length != 0 && this.registerpwd.length != 0 && this.registercode.length != 0) {
                console.log("123")
            } else {
                console.log("321")
                alert('输入框不能为空');
            }
        },
        getcode() {
            if (this.registeremail.length != 0) {
                console.log(this.registeremail)
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