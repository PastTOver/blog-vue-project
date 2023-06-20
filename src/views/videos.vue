<template>
    <div class="h-100 my-md-3">
        <section class="video-collections-index">
            <div class="container">
                <div class="row">
                    <div class="col-lg-4 mb-4">
                        <div class="card h-100 video-card">
                            <div style="position: relative;">
                                <a href="videos-show.html">
                                    <img src="../assets/images/logo.png" class="card-img ratio-16x9"> <!-- 这里放封面 -->
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
                                <a href="videos-show.html">
                                    <h5 class="card-title">这里放标题</h5>
                                    <p class="card-text text-muted" title="">这里放简介</p>
                                </a>
                            </div>
                            <div class="card-footer border-top-0 bg-white d-flex justify-content-between">
                                <div>
                                    <a href="#">这里放作者</a>
                                </div>
                                <div>
                                    <small class="text-muted">共 XX 节视频</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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
  
<style scoped>
@import '../assets/css/app.css';
</style>
  