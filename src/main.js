import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import querystring from "querystring"
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'


const app=createApp(App)
app.config.globalProperties.$globalInternet = "http://192.168.123.33:9001";  //设置全局变量
app.config.globalProperties.$globaltoken = "";
app.config.globalProperties.$axios = axios
app.config.globalProperties.$querystring = querystring

app.use(ElementPlus)
app.use(router).mount('#app')
