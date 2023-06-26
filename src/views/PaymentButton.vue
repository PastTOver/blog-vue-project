<template>
  <div>
    <button class="payment-button" @click="handlePayment">支付</button>
    <div v-html="paymentForm"></div>
  </div>
</template>

<script>
import axios from "axios";
import { setToken, getToken, clearToken, setImg } from "../storage"; //临时存放Token

export default {
  data() {
    return {
      paymentForm: "<h1>test</h1>", // 初始化为空字符串
    };
  },
  methods: {
    mounted() {
      this.fetchPaymentForm();
    },
    handlePayment() {
      let vm = this;
      axios
        .post(
          this.$globalInternet + "/alipay/pay",
          {
            type: "video",
            name: "test",
            uid: "17",
            vid: "4",
            price: "999",
          },
          {
            headers: {
              "Content-Tyoe": "application/json",
              token: getToken(),
            },
          }
        )
        .then((response) => {
          // 处理支付成功的逻辑
          vm.paymentForm = response.data;
          document.forms[0].submit();
          console.log(vm.paymentForm);
          console.log(this.paymentForm);
          console.log("支付成功", response.data);
          //document.getElementById('test').append(response.data)
          // 跳转到支付页面
          this.submitPaymentForm();
        })
        .catch((error) => {
          // 处理支付失败的逻辑
          console.error("支付失败", error);
        });
      console.log("支付按钮被点击");
      console.log(getToken());
    },
    submitPaymentForm() {
      const form = document.getElementById("form");
      if (form) {
        form.submit();
      }
    },
  },
};
</script>

<style scoped>
.payment-button {
  /* 样式定义 */
  /* 可根据需求进行样式设置，如背景颜色、边框、字体等 */
}
</style>
