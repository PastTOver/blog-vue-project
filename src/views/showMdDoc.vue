<template>
  <el-row justify="center" style="margin-bottom: 35px">
    <el-col :span="10">
      <div class="row">
        <div class="col-lg-8" v-html="mdtext"></div>

        <div class="col-lg-3 offset-lg-1">
          <ol class="toc-list" v-html="tochtml"></ol>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { marked } from "marked";
import { ElLoading } from "element-plus";
import { reactive } from "vue";
import { getToken, clearToken } from "@/storage";
export default {
  setup() {},
  data() {
    return {
      resourceUrl: "",
      pageData: {
        richTxt: "",
      },
      mdtext: "",
      tochtml: "",
    };
  },
  props: {
    id: -1,
  },
  computed: {},
  mounted() {
    this.init_page();
  },
  methods: {
    /**
     * 处理208请求
     */
    handleNoAuth() {
        alert("您还未登录，请返回登录页面进行登录！");
        clearToken()
        this.globalLoading(false);
        window.location.href = "http://localhost:8080/#/login";
        return;
    },
    toc() {
      const headings = Array.from(
        document.querySelectorAll("h1, h2, h3, h4, h5, h6")
      );
      const tocItems = headings.map((heading) => {
        return {
          id: heading.id,
          text: heading.textContent,
          level: parseInt(heading.tagName.slice(1)),
        };
      });
      const tocHtml = tocItems
        .map((item) => {
          return `<li class="toc-list-item is-active-li"><a onclick="document.getElementById('${item.id}').scrollIntoView()" class="toc-link node-name--${item.level}">${item.text}</a></li>`;
        })
        .join("");
      return tocHtml;
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
      this.globalLoading(true);
      this.loadPageData();
    },
    loadPageData() {
      let vm = this;
      /**
       * 1. 尝试获取免费资源
       */
      this.$store
        .dispatch("getDocDetailBy_DetailId_Free", { detailId: this.$props.id })
        .then((resp) => {
          console.log(resp)
          //如果资源不是免费资源
          if (resp.data.code == 209) {
            //去获取收费接口数据
            vm.$store
              .dispatch("getDocDetailBy_DetailId", { detailId: vm.$props.id })
              .then((resp2) => {
                          console.log(resp2)
                if (resp2.data.code == 208) {
                  vm.handleNoAuth();
                  return;
                }
                if (resp2.data.code == 209) {
                  alert("请先购买本模块内容!");
                  vm.globalLoading(false);
                  window.location.href = "http://localhost:8080/#/";
                  return;
                }
                vm.pageData = resp2.data.data;
                vm.loadMdSourece(vm);
              });
            return;
          }
          console.log("resp:----------");
          console.log(resp);
          vm.pageData = resp.data.data;
          vm.loadMdSourece(vm);
        });
    },
    /**
     * 加载md
     */
    loadMdSourece(vm) {
      vm.$store
        .dispatch("getDocDetail_Resource", { url: vm.pageData.documentPath })
        .then((resp) => {
          console.log(resp);
          vm.mdtext = marked(resp.data);
          //vm.$set(vm,'mdtext', marked(resp.data))
          setTimeout(() => {
            (vm.tochtml = vm.toc()), 1000;
          });
        });
      this.globalLoading(false);
    },
  },
};
</script>

<style scoped>
@import "../assets/css/app.css";
@import "../assets/css/showMd.css";

h1 {
  font-size: 2em;
  font-weight: bold;
  margin-top: 1em;
  margin-bottom: 0.5em;
}

h2 {
  font-size: 1.5em;
  font-weight: bold;
  margin-top: 1em;
  margin-bottom: 0.5em;
}

h3 {
  font-size: 1.17em;
  font-weight: bold;
  margin-top: 1em;
  margin-bottom: 0.5em;
}

h4 {
  font-size: 1em;
  font-weight: bold;
  margin-top: 1em;
  margin-bottom: 0.5em;
}

h5 {
  font-size: 0.83em;
  font-weight: bold;
  margin-top: 1em;
  margin-bottom: 0.5em;
}

h6 {
  font-size: 0.67em;
  font-weight: bold;
  margin-top: 1em;
  margin-bottom: 0.5em;
}

/* 段落样式 */
p {
  margin-top: 0.5em;
  margin-bottom: 0.5em;
}

/* 列表样式 */
ul,
ol {
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  margin-left: 1.5em;
}

li {
  margin-top: 0.5em;
  margin-bottom: 0.5em;
}

/* 链接样式 */
a {
  color: #007bff;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

/* 代码样式 */
code {
  font-family: monospace;
  background-color: #f8f9fa;
  padding: 0.2em 0.4em;
  border-radius: 0.25em;
}

pre {
  font-family: monospace;
  background-color: #f8f9fa;
  padding: 0.5em;
  border-radius: 0.25em;
  overflow: auto;
}

pre code {
  padding: 0;
  background-color: transparent;
  border-radius: 0;
}

/* 引用样式 */
blockquote {
  margin: 0;
  padding-left: 1em;
  border-left: 0.25em solid #ccc;
}

/* 图片样式 */
img {
  max-width: 100%;
  height: auto;
}
</style>
