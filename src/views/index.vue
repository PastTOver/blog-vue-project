<template>
    <div class="features">
        <div class="site-info text-center ">
        <h1 class="site-title animate__animated animate__delay-4s animate__swing">知行合一</h1>
        <div id="typed-strings">
            <p class="site-subtitle lead text-muted">理论知识与实践相结合</p>
        </div>
        <!-- <span class="site-subtitle lead text-muted" id="typed"></span> -->
        </div>
        <div class="feature">
            <div class="container">
                <div class="row">
                    <div class="col-lg-6 text-center text-lg-left align-self-center">
                        <h3 class="feature-title">小程序</h3>
                        <p class="lead text-muted">简易的小应用,是一种不需要下载安装即可使用的应用，它实现了应用“触手可及”的梦想，用户扫一扫或者搜一下即可打开应用。也体现了“用完即走”的理念，用户不用关心是否安装太多应用的问题。应用将无处不在，随时可用，但又无需安装卸载。</p>
                    </div>
                    <div class="col-lg-6 mt-3 mt-lg-0">
                        <div class="text-center" data-aos="zoom-in">
                            <img class="img-fluid shadow" src="../assets/images/img_1.png" alt="coding">
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
                        <p class="lead text-muted">精心制作的视频合集，便于理解，帮助网友快速学习知识。</p>
                    </div>
                    <div class="col-lg-6 mt-3 mt-lg-0 order-2 order-lg-1">
                      <el-carousel :interval="4000" type="card" height="200px">
                        <el-carousel-item v-for="item in imgList" :key="item.id">
                          <img :src="item.idView" class="image">
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
                        <p class="lead text-muted">成体系的文章合集，便于查阅，也可提供大量可靠实用的咨询，是丰富知识的必备读物。</p>
                    </div>
                    <div class="col-lg-6 mt-3 mt-lg-0">
                        <div class="text-center" data-aos="zoom-in">
                            <img class="img-fluid shadow" src="../assets/images/wendan.jpg" alt="coding">
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
                        <p class="lead text-muted">技术、阅读、笔记——学习</p>
                        <p class="lead text-muted">理论、技术、实现——创造</p>
                        <p class="lead text-muted">思想、感受、总结——分享</p>
                    </div>
                    <div class="col-lg-6 mt-3 mt-lg-0 order-2 order-lg-1">
                        <div class="text-center" data-aos="zoom-in">
                            <img class="img-fluid shadow" src="../assets/images/img_2.png" alt="life">
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
</template>



<script>
export default {
  name: 'col-lg-6 mt-3 mt-lg-0 order-2 order-lg-1',
  data(){
    return {
      imgList: [
        {id:0,idView:require("@/assets/images/sp6.jpg")},
        {id:1,idView:require("@/assets/images/sp1.jpg")},
        {id:2,idView:require("@/assets/images/sp2.jpg")},
        {id:3,idView:require("@/assets/images/sp3.jpg")},
        {id:4,idView:require("@/assets/images/sp4.jpg")},
        {id:5,idView:require("@/assets/images/sp5.jpg")}

      ]
    };
  },
  methods: {
  }
}
</script>



<style >
@import '../assets/css/index.css';
img{
  /*设置图片宽度和浏览器宽度一致*/
  width:100%;
  height:inherit;
}

</style>
