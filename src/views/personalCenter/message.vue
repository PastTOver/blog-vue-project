<template>
    <div class="message-all">
        <div class="message-head">
            <div class="message-text">
                <span class="text-01">我的消息</span>
            </div>
        </div>
        <div class="message-left">
            <div class="left-text">
                联系人
            </div>
            <div class="left-contact" style="border: 2px solid #c8d4e7;" v-for="value in contacts" 
            @click="selectMessage($event)" :id="value.id" :title="value.avatar">
                <img class="left-contact-img" :src="value.avatar">
                {{ value.nickName }}
            </div>
        </div>
        <div class="message-right">
            <div class="message-object">
                聊天对象
            </div>
            <div class="txt-all">
                <el-main direction="vertical">
                    <div style="width: 610px;">
                        <div class="left-contact" v-for="value in messages">
                            <div class="left-contact-text-time">
                                <span>{{ value.messageTime }}</span>
                            </div>
                            <div v-if="value.senderId == this.user.id" class="left-contact-text-right">
                                <span style="margin-right: 10px;">{{ value.messageContent }}</span>
                                <img class="left-contact-img" :src="this.user.avatar">
                            </div>
                            <div v-else class="left-contact-text-left">
                                <img class="left-contact-img" :src="this.contact.avatar">
                                <span>{{ value.messageContent }}</span>
                            </div>
                        </div>
                    </div>
                </el-main>
            </div>
            <div class="message-input-box">
                <div class="box-tool">
                    <span>表情</span>
                </div>
                <div class="box-text">
                    <!-- <lay-textarea placeholder="发送内容" v-model="data"></lay-textarea> -->
                </div>
                <div class="box-send">
                    <!-- <lay-button class="send-button" border="green" @click="send">发送</lay-button> -->
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>

export default {
    data() {
        return {
            contacts: {},
            messages: {},
            params: {},
            user: {},
            contact: {}
        }
    },
    methods: {
        selectContacts() {
            this.$store
                .dispatch("selectContacts")
                .then((ret) => {
                    console.log(ret.data)
                    this.contacts = ret.data.data
                    console.log(this.contacts)
                })
        },
        selectMessage(id) {
            this.contact.id = id.target.id;
            this.contact.avatar = id.target.title;
            this.params.id = id.target.id
            this.$store
                .dispatch("selectMessage", this.params)
                .then((ret) => {
                    console.log(ret.data)
                    this.messages = ret.data.data
                    console.log(this.messages)
                })
        },
        selectUser() {
            this.$store
                .dispatch("getUserData")
                .then((ret) => {
                    console.log(ret.data)
                    this.user.id = ret.data.data.id
                    this.user.avatar = ret.data.data.avatar
                })
        }
    },
    mounted: function () {
        this.selectContacts();
        this.selectUser();
    }
}
</script>
  
<style scoped>
.message-all {
    float: left;
    height: auto;
    line-height: 50px;
}

.message-head {
    width: 794.5px;
    border-bottom: 2px solid #ddd;
}

.message-text {
    font-size: 18px;
    height: 56px;
    padding-left: 20px;
    padding-top: 5px;
}

.el-main {
    width: 619px;
    height: 480px;
    display: flex;
    flex: none;
    background: white;
    border-style: double;
    border-color: #99a2aa;
    padding: 0px;
}

.text-01 {
    border-left: 5px solid blue;
}

.message-left {
    float: left;
    width: 22%;
    height: 725px;
    /* background-color: brown; */
    border-right: 2px solid #ced3db;
}

.left-text {
    text-align: center;
    border: 2px solid #ced3db;
}

.left-contact {
    margin: 5px 0px;
    height: 60px;
    width: 100%;
    float: left;
    /* border: 2px solid #c8d4e7; */
    /* background-color: cornsilk */
}

.left-contact-text-left {
    text-align: left;
    float: left;
    width: 590px;
    clear: both
}

.left-contact-text-time {
    float: left;
    width: 590px;
    text-align: center;
}

.left-contact-img {
    width: 40px;
    height: 40px;
    border-radius: 50%;

}

.message-right {
    float: left;
    width: 78%;
    /* height: 742px; */
    /* background-color: chartreuse; */
}

.message-object {
    text-align: center;
    border: 2px solid #ced3db;
}

.message-input-box {
    height: 192px;
    border-top: 2px solid #ced3db;
}

.box-tool {
    height: 25%;
    border: 2px solid #ced3db;
}

.box-text {
    height: 45%;
    border: 2px solid #ced3db;
}

.box-send {
    padding: 20px 5px 0;
    height: 30%;
    border: 2px solid #ced3db;
}

.send-button {
    float: right;
    width: 70px;
    height: 35px;
}

.txt-all {
    height: 481px;
    text-align: right;
    line-height: 25px;
}

.txt-right {
    width: 300px;
    /* float: right; */
    /* white-space:normal;  */
    /* word-break:break-all; */
    /* overflow:hidden; */
    display: inline-block;
    text-align: justify;
}

.txt-left {
    width: 300px;
    float: left;
    white-space: normal;
    word-break: break-all;
    overflow: hidden;
    text-align: left;
}

.emojis {
    border: 1px solid black;
    padding: 5px 10px 5px 10px
}
</style>
 