<template>
    <div class="div-class">
        <el-container class="example">
            <el-container>
                <el-aside>
                    <ul class="example-ui">
                        <h3 class="example-text01">个人中心</h3>
                        <router-link tag="div" to='/personalCenter/home'>
                            <el-button type="primary" class="lay-button">
                                首&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;页
                            </el-button>
                        </router-link>
                        <router-link tag="div" to='/personalCenter/data-update'>
                            <el-button type="primary" class="lay-button">信息修改</el-button>
                        </router-link>
                        <router-link tag="div" to='/personalCenter/message'>
                            <el-button type="primary" class="lay-button">消息记录</el-button>
                        </router-link>
                        <router-link tag="div" to='/personalCenter/resource'>
                            <el-button type="primary" class="lay-button">资源记录</el-button>
                        </router-link>
                    </ul>
                </el-aside>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
        <div style="height: 100px;">

        </div>
    </div>
</template>

<script>

</script>

<style>
.div-class {
    margin: 0 auto;
}

.el-aside {
    height: 790px;
    display: flex;
    flex: 0 0 160px !important;
    background: white;
    justify-content: center;
    border-style: double;
    border-color: #99a2aa;
}

.el-main {
    width: 800px;
    height: 790px;
    display: flex;
    flex: none;
    background: white;
    border-style: double;
    border-color: #99a2aa;
    padding: 0px;
}

.el-container {
    justify-content: center;
}

.example-text01 {
    line-height: 60px;
    border-style: double;
    border: #050505;
}

.example-ui {
    border-bottom: 5px solid #e1e2e5;
    display: block;
    width: 200px;
    height: 60px;
    text-align: center;
    line-height: 50px;
    font-size: 16px;
    color: #050505;
    cursor: default
}

.lay-button {
    font-size: 18px;
    width: 150px;
    height: 50px;
}
</style>