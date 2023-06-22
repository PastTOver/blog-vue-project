<template>
  <div class="container video-collections-show mb-2rem">
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
                {{docDetail.documentTopics.documentSummary}}
              </p>
              <p class="font-size-12 text-muted mb-1">作者</p>
              <p class="font-size-14">
                <a>
                   {{docDetail.publisherUser.nickName}}
                </a>
              </p>
            </div>
            <div>
              <p v-if="docDetail.documentTopics.price" class="text-danger">
                价格:{{ docDetail.documentTopics.price }}
              </p>
              <p v-else class="text-success">免费</p>
            </div>
          </div>
        </div>
        <div class="collections-syllabus-box mt-5">
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
                            <div v-if="!sitem.canShow" style="color: red">
                              付费解锁
                            </div>
                            <div v-else style="color: green">免费</div>
                          </div>
                        </li>
                      </router-link>
                      <li @click="this.$alert('您请先购买本模块内容','提示')" style="cursor:pointer" v-else class="lecture doc">
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
      </div>
    </div>
  </div>
</template>

<script>
import { ElLoading } from "element-plus";

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
      activeName: [],
      docDetail: {
        documentTopics: {
          documentImage: "img",
          documentName: "title",
          documentSummary: "summary",
          publisherName: "作者",
        },
        sonContent: [],
        publisherUser:{
          nickName:''
        }
      },
      sourceCount: 0,
    };
  },
  methods: {
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
      this.$store
        .dispatch("getDocDetail", { id: vm.$props.id })
        .then((resp) => {
          vm.docDetail = resp.data.data;
          vm.globalLoading(false);
          //计算sourceCount
          let count = 0;
          vm.docDetail.sonContent.forEach((element) => {
            count += element.sonContent.length;
          });
          vm.sourceCount = count;
          console.log(vm.docDetail);
        });
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
