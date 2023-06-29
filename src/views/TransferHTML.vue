<template>
<h3>支付成功</h3>
</template>

<script>
import axios from 'axios';
import { setUrl, getUrl, clearUrl } from '../storage.js'  //临时存放Token

export default {
    mounted() {
        // 在 mounted 钩子函数中发送 GET 请求
        this.getData();
    },
    methods: {
        getData() {
            // 发送 GET 请求
            axios.get(this.$globalInternet + '/alipay/success')
                .then(response => {
                    // 请求成功的处理逻辑
                    console.log(response.data);
                    const specificURL = getUrl(); // 替换为你要跳转的特定URL地址
                    console.log(specificURL)
                    window.location.replace(specificURL);
                    // 使用 $router.push 方法进行路由跳转
                    // this.$router.push(specificURL);
                })
                .catch(error => {
                    // 请求失败的处理逻辑
                    console.error(error);
                });
        }
    }
};
</script>