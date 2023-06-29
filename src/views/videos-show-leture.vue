<template>
  <div class="h-100 my-md-3">
    <div class="container mb-2rem lecture-show">
      <h1 class="lecture-title h4">{{ this.videored }}</h1>
      <p class="font-size-14 text-muted">
        <a href="#">{{ this.publisherlist }}</a>
        <span> - </span>
        {{ this.publishTimelist }}
        <span> - </span>
        所属视频：<a href="#">{{ this.Namelist }}</a>
      </p>
      <div class="row">
        <div class="col-lg-8">
          <div class="video-content">
            <video id="video-player" class="video-js vjs-big-play-centered" controls preload="auto" width="750"
              height="421" data-setup="{}">
              <source :src="Videolink" type="video/mp4" />
              <p class="vjs-no-js">
                To view this video please enable JavaScript, and consider upgrading to a web browser that
                <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>
              </p>
            </video>
          </div>

          <p class="font-size-12 mt-3">视频简介：</p>
          <div id="vditor-preview-element">
            <p id="content" class="d-none">安装并启动 Docker</p>
            {{ this.Summarylist }}
          </div>
        </div>
        <div class="col-lg-4 mt-lg-0 mt-4">
          <div>
            <div class="pb-2 small d-flex justify-content-between">
              <span>共 1 个章节 • {{ this.videosum }} 个讲座 • 总时长 {{ this.videosumtime }}</span>
              <a href="javascript:void(0)" class="toggle-syllabus" @click="toggleSyllabus"></a>
            </div>
            <div class="collections-syllabus">
              <div class="lecture-group-wrapper">
                <div class="lecture-group-title clearfix" :class="{ collapsed: isCollapsed }" @click="toggleSyllabus"
                  data-toggle="collapse" data-target="#collapse-1" :aria-expanded="!isCollapsed">
                  <div class="title">视频列表</div>
                </div>
              </div>
              <div id="collapse-1" class="lecture-list collapse" :class="{ show: !isCollapsed }">
                <ul class="font-size-14">
                  <!-- 这里开始放视频列表 -->
                  <li v-for="video in videodetails" :key="video.id" class="lecture">
                    <a href="#" @click.prevent="video.videoPath ? PlayVideo(video.videoPath, video.videoName) : null"
                      :class="{ 'red-text': video.videoName === videored, 'disabled-link': !video.videoPath }">
                      <span class="lecture-title">{{ video.videoName }}</span>
                      <div class="float-right">
                        <span class="lecture-time">{{ video.videoDuration }}</span>
                      </div>
                    </a>
                  </li>
                  <!-- 这里结束视频列表 -->
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
import { getToken } from '@/storage';
import axios from 'axios';

export default {
  name: 'DockerInstallation',
  data() {
    return {
      isCollapsed: false,
      Namelist: null,  //接收视频名称
      Summarylist: null,  //接收视频简介
      publisherlist: null,  //接收视频作者
      publishTimelist: null,  //接收视频时间
      videosumtime: null, //存放视频总时长
      videodetails: {},   //存放播放视频的信息
      videosum: null,    //视频总数量
      Videolink: null,   //存放视频链接
      videored: ''   //定义点击视频的名称
    };
  },
  methods: {
    toggleSyllabus() {
      this.isCollapsed = !this.isCollapsed;
    },
    getvide(videoId) {   //请求视频数据
      if (getToken() === null) {
        // 设置默认的请求头,请求视频播放信息
        axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';
        axios.get(this.$globalInternet + '/course/videoTopic/free', {
          params: {
            id: videoId
          },
          transformRequest: [(data) => {
            let formData = new URLSearchParams();
            for (let key in data) {
              formData.append(key, data[key]);
            }
            return formData;
          }]
        })
          .then(response => {
            // 请求成功后的处理,将里面的videoDuration字段进行切割,并保留时间
            this.videodetails = response.data.data.map(video => {
              return {
                ...video,
                videoDuration: video.videoDuration.substr(11, 8) // 提取时间部分，假设时间格式为 HH:mm:ss
              };
            });
            this.videosum = this.videodetails.length;   //将长度进行赋值
            // console.log(this.videodetails);
            this.timesum()// 计算视频总时长
          })
      } else {

        axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';
        axios.defaults.headers.common['token'] = getToken();
        axios.get(this.$globalInternet + '/course/video_resource', {
          params: {
            id: videoId
          },
          transformRequest: [(data) => {
            let formData = new URLSearchParams();
            for (let key in data) {
              formData.append(key, data[key]);
            }
            return formData;
          }]
        })
          .then(response => {
            // 请求成功后的处理,将里面的videoDuration字段进行切割,并保留时间
            if (response.data.code === 209) {
              this.freevideo(videoId)
              return
            }
            this.videodetails = response.data.data.map(video => {
              return {
                ...video,
                videoDuration: video.videoDuration.substr(11, 8) // 提取时间部分，假设时间格式为 HH:mm:ss
              };
            });
            this.videosum = this.videodetails.length;   //将长度进行赋值
            // console.log(response.data.data);
            this.timesum()// 计算视频总时长
          }),
          axios.get(this.$globalInternet + '/user/get', {
            headers: {
              token: getToken()
            }
          })
            .then(response => {
              // 请求成功的处理逻辑
              // console.log(response.data.data.id);
              this.uid = response.data.data.id;
              // console.log(this.uid)
            })
            .catch(error => {
              // 请求失败的处理逻辑
              console.error(error);
            });
      }
    },
    freevideo(videoId) {
      axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';
      axios.get(this.$globalInternet + '/course/videoTopic/free', {
        params: {
          id: videoId
        },
        transformRequest: [(data) => {
          let formData = new URLSearchParams();
          for (let key in data) {
            formData.append(key, data[key]);
          }
          return formData;
        }]
      })
        .then(response => {
          // 请求成功后的处理,将里面的videoDuration字段进行切割,并保留时间
          this.videodetails = response.data.data.map(video => {
            return {
              ...video,
              videoDuration: video.videoDuration.substr(11, 8) // 提取时间部分，假设时间格式为 HH:mm:ss
            };
          });
          this.videosum = this.videodetails.length;   //将长度进行赋值
          // console.log(response.data.data);
          this.timesum()// 计算视频总时长
        }),
        axios.get(this.$globalInternet + '/user/get', {
          headers: {
            token: getToken()
          }
        })
          .then(response => {
            // 请求成功的处理逻辑
            // console.log(response.data.data.id);
            this.uid = response.data.data.id;
            // console.log(this.uid)
          })
          .catch(error => {
            // 请求失败的处理逻辑
            console.error(error);
          });
    },
    timesum() {
      // 计算视频总时长
      const totalDuration = this.videodetails.reduce((total, video) => {
        const durationParts = video.videoDuration.split(':'); // 将时间拆分为小时、分钟和秒
        const hours = parseInt(durationParts[0]);
        const minutes = parseInt(durationParts[1]);
        const seconds = parseInt(durationParts[2]);
        const durationInSeconds = hours * 3600 + minutes * 60 + seconds; // 将时间转换为秒
        return total + durationInSeconds;
      }, 0);
      // 将总时长转换为时:分:秒格式
      const hours = Math.floor(totalDuration / 3600);
      const minutes = Math.floor((totalDuration % 3600) / 60);
      const seconds = totalDuration % 60;
      const formattedDuration = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      // console.log(formattedDuration); // 打印总时长
      this.videosumtime = formattedDuration
    },
    PlayVideo(path, red) {
      //播放视频
      this.Videolink = path
      console.log(path, 'test')
      this.videored = red
    }
  },
  mounted() {
    // VideoJS initialization
    // videojs('video-player', {
    //   playbackRates: [0.5, 1, 1.5, 2],
    //   fluid: true,
    // });

    // Resize video player on window resize
    window.addEventListener('resize', () => {
      const aspectRatio = 9 / 16;
      const videoPlayer = document.getElementById('video-player');
      const width = videoPlayer.parentElement.offsetWidth;
      videoPlayer.style.width = `${width}px`;
      videoPlayer.style.height = `${width * aspectRatio}px`;
    });

    const videoId = this.$route.query.videoId;   //接收跳转值，并且发送请求
    const videoName = this.$route.query.videoName;
    this.Namelist = this.$route.query.Namelist
    this.Summarylist = this.$route.query.Summarylist
    this.publisherlist = this.$route.query.publisherlist
    this.publishTimelist = this.$route.query.publishTimelist


    // console.log(videoName)
    this.getvide(videoId)
    this.videored = videoName  //跳转后自动变色


  },
};
</script>
  
<style scoped>
@import '../assets/css/app.css';
@import '../assets/vendor/bootstrap-icons/font/bootstrap-icons.css';

.red-text {
  /* 定义点击视频后变成红色 */
  color: red;
}

.disabled-link {
  pointer-events: none;
  color: gray;
  text-decoration: none;
}
</style>
  