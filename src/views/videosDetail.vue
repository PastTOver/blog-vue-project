<template>
  <div class="h-100">
    <div class="container video-collections-show mb-2rem">
      <div class="row">
        <div class="col-lg-8">
          <p class="font-size-12 text-muted mb-1">名称</p>
          <h1 class="h4 mb-2rem">{{ this.serlist.videoName }}</h1>
          <p class="font-size-12 text-muted mb-1">简介</p>
          <p class="mb-2rem">
            {{ this.serlist.videoSummary }} </p>
          <p class="font-size-12 text-muted mb-1">作者</p>
          <p class="mb-2rem"> {{ this.serlist.publisher }}</p>
          <p class="font-size-12 text-muted mb-1">发布时间</p>
          <p class="mb-2rem"> {{ this.serlist.publishTime }}</p>
          <div class="collections-syllabus-box">
            <p class="font-size-12 text-muted mb-1">内容</p>
            <div class="py-2 small d-flex justify-content-between">
              <span>共 1 个章节 • {{ this.videosum }} 节课 • 总时长 {{ this.videosumtime }}</span>
              <!-- <a href="javascript:void(0)" class="toggle-syllabus"></a> -->
              <span>
                <el-button type="primary" @click.prevent="pay">支付</el-button>
              </span>
            </div>
            <div class="collections-syllabus">
              <div class="lecture-group-wrapper">
                <div class="lecture-group-title clearfix" @click="toggleSyllabus" :class="{ collapsed: isCollapsed }"
                  :aria-expanded="!isCollapsed">
                  <div class="title float-left">视频列表</div>
                  <div class="float-right">
                    <span class="total-lectures">{{ this.videodetails.length }}节课</span>
                    <span class="total-time">{{ this.videosumtime }}</span>
                  </div>
                </div>
              </div>
              <div class="lecture-list" :class="{ collapse: isCollapsed, show: !isCollapsed }">
                <ul class="font-size-14">
                  <!-- 这里开始放视频列表 -->
                  <li v-for="video in videodetails" :key="video.id" class="lecture">
                    <a href="#" :class="{ 'lecture-disabled': !video.videoPath }"
                      @click.prevent="Watchvideo(video.videoName, this.serlist.videoName, this.serlist.videoSummary, this.serlist.publisher, this.serlist.publishTime, video.videoPath)">
                      <span class="lecture-title">{{ video.videoName }}</span>
                      <div class="float-right">
                        <span class="lecture-payment" v-if="!video.videoPath">需要付费</span>
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
        <div class="col-lg-4 mt-lg-0 mt-3 animated fadeInRight">
          <div class="video-collections-sidebar">
            <div class="cover">
              <img :src="this.serlist.videoImage" class="img-fluid ratio-16x9">
            </div>
            <div class="video-collections-sidebar-text-box text-center text-primary">
              <p class="text-monospace" v-if="this.serlist.resourceIsFree === 1">{{ this.serlist.price }}元</p>
              <p class="text-monospace" v-else-if="this.serlist.resourceIsFree === 0">免费</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-html="skipHtml"></div>
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
import { getToken, setUrl, getUrl, clearUrl } from '@/storage';
import axios from 'axios';
import { ElMessage } from 'element-plus';

export default {
  name: 'DockerQuickStart',
  data() {
    return {
      skipHtml: '',
      isCollapsed: true,   //展示所有章节
      serlist: '',   //存放视频标题信息
      videodetails: {},   //存放播放视频的信息
      videosum: null,    //视频总数量
      videosumtime: null,  //视频总时长
      videoId: null,  //视频ID
      uid: null
    };
  },
  mounted() {
    // 获取路由参数
    setUrl(window.location.href)
    const videoId = this.$route.query.id;
    this.serlist = JSON.parse(this.$route.query.serlist);
    this.videoId = videoId
    // 设置默认的请求头,请求视频播放信息
    if (getToken() === null) {
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
  methods: {
    toggleSyllabus() {
      this.isCollapsed = !this.isCollapsed;
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
    Watchvideo(videoName, Namelist, Summarylist, publisherlist, publishTimelist, videoPath) {
      //路由跳转
      if (videoPath === '') {
        console.log('videoPath')
        ElMessage.error('请购买');
        return
      }
      //点击后分别传递：播放的视频名称，视频名称、简介、作者、发布时间
      // console.log(videoName, Namelist, Summarylist, publisherlist, publishTimelist)
      this.$router.push({ path: '/videos-show-leture', query: { videoId: this.videoId, videoName: videoName, Namelist: Namelist, Summarylist: Summarylist, publisherlist: publisherlist, publishTimelist: publishTimelist } }); // 替换成你要跳转的路由路径和参数
    },
    pay() {
      //支付模块
      if (getToken() === null) {
        ElMessage.warning('请登录账号');
        return
      }
      axios.post(this.$globalInternet + '/alipay/pay', {
        type: "video",
        name: this.serlist.videoName,
        uid: this.uid,
        vid: this.videoId,
        price: this.serlist.price
      }, {
        headers: {
          'Content-Type': 'application/json',
          token: getToken()
        }
      })
        .then(response => {
          // 请求成功的处理逻辑
          console.log(response.data);
          this.skipHtml = response.data
          setTimeout(() => { document.forms[0].submit(); }, 500)
          console.log(this.skipHtml, '!!!!!!!!!!!!!!!!!!!!!!')
        })
        .catch(error => {
          // 请求失败的处理逻辑
          console.error(error);
        });
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
    }
  }
}
</script>

<style scoped>
@import '../assets/css/app.css';
@import '../assets/vendor/bootstrap-icons/font/bootstrap-icons.css';
</style>
