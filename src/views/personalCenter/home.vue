<template>
    <div class="home-all">
        <div class="home-separate">
            <div class="home-head">
                <img :src="this.img">
            </div>
            <div class="home-right">
                <div>
                    <span class="home-nick-name">{{ this.nickname }}</span>
                    <router-link tag="div" to='/personalCenter/data-update'>
                        <span class="home-to-update">修改信息</span>
                    </router-link>
                </div>
                <div>
                    <span>邮箱: {{ this.email }}</span>
                </div>
                <div>
                    <span>手机号: {{ this.phone }}</span>
                </div>
                <div>
                    <span>性别: {{ this.sex }}</span>
                </div>
            </div>
        </div>
        <!-- <div class="home-separate">
            消息记录信息
        </div>
        <div class="home-separate">
            资源记录信息
        </div> -->
    </div>
</template>
  
<script>
import axios from 'axios';
import { setToken, getToken, clearToken, getImg } from '../../storage.js'  //临时存放Token
export default {
    data() {
        return {
            form: {
                nickname: '',
                sex: false,
                password: '',
                email: '',
                phone: ''
            },
            imageUrl: '',
            nickname: "",
            img: getImg(),
            email: "",
            phone: "",
            sex: ""
        }
    },
    methods: {
        getUserData() {
            this.$store
                .dispatch("getUserData")
                .then((ret) => {
                    console.log(ret.data)
                    this.nickname = ret.data.data.nickName
                    this.email = ret.data.data.email
                    this.phone = ret.data.data.phonenumber
                    this.img = ret.data.data.avatar
                    if (ret.data.data.sex == 1) {
                        this.sex = "男"
                    } else {
                        this.sex = "女"
                    }
                })
        },
    },
    mounted: function () {
        this.getUserData();
    }
}
</script>
  
<style scoped>
.home-all {
    width: 100%;
    padding: 50px 20px 0;
}

.home-separate {
    float: left;
    width: 100%;
    height: 33.3%;
    border-bottom: 3px solid #e1e2e5;
}

.home-head {
    display: inline-block;
    vertical-align: top;
    position: relative;
    cursor: pointer;
    width: 160px;
    height: 160px;
    border-radius: 50%;
    overflow: hidden;
    border: 5px solid rgb(18, 142, 214);
    margin-right: 30px;
}

.home-right {
    display: inline-block;
    margin-left: 16px;
    width: auto;
    line-height: 40px;
}

.home-nick-name {
    font-size: 24px;
}

.home-to-update {
    margin-left: 20px;
    /* top: 8px; */
    width: 70px;
    height: 22px;
    display: inline-block;
    border-radius: 4px;
    border: 1px solid #ced3db;
    color: #6d757a;
    text-align: center;
    cursor: pointer;
    line-height: 20px;
    font-size: 14px;
}

img {
    width: 100%;
    height: 100%;
}
</style>
 