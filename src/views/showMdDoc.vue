<template>
  <el-row justify="center" style="margin-bottom: 35px">
    <el-col :span="10">
      <div class="row">
        <div class="col-lg-8" v-html="pageData.richTxt">
        </div>

        <div class="col-lg-3 offset-lg-1">
          <div
            id="outline"
            class="js-toc toc sticky-top d-none d-lg-block animate__animated animate__fadeInRight animate__delay-1s"
          >
            <ol class="toc-list">
              <li class="toc-list-item">
                <a href="#为什么慢" class="toc-link node-name--H3">为什么慢</a>
              </li>
              <li class="toc-list-item">
                <a href="#如何修改镜像源" class="toc-link node-name--H3"
                  >如何修改镜像源</a
                >
                <ol class="toc-list">
                  <li class="toc-list-item is-active-li">
                    <a
                      href="#a---配置只在当前项目生效"
                      class="toc-link node-name--H4 is-active-link"
                      >a). 配置只在当前项目生效</a
                    >
                  </li>
                  <li class="toc-list-item">
                    <a href="#b---配置全局生效" class="toc-link node-name--H4"
                      >b). 配置全局生效</a
                    >
                  </li>
                </ol>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { marked } from "marked";

import { ElLoading } from "element-plus";
export default {
  setup() {},
  data() {
    return {
      resourceUrl: "",
      pageData:{
        richTxt:''
      }
    };
  },
  props: {
    id: -1,
  },
  mounted() {
    console.log(this)
    this.init_page();
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
      this.globalLoading(true);
      this.loadPageData();
    },
    loadPageData() {
      let vm = this;
      this.$store.dispatch("getDocDetailBy_DetailId", { id: this.$props.id })
        .then((resp) => {
          console.log(resp.data.data)
          vm.pageData=resp.data.data
          this.globalLoading(false);
        });
    },
  },

};
</script>

<style scoped>
@import "../assets/css/app.css";
@import "../assets/css/showMd.css";
</style>
