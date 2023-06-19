<template>
    <p></p>
    <div class="site-info text-center">
        <h1 class="site-title animate__animated animate__delay-4s animate__swing">知行合一</h1>
        <div id="typed-strings">
            <p class="site-subtitle lead text-muted">理论知识与实践相结合</p>
        </div>
        <!-- <span class="site-subtitle lead text-muted" id="typed"></span> -->
    </div>
    <div class="features">
        <div class="feature">
            <div class="container">
                <div class="row">
                    <div class="col-lg-6 text-center text-lg-left align-self-center">
                        <h3 class="feature-title">小程序</h3>
                        <p class="lead text-muted">简易的小应用，启蒙教育</p>
                    </div>
                    <div class="col-lg-6 mt-3 mt-lg-0">
                        <div class="text-center" data-aos="zoom-in">
                            <img class="img-fluid shadow" src="../assets/images/logo.png" alt="coding">
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="feature">
            <div class="container">
                <div class="row">
                    <div class="col-lg-6 text-center text-lg-right order-1 order-lg-2 align-self-center">
                        <h3 class="feature-title">视频</h3>
                        <p class="lead text-muted">精心制作的视频合集，便于理解</p>
                    </div>
                    <div class="col-lg-6 mt-3 mt-lg-0 order-2 order-lg-1">
                        <el-carousel :interval="4000" type="card" height="200px">
                            <el-carousel-item v-for="item in 6" :key="item">
                                <h3 text="2xl" justify="center">{{ item }}</h3>
                            </el-carousel-item>
                        </el-carousel>

                    </div>
                </div>
            </div>
        </div>

        <div class="feature">
            <div class="container">
                <div class="row">
                    <div class="col-lg-6 text-center text-lg-left align-self-center">
                        <h3 class="feature-title">文档</h3>
                        <p class="lead text-muted">成体系的文章合集，便于查阅</p>
                    </div>
                    <div class="col-lg-6 mt-3 mt-lg-0">
                        <div class="text-center" data-aos="zoom-in">
                            <img class="img-fluid shadow" src="../assets/images/logo.png" alt="coding">
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="feature">
            <div class="container">
                <div class="row">
                    <div class="col-lg-6 text-center text-lg-right order-1 order-lg-2 align-self-center">
                        <h3 class="feature-title">博客</h3>
                        <p class="lead text-muted">零散的所思所想，便于沉淀</p>
                    </div>
                    <div class="col-lg-6 mt-3 mt-lg-0 order-2 order-lg-1">
                        <div class="text-center" data-aos="zoom-in">
                            <img class="img-fluid shadow" src="../assets/images/logo.png" alt="life">
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

  

<style >
@import '../assets/css/index.css';
</style>
