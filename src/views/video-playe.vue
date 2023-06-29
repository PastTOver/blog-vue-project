<template>
    <!-- <el-button type="primary" icon="el-icon-arrow-left" @click="exit">返回</el-button> -->

    <el-row justify="center">
        <div class="video-container">
            <video ref="videoPlayer" :src="videoPath" controls></video>
        </div>
    </el-row>
</template>
  
<script>
export default {
    name: 'VideoPlayer',
    data() {
        return {
            videoPath: ''
        };
    },
    created() {
        this.videoPath = this.$route.query.videoPath;
    },
    exit() {
        this.$router.go(-1);
    }
};
</script>
  
<style>
.video-player {
    /* 样式设置 */
}

.video-container {
    position: relative;
    width: 800px;
    /* 设置视频容器的宽度 */
    height: 450px;
    /* 设置视频容器的高度 */
}

.video-container video {
    position: absolute;
    top: 60%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    /* 设置视频元素的宽度为容器的宽度 */
    height: 100%;
    /* 设置视频元素的高度为容器的高度 */
}
</style>
  