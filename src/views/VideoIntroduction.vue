<template>
    <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="发布人">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="价格">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="资源">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="视频封面">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="视频名称">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="视频简介">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
    </el-form>
</template>
<script>
export default {
    data() {
        return {
            form: {}
        }
    },
    methods: {
    }
}
</script>