<template>
  <el-row
    class="row-bg"
    justify="center"
    style="background-image: linear-gradient(to bottom, rgb(212, 147, 249), #7ca6f9); padding: 18px 0px"
  >
    <el-col :span="4">
      <el-input
        placeholder="请输入文档名称"
        v-model="docSearch.document_name"
      ></el-input>
    </el-col>
    <el-col :span="3">
      <el-input placeholder="请输入简介" v-model="docSearch.summary"></el-input>
    </el-col>
    <el-col :span="3">
      <el-select v-model="docSearch.priceAsc" placeholder="价格排序">
        <el-option :value="true" >按价格升序</el-option>
        <el-option :value="false">按价格倒序</el-option>
      </el-select>
    </el-col>
    <el-col :span="3">
      <el-button @click="loadPageData" type="primary">查询</el-button>
    </el-col>
  </el-row>

  <el-row :gutter="20" justify="center">
    <!-- data for -->
    <el-col
      class="qc-gradual"
      :span="9"
      style="padding-top: 35px;
      padding-bottom:15px;
      box-shadow: 0px 2px 4px rgba(5, 0, 5, 0.2);"
      v-bind="item.id"
      v-for="item in docPage.records"
    >
      <el-row>
        <el-col :span="8" class="qc-bigger" >
          <!-- 图片 -->
          <img :src="item.documentImage" class="img-fluid shadow-sm"
        /></el-col>
        <el-col :span="15" :offset="1" class="qc-bigger">
          <el-col class="h4">{{item.documentName}}</el-col>
          <el-col class="text-muted font-size-14">{{item.documentSummary}}</el-col>
          <el-col class="font-size-14">{{item.publisherName }}</el-col>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
  <el-row justify="center" style="margin:35px 0px">
     <el-pagination
     :hide-on-single-page="docPage.pages==1"
     :total="docPage.total"
     :page-size="docSearch.page_size"

     @current-change="current_change"
     background layout="prev, pager, next" />
  </el-row>
</template>
<script>
import { ElLoading } from "element-plus";

export default {
  setup() {},
  data() {
    return {
      docSearch: {
        current: 1,
        page_size: 10,
      },
      docPage: {
        pages:1
      },
      /**
       * 是否在加载
       */
      isLoading: true,
    };
  },
  created() {},
  mounted() {
    this.globalLoading(true);
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
      this.loadPageData();
    },
    loadPageData() {
      let vm = this;
      this.$store.dispatch("getPageDoc", this.docSearch).then((resp) => {
        vm.docPage = resp.data.data;
        console.log(vm.docPage)
        vm.globalLoading(false);
      });
    },

    //------------分页
    current_change(number){
      this.docSearch.current=number;
      this.loadPageData();
    }
    
  },
};
</script>

<style scoped>
@import "../assets/css/app.css";
@import "../assets/css/animation.css";
</style>
