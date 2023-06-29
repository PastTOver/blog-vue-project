<template>
    <div>
        <input type="file" ref="fileInput" @change="handleFileChange" accept="video/*" />
        <button @click="uploadVideo">上传视频</button>
    </div>
    <div>
        <input type="text" v-model="videoLink" placeholder="输入视频链接" />
        <button @click="playVideo">播放</button>

        <div class="video-container">
            <video ref="videoPlayer" controls>
                <source :src="videoLink" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    </div>
</template>
  
<script>
import axios from 'axios';
import { setToken, getToken, clearToken, setImg } from '../storage'  //临时存放Token

export default {
    data() {
        return {
            videoFile: null,
            videoLink: 'https://edu-resources-save.oss-cn-beijing.aliyuncs.com/docAvatar/5eac40e4-fd90-4698-9bf4-b0dd0be12d02.mp4' // 存放视频链接的变量
        };
    },
    methods: {
        handleFileChange(event) {
            this.videoFile = event.target.files[0];
        },
        uploadVideo() {
            // 创建FormData对象
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
                    console.log(response.data); // 上传成功的处理逻辑
                })
                .catch(error => {
                    console.error(error); // 错误处理逻辑
                });
        },
    },
};
</script>
  