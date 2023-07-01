<template>
  <div class="message-all">
    <div class="message-head">
      <div class="message-text">
        <span class="text-01">我的消息</span>
      </div>
    </div>
    <div class="message-left">
      <div class="left-text">联系人</div>
      <div
        v-if="isReloadData"
        class="left-contact"
        style="border: 2px solid #c8d4e7"
        v-for="value in contacts"
        @click="selectMessage($event)"
        :id="value.id"
        :title="value.avatar"
        :nickName="value.nickName"
      >
        <img class="left-contact-img" :src="value.avatar" />
        <el-badge :value="this.messageCount.count" :max="99" class="item">
          {{ value.nickName }}
        </el-badge>
      </div>
    </div>
    <div class="message-right">
      <div class="message-object">
        {{ this.contact.nickName }}
      </div>
      <div class="txt-all">
        <el-scrollbar
          class="el-scrollbar"
          direction="vertical"
          ref="myScrollbar"
        >
          <div style="width: 610px">
            <div class="left-contact" v-for="value in messages">
              <div class="left-contact-text-time">
                <span>{{ value.messageTime }}</span>
              </div>
              <div
                v-if="value.senderId == this.user.id"
                class="left-contact-text-right"
              >
                <span style="margin-right: 10px">{{
                  value.messageContent
                }}</span>
                <img class="left-contact-img" :src="this.user.avatar" />
              </div>
              <div v-else class="left-contact-text-left">
                <img class="left-contact-img" :src="this.contact.avatar" />
                <span>{{ value.messageContent }}</span>
              </div>
            </div>
            <!-- <div>底部</div> -->
          </div>
        </el-scrollbar>
      </div>
      <div class="message-input-box">
        <div class="box-tool">
          <span>输入窗口</span>
        </div>
        <div class="box-text">
          <el-input
            class="el-input"
            type="textarea"
            resize="none"
            :rows="3"
            placeholder="请输入内容"
            v-model="messageContent"
          >
          </el-input>
        </div>
        <div class="box-send">
          <el-button class="send-button" type="primary" @click="send"
            >发送</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import { setToken, getToken, clearToken, getImg } from "../../storage.js"; //临时存放Token
export default {
  data() {
    return {
      contacts: {},
      messages: {},
      params: {
        id: "",
      },
      user: {},
      contact: {
        nickName: "聊天对象",
      },
      messageContent: "",
      time: null,
      messageCount: {
        count: 0,
      },
      isReloadData: true,
    };
  },
  methods: {
    selectContacts() {
      this.$store.dispatch("selectContacts").then((ret) => {
        if(ret.data.data != null) {
            console.log(ret.data);
            this.contacts = ret.data.data;
            console.log(this.contacts);
            this.messageCount.id = this.contacts[0].id;
        }
      });
    },
    selectMessage(id) {
      // 获取当前点击对象的属性
      this.contact.id = id.target.id;
      this.contact.avatar = id.target.title;
      this.contact.nickName =
        id.currentTarget.getAttributeNode("nickName").value;
      this.params.id = id.target.id;
      console.log(this.contact);
      this.$store.dispatch("selectMessage", this.params).then((ret) => {
        console.log(ret.data);
        this.messages = ret.data.data;
        console.log(this.messages);
      });
    },
    flushedMessage() {
      this.$store.dispatch("selectMessage", this.params).then((ret) => {
        console.log(ret.data);
        this.messages = ret.data.data;
        console.log(this.messages);
      });
    },
    selectUser() {
      this.$store.dispatch("getUserData").then((ret) => {
        console.log(ret.data);
        this.user.id = ret.data.data.id;
        this.user.avatar = ret.data.data.avatar;
      });
    },
    send() {
      if (this.params.id === "") {
        this.handleClose("请先选择发送对象!");
        return false;
      }
      if (this.messageContent === "") {
        this.handleClose("发送内容为空!");
        return false;
      }
      this.params.messageContent = this.messageContent;
      console.log(this.params);
      this.$store.dispatch("sendMessage", this.params).then((ret) => {
        console.log(ret.data);
        if (ret.data.data === "发送成功") {
          console.log(ret.data.data);
          this.messageContent = "";
          // this.flushedMessage()
        }
      });
    },
    selectMessageCount() {
      this.$store
        .dispatch("selectMessageCount", this.messageCount)
        .then((ret) => {
          console.log(ret.data);
          this.messageCount.count = ret.data.data;
          console.log(this.messageCount);
        });
    },
    // 提示
    handleClose(txt) {
      this.$alert(txt, {
        confirmButtonText: "确定",
      });
    },
    queryInfo() {
      console.log(this.time);
      // console.log("刷新")
      this.flushedMessage();
    },
    reload() {
      this.isReloadData = false;
      this.$nextTick(() => {
        this.isReloadData = true;
      });
      if (this.messageContent.id != null) {
        this.selectMessageCount();
      }
    },
  },
  mounted() {
    console.log(getToken);
    this.selectContacts();
    this.selectUser();
    this.time = setInterval(() => {
      if (this.params.id != "") {
        this.queryInfo();
      }
      this.reload();
    }, 1500);
  },
  watch: {
    $route(to, from) {
      console.log(to.path);
      clearInterval(this.time);
    },
  },
  beforeDestroy() {
    clearInterval(this.time);
  },
  // updated() {
  //     this.$refs.myScrollbar.scrollTop = this.$refs.myScrollbar.clientHeight;
  // }
};
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

.el-scrollbar {
  width: 619px;
  height: 480px;
  display: flex;
  flex: none;
  background: white;
  border-style: double;
  border-color: #99a2aa;
  padding: 0px;
}

.el-input {
  height: 100%;
  resize: none;
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
  clear: both;
}

.left-contact-text-time {
  float: left;
  width: 600px;
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
  padding-left: 5px;
  height: 25%;
  border: 2px solid #ced3db;
}

.box-text {
  height: 45%;
  border: 2px solid #ced3db;
}

.box-send {
  padding-right: 5px;
  height: 30%;
  width: 100%;
  border: 2px solid #ced3db;
  text-align: right;
}

.send-button {
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
  padding: 5px 10px 5px 10px;
}

.item {
  padding-left: 10px;
  margin-top: 10px;
  margin-right: 40px;
}
</style>
 