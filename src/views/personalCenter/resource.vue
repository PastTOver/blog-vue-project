<template>
    <router-link to="/personalCenter/inPersonalCenter">
          <li>个人信息</li>
          <!-- <li><a @click.prevent="Personal">个人信息</a></li> -->
    </router-link>
</template>
  
<script setup>

</script>
  
<style scoped>
.resource-all {
    float: left;
    height: auto;
    line-height: 50px;
}

.resource-head {
    width: 780px;
    border-bottom: 2px solid #ddd;
}

.resource-text {
    font-size: 18px;
    height: 57px;
    padding-left: 20px;
    padding-top: 5px;
}

.text-01 {
    border-left: 5px solid blue;
}

.resource-contents {
    width: 760px;
    height: 840px;
}

.resource-vieo {
    float: left;
    width: 165px;
    height: 200px;
    margin: 10px;
    border: 2px solid black;
}

.vieo-content {
    width: 165px;
    height: 150px;
}

.vieo-introduce {
    width: 165px;
    height: 50px;
}

.content {
    background-color: blue;
    /* width: 100%;
    height: 100%; */
}

.page {
    width: 700px;
    height: 100px;
    text-align: center;
}
</style>
