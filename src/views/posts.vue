<template>
    <h3>博客</h3>
    <p>{{ chengpin.title }}</p> <!--又因为这个是一个数组，所以通过.title的方式获取数据-->
    <p>{{ chengpin.content }}</p>
    <div>
        <button @click="showModal = true">点击显示弹窗</button>

        <!-- 弹窗部分 -->
        <div class="modal" v-show="showModal">
            <div class="modal-content">
                <!-- 弹窗内容 -->
                <h3>这是一个弹窗</h3>
                <p>点击关闭按钮或背景以关闭弹窗</p>
                <button @click="closeModal">关闭</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            chengpin: "",
            showModal: false,
        }
    }, methods: {
        closeModal() {
            this.showModal = false; // 关闭弹窗
        },
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

<style>
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    /* 半透明背景，可以根据需要调整透明度 */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    /* 确保弹窗在其他内容之上 */
}

.modal-content {
    background-color: #fff;
    /* 弹窗内容的背景颜色 */
    padding: 20px;
    border-radius: 5px;
}

.modal button {
    margin-top: 10px;
}
</style>