<template>
    <div class="h-100">
      <div class="container video-collections-show mb-2rem">
        <div class="row">
          <div class="col-lg-8">
            <p class="font-size-12 text-muted mb-1">名称</p>
            <h1 class="h4 mb-2rem">Docker 快速入门视频</h1>
              <div class="collections-syllabus">
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
                <div
                  class="lecture-list"
                  :class="{ collapse: isCollapsed, show: !isCollapsed }"
                >
                  <ul class="font-size-14">
                    <a href="videos-show-lecture.html">
                      <li class="lecture">
                        <span class="lecture-title">安装 Docker</span>
                        <div class="float-right">
                          <span class="lecture-time">00:00</span>
                        </div>
                      </li>
                    </a>
                    <!-- 其他讲座 -->
                  </ul>
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
  