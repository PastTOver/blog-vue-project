<template>
    <div class="h-100">
        <div class="container video-collections-show mb-2rem">
            <div class="row">
                <div class="col-lg-8">
                    <p class="font-size-12 text-muted mb-1">名称</p>
                    <h1 class="h4 mb-2rem">{{ this.videoName }} <el-button type="success" round
                            @click.prevent="VideoPagealt">添加视频</el-button>
                    </h1>
                    <div class="collections-syllabus">
                        <div class="lecture-group-title clearfix" @click="toggleSyllabus"
                            :class="{ collapsed: isCollapsed }" :aria-expanded="!isCollapsed">
                            <div class="title float-left">视频列表</div>
                            <div class="float-right">
                                <span class="total-lectures">{{ this.videosum }}总数量</span>
                                <!-- <span class="total-time">00:00</span> -->
                            </div>
                        </div>
                        <div class="lecture-list" :class="{ collapse: isCollapsed, show: !isCollapsed }">
                            <ul class="font-size-14">
                                <!-- 这里开始放视频列表 -->
                                <li v-for="video in videodetails" :key="video.id" class="lecture">
                                    <a href="#" :class="{ 'lecture-disabled': !video.videoPath }">
                                        <span class="lecture-title" @click.prevent="">{{ video.videoName }}</span>
                                    </a>
                                    <div class="action-links">
                                        <a class="action-link" @click="previewVideo(video.videoPath)">预览</a>
                                        <a class="action-link" @click.prevent="VideoPagedel(video.id)">删除</a>
                                    </div>
                                </li>
                                <!-- 这里结束视频列表 -->
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
import axios from 'axios';
import { getToken, setUrl, getUrl, clearUrl } from '@/storage';
import { ElMessage } from 'element-plus';

export default {
    name: 'VideoSubpage',
    data() {
        return {
            isCollapsed: false,
            videosum: null,   //视频总数
            videoid: null,  //存放视频ID
            videoName: null,  //存放视频名称
            videodetails: {}   //存放视频播放信息
        };
    },
    mounted() {
        // 获取通过路由传递的参数
        this.videoName = this.$route.query.videoName;
        this.videoid = this.$route.query.videoid;
        this.gettails()
        // 在这里进行其他操作，根据需要使用接收到的参数
    },
    methods: {
        toggleSyllabus() {
            this.isCollapsed = !this.isCollapsed;
        },
        gettails() {
            axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';
            axios.defaults.headers.common['token'] = getToken();
            axios.get(this.$globalInternet + '/course/video_resource', {
                params: {
                    id: this.videoid
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
                    console.log(response.data)
                    this.videodetails = response.data.data
                    this.videosum = response.data.data.length
                })
        },

        previewVideo(videoPath) {   //点击预览时，跳转网页播放
            this.$router.push({
                path: '/video-playe',
                query: {
                    videoPath: videoPath
                }
            });
        },

        VideoPagealt() {    //增加子视频
            console.log(this.videoid, this.videoName)
            this.$router.push({
                name: 'VideoPagealt',  // 替换为你的目标路由名称或路径
                params: {
                    id: this.videoid,  // 替换为实际的视频ID参数
                    name: this.videoName  // 替换为实际的视频名称参数
                }
            });
        },

        VideoPagedel(detailId) {
            this.$confirm('确定要删除该视频吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                axios.delete(this.$globalInternet + '/course/video_detail', {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        token: getToken()
                    },
                    data: {
                        detailId: detailId,
                        topicId: this.videoid
                    }
                })
                    .then(response => {
                        console.log('Delete request successful', response);
                        ElMessage.success('删除成功');
                        window.location.reload();
                        // 处理响应数据
                    })
                    .catch(error => {
                        console.error('Error deleting data', error);
                        // 处理错误
                    });
            }).catch(() => {
                // 用户点击了取消按钮
                console.log('取消删除操作');
            });
        }
    }
}
</script>
  
<style scoped>
@import '../assets/css/app.css';
@import '../assets/vendor/bootstrap-icons/font/bootstrap-icons.css';

.action-links {
    display: flex;
    justify-content: flex-end;
}

.action-link {
    margin-left: 10px;
}
</style>
  