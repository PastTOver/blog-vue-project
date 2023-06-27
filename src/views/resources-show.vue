<template>
    <div class="h-100">
      <div class="container mb-2rem">
        <div class="row">
          <div class="resource-wrapper mb-3 bg-light rounded-lg overflow-hidden space-top-1 pl-5 pl-lg-0 pr-0 pr-lg-5">
            <div class="row justify-content-lg-between align-items-lg-center no-gutters">
              <div class="col-lg-4 order-1 order-lg-2">
                <div class="mb-4">
                  <h2>{{ $route.query.projectName }}</h2>
                  <p>{{ $route.query.projectSummary }}</p>
                </div>
                <div>
                  <a  :href="$route.query.downloadPath" class="btn btn-primary transition-3d-hover">免费下载</a>
                </div>
              </div>
  
              <div class="col-lg-7 order-2 order-lg-1 space-top-1 animate__animated animate__fadeInUp">
                <img class="img-fluid shadow-lg" :src="$route.query.coverImage" width="755" height="470" alt="{{ $route.query.projectName }}" />
              </div>
            </div>
          </div>
  
          <div>
            <h3>资源介绍：</h3>
            <p>{{ $route.query.projectDescription }}</p>
          </div>
          <div>
            <h3>资源截图：</h3>
            <img class="img-fluid shadow-lg" :src="$route.query.richText" width="1200" height="700" alt="{{ $route.query.projectName }}" />
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
  export default {
    name: 'StockVisualization',
    // Add your component's logic here
  }
  </script>
  
  <style scoped>
  /* Add your component's styles here */
  </style>
  