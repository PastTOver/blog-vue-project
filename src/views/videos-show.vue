<template>
    <div class="h-100">
      <div class="container video-collections-show mb-2rem">
        <div class="row">
          <div class="col-lg-8">
            <p class="font-size-12 text-muted mb-1">名称</p>
            <h1 class="h4 mb-2rem">Docker 快速入门视频</h1>
            <p class="font-size-12 text-muted mb-1">简介</p>
            <p class="mb-2rem">
              本套视频是在阅读 Docker 官方入门文档的过程中录制的，可视为 Docker 官方入门文档的不完全翻译视频版本。介绍了什么是容器、什么是镜像；以及如何创建镜像、运行容器、构建镜像最佳实践等 Docker 基础知识。
            </p>
            <p class="font-size-12 text-muted mb-1">作者</p>
            <p class="mb-2rem"><a href="#">ddd</a></p>
            <div class="collections-syllabus-box">
              <p class="font-size-12 text-muted mb-1">内容</p>
              <div class="py-2 small d-flex justify-content-between">
                <span>共 1 个章节 • 10 个讲座 • 总时长 00:00</span>
                <a href="javascript:void(0)" class="toggle-syllabus"></a>
              </div>
              <div class="collections-syllabus">
                <div class="lecture-group-wrapper">
                  <div
                    class="lecture-group-title clearfix"
                    @click="toggleSyllabus"
                    :class="{ collapsed: isCollapsed }"
                    :aria-expanded="!isCollapsed"
                  >
                    <div class="title float-left">视频列表</div>
                    <div class="float-right">
                      <span class="total-lectures">10 Lectures</span>
                      <span class="total-time">00:00</span>
                    </div>
                  </div>
                </div>
                <div
                  class="lecture-list"
                  :class="{ collapse: isCollapsed, show: !isCollapsed }"
                >
                  <ul class="font-size-14">
                    <!-- 这里开始放视频列表 -->
                    <a href="videos-show-lecture.html">
                      <li class="lecture">
                        <span class="lecture-title">安装 Docker</span>
                        <div class="float-right">
                          <span class="lecture-time">00:00</span>
                        </div>
                      </li>
                    </a>
                    <!-- 这里结束视频列表 -->
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4 mt-lg-0 mt-3 animated fadeInRight">
            <div class="video-collections-sidebar">
              <div class="cover">
                <img src="../assets/images/resShow.png" class="img-fluid ratio-16x9">
              </div>
              <div class="video-collections-sidebar-text-box text-center text-primary">
                <p class="text-monospace">免费</p>
              </div>
            </div>
          </div>
        </div>
      </div>
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
  export default {
    name: 'DockerQuickStart',
    data() {
      return {
        isCollapsed: true
      };
    },
    methods: {
      toggleSyllabus() {
        this.isCollapsed = !this.isCollapsed;
      }
    }
  }
</script>
  
<style scoped>
    @import '../assets/css/app.css';
    @import '../assets/vendor/bootstrap-icons/font/bootstrap-icons.css';
</style>
  