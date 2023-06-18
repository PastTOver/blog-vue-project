<template>
    <h3>博客</h3>
    <p>{{ chengpin.title }}</p> <!--又因为这个是一个数组，所以通过.title的方式获取数据-->
    <p>{{ chengpin.content }}</p>
</template>

<script>
export default {
    data() {
        return {
            chengpin: ""
        }
    },
    mounted() {
        this.$axios.get("http://iwenwiki.com/api/blueberrypai/getChengpinDetails.php")   //通过get方式请求
            .then(res => {
                console.log(res.data)
                this.chengpin = res.data.chengpinDetails[0]  //chengpinDetails将这个字段复制给chengpin
            }),
            this.$axios.post("http://iwenwiki.com/api/blueberrypai/login.php", this.$querystring.stringify({
                user_id: "iwen@qq.com",   //通过post请求，并且携带参数，同时使用querystring修改格式
                password: "iwen123",
                verification_code: "crfvw"
            }))
                .then(res => {
                    console.log(res.data)
                })
    }
}
</script>