<template>
    <h3>视频</h3>
    <div class="card h-100 video-card">
        <div style="position: relative;">
            <a href="videos-show.html">
                <img src="img/temp/G8g9oBCZUz1628239518.png" class="card-img ratio-16x9">
                <span class="video-player-btn video-player-centered text-center">
                </span>
            </a>
        </div>
        <div class="card-body">
            <a href="videos-show.html">
                <h5 class="card-title">Docker 快速入门视频</h5>
                <p class="card-text text-muted"
                    title="本套视频是在阅读 Docker 官方入门文档的过程中录制的，可视为 Docker 官方入门文档的不完全翻译视频版本。介绍了什么是容器、什么是镜像；以及如何创建镜像、运行容器、构建镜像最佳实践等 Docker 基础知识。">
                    本套视频是在阅读 Docker 官方入门文档的过程中录制的，可视为 Docker 官方入门文档的不完全翻译视频版本。...</p>
            </a>
        </div>
        <div class="card-footer border-top-0 bg-white d-flex justify-content-between">
            <div>
                <a href="#">ddd</a>
            </div>
            <div>
                <small class="text-muted">共 10 节视频</small>

            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            userList: [
                {
                    username: "ABC"
                }
            ]
        }
    }
}
</script>
