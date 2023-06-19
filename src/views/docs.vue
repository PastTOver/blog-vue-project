<template>
    <h3>文档</h3>
    <div>
        <img class="avatar" src="avatar.jpg" @click="toggleDropdown">
        <div class="dropdown" v-if="showDropdown">
            <!-- 下拉框内容 -->
            <ul>
                <li>选项1</li>
                <li>选项2</li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            showDropdown: false, // 控制下拉框的显示和隐藏
        };
    },
    methods: {
        toggleDropdown() {
            this.showDropdown = !this.showDropdown; // 点击头像时切换显示和隐藏
        },
    },
};
</script>

<style>
.avatar {
    width: 50px;
    height: 50px;
    cursor: pointer;
    z-index: 1;
}

.dropdown {
    position: absolute;
    /* top: 60px;
    left: 0; */
    width: 200px;
    background-color: #f1f1f1;
    border: 1px solid #ccc;
    padding: 10px;
}

.dropdown ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
}

.dropdown li {
    padding: 5px;
    cursor: pointer;
}
</style>