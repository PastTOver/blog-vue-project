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
          <div class="col-9">
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
                      <li class="lecture doc">
                        <span class="lecture-title">
                          <el-popover
                            placement="top-start"
                            title="修改"
                            :width="200"
                            :height="400"
                            trigger="click"
                          >
                            <template #reference>
                              {{ sitem.titleName }}
                            </template>
                            <el-input
                              v-loading="freeChangeLoading"
                              v-model="sitem.titleName"
                              placeholder="不能为空"
                            />
                            <el-button @click="handlerFreeChange(sitem)"
                              >确认修改</el-button
                            >
                          </el-popover>
                        </span>
                        <div class="float-left">
                          <el-popover
                            placement="top-start"
                            title="修改"
                            :width="200"
                            :height="400"
                            trigger="click"
                          >
                            <template #reference>
                              <div>
                                <div
                                  v-if="sitem.resourceIsFree == 0"
                                  style="color: green; padding: 0px 25px"
                                >
                                  免费
                                </div>
                                <div v-else style="color: red; padding: 0px 25px">收费</div>
                              </div>
                            </template>
                            <el-select
                              v-loading="freeChangeLoading"
                              @change="handlerFreeChange(sitem)"
                              v-model="sitem.resourceIsFree"
                            >
                              <el-option value="0" label="免费" />
                              <el-option value="1" label="收费" />
                            </el-select>
                          </el-popover>
                        </div>

                        <div class="float-left" style="padding: 0px 25px">
                          <el-popover
                            placement="top-start"
                            title="修改"
                            :width="200"
                            :height="400"
                            trigger="click"
                          >
                            <template #reference>
                              <div>
                                排序:{{sitem.sort}},点击修改
                              </div>
                            </template>
                            <el-input-number
                                step="0.01"
                                :precision="2"
                              v-loading="freeChangeLoading"
                              v-model="sitem.sort"
                              placeholder="不能为空"
                            />
                            <el-button @click="handlerFreeChange(sitem)"
                              >确认修改</el-button
                            >
                          </el-popover>
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
import { ElLoading, ElMessageBox } from "element-plus";
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
      freeChangeLoading: false,
      //-------
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
    };
  },
  methods: {
    /**
     * 注册点击事件
     */
    handleFatherClick() {
      console.log("doing");
    },
    fatherTitltHandler(event, val) {
      console.log("doing");
    },
    handlerFreeChange(val, val2) {
      let vm = this;
      console.log(val);
      console.log(val2);
      console.log(this.docDetail.sonContent);
      this.freeChangeLoading = true;
      /**
       * updateDocDetail
       */
      this.$store.dispatch("Owner_Document_Detail_UPDATE", val).then((resp) => {
        vm.$store.dispatch("respFilter", { resp });
        console.log(resp);
        ElMessageBox.alert("修改成功");
        vm.freeChangeLoading = false;
      });
    },
    /**
     * 修改文档的详细
     */
    updateDocDetail() {},
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
      //vm.fatherSonClickRegister()
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
