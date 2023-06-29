<template>
    <div style="display: flex; justify-content: center; align-items: center;">

        <div style="width: 600px;">
            <!-- <el-button type="primary" icon="el-icon-arrow-left" @click="exit">返回</el-button> -->
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="视频名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                是否免费：<el-switch v-model="value" active-color="#13ce66" inactive-color="#ff4949">
                </el-switch>
                <p></p>
                <div>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;是否上传： <span v-if="filePath === null">未上传</span>
                        <span v-if="filePath">上传成功</span></span>
                    <p></p>
                    <div>
                        <input type="file" ref="fileInput" @change="handleFileChange" accept="video/*" />
                        <button @click="uploadVideo()" type="button">上传视频</button>
                    </div>
                </div>
                <p></p>
                <div slot="footer" class="button-container">
                    <el-button :loading="loading" type="primary" @click="assignRole(form)">保存</el-button>
                    <el-button @click="exit">取消</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { setToken, getToken, clearToken, setImg } from '../storage'  //临时存放Token
import qs from 'qs';

export default {
    data() {
        return {
            form: {

            },
            selectedFile: null,  //关于视频上传
            videoid: null,   //存放视频主题ID
            videoName: null,   //存放视频主题名称
            videoFile: null,   //存放视频文件
            filePath: null,    //存放视频路径
            duration: null,    //存放视频时长
            value: true,   //是否免费
            free: null
        }
    },
    mounted() {

        this.videoid = this.$route.params.id;
        this.videoName = this.$route.params.name;
    },
    methods: {
        exit() {
            this.$router.go(-1);
        },
        handleFileChange(event) {
            this.videoFile = event.target.files[0];
            // 创建一个新的Video元素
            const videoElement = document.createElement('video');

            // 监听视频加载完成事件
            videoElement.addEventListener('loadedmetadata', () => {
                // 获取视频的时长
                this.duration = videoElement.duration;
                console.log('视频时长:', this.duration);
            });

            // 设置视频源为选择的文件
            videoElement.src = URL.createObjectURL(this.videoFile);
        },

        uploadVideo() {
            // 创建FormData对象
            console.log('test')
            const formData = new FormData();
            formData.append('file', this.videoFile);
            // 设置请求头部
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    token: getToken(), // 替换为实际的token值
                },
            };
            // 发送视频上传请求
            axios.put(this.$globalInternet + '/course/document_course/avatar', formData, config)
                .then(response => {
                    console.log(response.data.data); // 上传成功的处理逻辑
                    this.$message.success('上传成功');
                    this.filePath = response.data.data
                })
                .catch(error => {
                    console.error(error); // 错误处理逻辑
                });
        },
        assignRole(form) {
            console.log(this.videoid)
            // console.log(this.videoidName)
            if (this.value === true) {
                this.free = 0
            } else {
                this.free = 1
            }
            const formData = new URLSearchParams();
            formData.append('resourceIsFree', this.free);
            formData.append('topicId', this.videoid);
            formData.append('videoDuration', this.duration * 1000);
            formData.append('videoName', form.name);
            formData.append('videoPath', this.filePath);

            // 发送 PUT 请求
            axios.put(this.$globalInternet + '/course/video_course/' + this.videoid, formData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    token: getToken()
                }
            })
                .then(response => {
                    console.log(response.data); // 处理成功的逻辑
                })
                .catch(error => {
                    console.error(error); // 错误处理逻辑
                });
        }
    },
}

</script>

<style>
.button-container {
    display: flex;
    justify-content: center;
    gap: 100px;
    /* 按钮之间的间距 */
    /* margin-top: 5px; */
    /* 上方间距 */
}

.button-container>.el-button {
    width: 120px;
    /* 按钮的宽度 */
}
</style>