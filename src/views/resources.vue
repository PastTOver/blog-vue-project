<template>
  <div class="h-100">
    <div class="container">
      <!-- 这里开始 -->
      <div class="resource-wrapper mb-5 bg-light rounded-lg overflow-hidden space-top-2 space-top-lg-1 pl-5"
        v-for="item in project" :key="item.id">
        <div class="row-res justify-content-lg-between align-items-lg-center">
          <div class="col-lg-4">
            <div class="mb-4">
              <!-- 这里放标题 -->
              <h2>
                <a :href="`resources-show.html?id=${item}`" @click.prevent="jumpPage(item)">{{ item.projectName }}</a>
              </h2>
              <!-- 这里放简介 -->
              <p>{{ item.projectSummary }}</p>
            </div>
            <a class="btn btn-primary transition-3d-hover" :href="`resources-show.html?id=${item}`"
              @click.prevent="jumpPage(item)">查看详情</a>
          </div>

          <div class="col-lg-7 space-top-1 space-top-sm-2 animate__animated animate__fadeInUp">
            <a :href="`resources-show.html?id=${item}`" @click.prevent="jumpPage(item)">
              <!-- 这里放图片 -->
              <img class="img-fluid shadow-lg" :src="item.coverImage" :alt="item.projectName" width="755" height="470" />
            </a>
          </div>
        </div>
      </div>
      <!-- 这里结束 -->
      <nav class="kx-pagination d-flex mt-5 justify-content-end"></nav>
    </div>
    <el-pagination :current-page="page" :total="total" :page-size="limit" :page-sizes="[5, 10, 20, 30, 40, 50, 100]"
      style="padding: 20px 0;" layout="prev, pager, next, jumper, ->, sizes, total" @current-change="getUsers"
      @size-change="handleSizeChange" />

    <footer class="blog-footer mt-auto">
      <div class="container text-muted">
        <p class="text-center text-lg-left">
          <span>Designed by <a href="#">@example</a> - From idea to reality</span>
        </p>
      </div>
    </footer>
  </div>
</template>
  
<script>
import axios from "axios";
import { setToken, getToken, clearToken, setImg } from "../storage"; //临时存放Token

export default {
  mounted() {
    this.getProject();
  },
  data() {
    return {
      page: 1,
      limit: 3,
      project: {},
      total: 0,
    };
  },
  methods: {
    getProject() {
      axios
        .get(
          this.$globalInternet + "/project/allData/" + this.page + "/" + this.limit,
          {
            params: {
              // nickname: this.nickname,
              // query: this.tempSearchObj.username
            },
            headers: {
              "Content-Tyoe": "application/json",
              token: getToken(), // 使用 getToken() 获取 token 的值
            },
          }
        )
        .then((res) => {
          // this.users = res.data.data.records
          // this.total = res.data.data.total
          this.project = res.data.data.records;
          console.log(res.data.data.records);
          this.total = res.data.data.total
        });
    },
    jumpPage(item) {
      this.$router.push({
        path: "/resources-show",
        query: {
          id: item.id,
          projectName: item.projectName,
          projectSummary: item.projectSummary,
          projectDescription: item.projectDescription,
          coverImage: item.coverImage,
          richText: item.richText,
          downloadPath: item.downloadPath,
          // 可以传递其他参数
          // key: value
        },
      });
      console.log("点击了项目：", item);
    },
    async getUsers(page = 1) {
      this.page = page
      // console.log(this.page, this.limit)
      this.getProject()
    },

    /*
    处理pageSize发生改变的监听回调
    */
    handleSizeChange(pageSize) {
      this.limit = pageSize
      this.getUsers()
    },

  },
};
</script>

<style scoped>
@import "../assets/css/app.css";
</style>