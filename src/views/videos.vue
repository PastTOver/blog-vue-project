<template>
    <div class="h-100 my-md-3">
        <section class="video-collections-index">
            <div class="container">

                <!--这下面是搜索框-->
                <el-form :inline="true" size="small" label-width="100px">
                    <el-form-item>
                        <el-input v-model="keywords" placeholder="搜索关键字" style="width: 200px; margin-right: 10px;"
                            class="custom-input"></el-input>
                        <el-input v-model="publisher" placeholder="搜索作者" style="width: 200px; margin-right: 10px;"
                            class="custom-input"></el-input>
                        <el-button type="primary" @click="getData">查询</el-button>
                        <el-button type="default" @click="getDataClear">清空</el-button>
                        <span class="spacer"></span> <!-- 添加间距的占位元素 -->
                        <el-button type="info" @click="routemanage">视频管理</el-button>

                    </el-form-item>
                </el-form>
                <p></p>
                <div class="row">
                    <div class="col-lg-4 mb-4" v-for="userlist in   user  " :key="user.id"> <!--从这里开始循环-->
                        <div class="card h-100 video-card">
                            <div style="position: relative;">
                                <a href="videos-show.html" @click.prevent="JumpVideo(userlist, userlist.id)">
                                    <img :src="userlist.videoImage" class="card-img ratio-16x9"> <!-- 这里放封面 -->
                                    <span class="video-player-btn video-player-centered text-center">
                                        <span class="video-player-icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
                                                <path
                                                    d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
                                            </svg>
                                        </span>
                                    </span>
                                </a>
                            </div>
                            <div class="card-body">
                                <a href="videos-show.html" @click.prevent="JumpVideo(userlist, userlist.id)">
                                    <h5 class="card-title">{{ userlist.videoName }}</h5> <!--这个是视频名称-->
                                    <p class="card-text text-muted" title="">{{ userlist.videoSummary }}</p>
                                </a>
                            </div>
                            <div class="card-footer border-top-0 bg-white d-flex justify-content-between">
                                <div v-if="false">
                                    <a href="#" @click.prevent="JumpVideo(userlist, userlist.id)">{{ userlist.publisher
                                    }}</a> <!--这边是作者-->
                                </div>
                                <div>
                                    <!-- <small class="text-muted">共 XX 节视频</small> -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <el-pagination :current-page="page" :total="total" :page-size="limit" :page-sizes="[6, 12, 24, 36]"
                    style="padding: 20px 0;" layout="prev, pager, next, jumper, ->, sizes, total" @current-change="getUsers"
                    @size-change="handleSizeChange" />
            </div>

        </section>

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
import { useTransitionFallthroughEmits } from 'element-plus'
import { setToken, getToken, clearToken, setImg } from '../storage.js'  //临时存放Token
import { ElMessage } from 'element-plus';

export default {
    data() {
        return {
            user: {},  //存放数据，
            page: 1, // 当前页码
            limit: 6, // 每页数量
            total: 0, // 总数量
            keywords: '', //这两个用户搜索
            publisher: ''
        }
    },
    mounted() {
        this.getData(); // 页面加载时调用获取数据的函数
    },
    methods: {   //函数或方法
        getData() {   //请求所有数据
            axios.get(this.$globalInternet + '/course/video_course', {
                params: {
                    page_size: this.limit,
                    current: this.page,
                    keywords: this.keywords,
                    publisher: this.publisher
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
                .then(response => {
                    // 请求成功处理逻辑
                    this.user = response.data.data.records
                    // console.log(response.data.data.records);
                    console.log(response.data)
                    this.total = response.data.data.total
                })
                .catch(error => {
                    // 请求失败处理逻辑
                    console.error(error);
                });
        },
        JumpVideo(serlist, id) {
            console.log(serlist, id)
            this.$router.push({ path: '/videosDetail', query: { id: id, serlist: JSON.stringify(serlist) } }); // 替换成你要跳转的路由路径和参数
        },

        routemanage() {
            if (getToken() === null) {
                ElMessage.warning('请登录账号');
                return
            }
            axios.get(this.$globalInternet + "/user/get", {
                headers: {
                    token: getToken(), // 使用 getToken() 获取 token 的值
                }
            }).then(res => {
                console.log(res.data);
                if (res.data.code === 200) {
                    // console.log(res.data.data.userName)
                    const id = res.data.data.id
                    this.$router.push({ path: '/videosmanage', query: { id: id, userName: res.data.data.userName } });
                } else {
                    ElMessage({
                        message: '账号异常或账号无视频',
                        type: 'error',
                    });
                    return
                }
            });

        },

        getDataClear() {
            // 清空搜索内容
            this.keywords = '';
            this.publisher = '';
            this.getData()   //清空完在查询一次
        },
        async getUsers(page = 1) {
            this.page = page
            // console.log(this.page, this.limit)
            // this.user = {}
            this.getData()
        },

        /*
        处理pageSize发生改变的监听回调
        */
        handleSizeChange(pageSize) {
            this.limit = pageSize
            this.getUsers()
        },
    }
}
</script>

<style scoped>
@import '../assets/css/app.css';

::v-deep .custom-input input {
    font-size: 14px;
    /* 设置搜索框中的文字大小 */
}

.search-card {
    padding: 20px;
    height: ;
    /* 调整卡片的内边距 */
}

.spacer {
    margin-left: 10px;
    /* 设置间距的数值 */
}
</style>
