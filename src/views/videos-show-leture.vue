<template>
    <div class="h-100 my-md-3">
      <div class="container mb-2rem lecture-show">
        <h1 class="lecture-title h4">安装 Docker</h1>
        <p class="font-size-14 text-muted">
          <a href="#">ddd</a>
          <span> - </span>
          2023-06-11 14:59:23
          <span> - </span>
          所属视频：<a href="#">Docker 快速入门视频</a>
        </p>
        <div class="row">
          <div class="col-lg-8">
            <div class="video-content">
              <video
                id="video-player"
                class="video-js vjs-big-play-centered"
                controls
                preload="auto"
                width="750"
                height="421"
                data-setup="{}"
              >
                <source src="../assets/images/sample.mp4" />
                <p class="vjs-no-js">
                  To view this video please enable JavaScript, and consider upgrading to a web browser that
                  <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>
                </p>
              </video>
            </div>
  
            <p class="font-size-12 mt-3">视频简介：</p>
            <div id="vditor-preview-element">
              <p id="content" class="d-none">安装并启动 Docker</p>
            </div>
          </div>
          <div class="col-lg-4 mt-lg-0 mt-4">
            <div>
              <div class="pb-2 small d-flex justify-content-between">
                <span>共 1 个章节 • 10 个讲座 • 总时长 00:00</span>
                <a href="javascript:void(0)" class="toggle-syllabus" @click="toggleSyllabus"></a>
              </div>
              <div class="collections-syllabus">
                <div class="lecture-group-wrapper">
                  <div
                    class="lecture-group-title clearfix"
                    :class="{ collapsed: isCollapsed }"
                    @click="toggleSyllabus"
                    data-toggle="collapse"
                    data-target="#collapse-1"
                    :aria-expanded="!isCollapsed"
                  >
                    <div class="title">视频列表</div>
                  </div>
                </div>
                <div
                  id="collapse-1"
                  class="lecture-list collapse"
                  :class="{ show: !isCollapsed }"
                >
                  <ul>
                    <!-- 这里开始放视频列表 -->
                    <a href="#">
                      <li class="lecture">
                        <span class="lecture-title active">安装 Docker</span>
                        <p class="font-size-12 text-monospace m-0">时长：00:00</p>
                      </li>
                    </a>
                    <!-- 这里结束放视频列表 -->

                  </ul>
                </div>
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
    name: 'DockerInstallation',
    data() {
      return {
        isCollapsed: true,
      };
    },
    methods: {
      toggleSyllabus() {
        this.isCollapsed = !this.isCollapsed;
      },
    },
    mounted() {
      // VideoJS initialization
      videojs('video-player', {
        playbackRates: [0.5, 1, 1.5, 2],
        fluid: true,
      });
  
      // Resize video player on window resize
      window.addEventListener('resize', () => {
        const aspectRatio = 9 / 16;
        const videoPlayer = document.getElementById('video-player');
        const width = videoPlayer.parentElement.offsetWidth;
        videoPlayer.style.width = `${width}px`;
        videoPlayer.style.height = `${width * aspectRatio}px`;
      });
    },
  };
  </script>
  
<style scoped>
    @import '../assets/css/app.css';
    @import '../assets/vendor/bootstrap-icons/font/bootstrap-icons.css';
</style>
  