<template>
  <div v-if="docDetail" class="container video-collections-show mb-2rem">
    <div class="row justify-content-center">
      <div class="col-lg-9">
        <div
          class="row"
          style="
            background: linear-gradient(to bottom, #87cefa, #4169e1);
            padding-top: 25px;
          "
        >
          <div class="col-3">
            <img
              class="img-fluid shadow-sm"
              :src="docDetail.documentTopics.documentImage"
            />
          </div>
          <div class="col-6">
            <div class="base-info">
              <p class="font-size-12 text-muted mb-1">名称</p>
              <h1 class="h4">{{ docDetail.documentTopics.documentName }}</h1>
              <p class="font-size-12 text-muted mb-1">简介</p>
              <p class="">
                {{ docDetail.documentTopics.documentSummary }}
              </p>
              <p
                class="font-size-12 text-muted mb-1"
                v-if="docDetail.publisherUser != undefinde"
              >
                作者
              </p>
              <p class="font-size-14">
                <a>
                  {{
                    docDetail.publisherUser
                      ? docDetail.publisherUser.nickName
                      : "匿名用户"
                  }}
                </a>
              </p>
            </div>
            <div>
              <p
                v-if="docDetail.documentTopics.resourceIsFree == 1 && !canShow"
                class="text-danger"
              >
                价格:{{ docDetail.documentTopics.price }}
              </p>
              <p v-else-if="docDetail.canShow" class="text-success">
                您已经购买
              </p>
              <p v-else class="text-success">免费</p>
            </div>
          </div>
          <!-- 证书 -->
          <div v-if="certData" class="col-3" style="background-color:gold;box-shadow:0 0 10px rgba(0,0,0,0.8)" >
            <h3>已获得证书:</h3>
            <img
              class="img-fluid shadow-sm"
              src="http://localhost:9001/static/defaultValues/img.png"
            />
            <h4>证书名称</h4>
          </div>
          <div v-if="!certData && certProgress.resourceCount==0" class="col-3" style="background-color:gold;box-shadow:0 0 10px rgba(0,0,0,0.8)" >
            <h5>本模块暂时无任何视频，未颁布证书</h5>
            <img
              class="img-fluid shadow-sm"
              src="http://localhost:9001/static/defaultValues/img.png"
            />
          </div>
          <div v-if="!certData && certProgress.resourceCount>0" class="col-3" style="background-color:gold;box-shadow:0 0 10px rgba(0,0,0,0.8)" >
            <h5>正在学习中~您的完成进度为:</h5>
            <img
              class="img-fluid shadow-sm"
              src="http://localhost:9001/static/defaultValues/img.png"
            />
            <el-progress style="margin-top:25px" :percentage="50" />
          </div>
        </div>
        <div
          class="collections-syllas-box mt-5"
          v-if="docDetail.sonContent && docDetail.sonContent.length > 0"
        >
          <p class="font-size-12 text-muted mb-1">内容</p>
          <div class="py-2 small d-flex justify-content-between">
            <span
              >共 {{ docDetail.sonContent.length }} 个章节 •
              {{ sourceCount }} 篇文章</span
            >
            <el-button type="primary" @click="showAll">展开全部章节</el-button>
          </div>
          <div class="collections-syllabus">
            <el-collapse
              style="font-weight: bolder"
              v-model="activeName"
              v-for="(item, index) in docDetail.sonContent"
              v-bind="item.id"
              @change="handleChange"
            >
              <el-collapse-item
                style="font-weight: normal"
                :title="item.titleName"
                :name="index"
              >
                <div id="collapse-1" class="lecture-list collapse show">
                  <ul class="font-size-20">
                    <div v-for="sitem in item.sonContent">
                      <router-link
                        v-if="sitem.canShow"
                        :to="{ name: 'showMdDoc', params: { id: sitem.id } }"
                      >
                        <li class="lecture doc">
                          <span class="lecture-title">{{
                            sitem.titleName
                          }}</span>
                          <div class="float-right">
                            <div
                              v-if="sitem.resourceIsFree == 0"
                              style="color: green"
                            >
                              本资源免费
                            </div>
                            <div v-else-if="sitem.canShow" style="color: green">
                              您已购买，可直接查看
                            </div>
                            <div v-else style="color: red">
                              请先购买本模块内容
                            </div>
                          </div>
                        </li>
                      </router-link>
                      <li
                        @click="this.$alert('您请先购买本模块内容', '提示')"
                        style="cursor: pointer"
                        v-else
                        class="lecture doc"
                      >
                        <span class="lecture-title">{{ sitem.titleName }}</span>
                        <div class="float-right">
                          <div v-if="!sitem.canShow" style="color: red">
                            付费解锁
                          </div>
                          <div v-else style="color: green">免费</div>
                        </div>
                      </li>
                    </div>
                  </ul>
                </div>
              </el-collapse-item>
            </el-collapse>
          </div>
        </div>
        <div v-else>
          <h1>该主题文档暂时为空</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ElLoading } from "element-plus";
import { getToken, clearToken } from "@/storage";
export default {
  setup() {},
  created() {},
  mounted() {
    this.globalLoading(true);
    this.init_page();
  },
  props: {
    id: -1,
  },
  data() {
    return {
      certParams: {
        /**
         * 表示videoType
         */
        resourceType: 1,
        topicId: undefined,
      },
      activeName: [],
      docDetail: {
        documentTopics: {
          documentImage: "img",
          documentName: "title",
          documentSummary: "summary",
          publisherName: "作者",
        },
        sonContent: [],
        publisherUser: {
          nickName: "",
        },
      },
      sourceCount: 0,
      certData:undefined,
      certProgress:{
      }
    };
  },
  methods: {
    loadDocCert() {
      //修改topicId
      this.certParams.topicId = this.$props.id;
      console.log(this.certParams.topicId);
      let vm = this;
      if (this.certParams.topicId)
        this.$store
          .dispatch("User_Cert_GET", {
            topicId: vm.certParams.topicId,
            resourceType:1
          })
          .then((resp) => {
            console.log(resp);
            //this.$store.dispatch("respFilter", { resp });
            let certData=resp.data.data
            if(resp.data.code==200){
              //有证书
              certData=certData
            }else if(resp.data.code==201){
              console.log('没证书:');
              console.log(certData)
              //没有证书
              if(certData.resourceCount==0){
                //视频资源为0 不颁发证书
                vm.certData=undefined
                vm.certProgress=certData
              }else{
                //显示进度
                vm.certData=undefined
                vm.certProgress=certData
              }
            }
          });
    },
    /**
     * 处理208请求
     */
    handleNoAuth() {
      alert("您还未登录，请返回登录页面进行登录！");
      clearToken();
      this.globalLoading(false);
      window.location.href = "http://localhost:8080/#/login";
      return;
    },
    globalLoading(isEnable) {
      if (isEnable)
        this.loadingService = ElLoading.service({
          fullscreen: true,
        });
      else {
        this.loadingService.close();
      }
    },
    init_page() {
      this.loadPageData();
      this.loadDocCert();
    },
    loadPageData() {
      let vm = this;
      console.log(this.$props);
      //如果用户登录了  获取需要权限的接口 如果209 获取免费接口
      if (getToken()) {
        console.log(getToken());
        vm.$store
          .dispatch("getDocDetail", { id: vm.$props.id })
          .then((resp2) => {
            console.log("-----------------resp2:");
            if (resp2.data.code == 208) {
              vm.handleNoAuth();
              return;
            }
            if (resp2.data.code == 209) {
              vm.$store
                .dispatch("getDocDetail_Free", { id: vm.$props.id })
                .then((resp) => {
                  console.log("-----------------resp2:");
                  if (resp.data.code == 208) {
                    vm.handleNoAuth();
                    return;
                  }
                  console.log(resp);
                  vm.handlerResp(vm, resp);
                });

              return;
            }
            console.log(resp2);
            vm.handlerResp(vm, resp2);
          });
      } else {
        console.log("mei token");
        console.log(getToken());
        //如果没登陆 直接访问免费的接口
        this.$store
          .dispatch("getDocDetail_Free", { id: vm.$props.id })
          .then((resp) => {
            console.log("-----------------resp:");
            console.log(resp);
            if (resp.data.code == 208) {
              vm.handleNoAuth();
              return;
            }
            vm.handlerResp(vm, resp);
          });
      }
    },
    handlerResp(vm, resp) {
      vm.docDetail = resp.data.data;
      vm.globalLoading(false);
      //计算sourceCount
      let count = 0;
      if (vm.docDetail.sonContent && vm.docDetail.sonContent.length > 0) {
        vm.docDetail.sonContent.forEach((element) => {
          count += element.sonContent.length;
        });
        vm.sourceCount = count;
      }
      //console.log(vm.docDetail);
    },
    showAll() {
      if (this.activeName.length == 0) {
        for (let i = 0; i < this.docDetail.sonContent.length; i++) {
          this.activeName.push(i);
        }
      } else {
        this.activeName = [];
      }
    },
  },
};
</script>

<style scoped>
@import "../assets/css/app.css";
</style>
