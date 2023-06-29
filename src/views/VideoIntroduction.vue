<template>
    <div style="display: flex; justify-content: center; align-items: center;">
        <div style="width: 600px;">
            <el-form ref="form" :model="form" label-width="80px">
                <!-- <el-form-item label="发布人">
                    <el-input v-model="form.name"></el-input>
                </el-form-item> -->
                <el-form-item label="视频ID" v-if="false">
                    <el-input v-model="form.id"></el-input>
                </el-form-item>
                <el-form-item label="视频封面" prop="videoImage">
                    <el-image :src="form.videoImage" style="width: 10%; height: auto;" fit="contain"
                        @click.prevent="videoImagebut"></el-image>
                    <!-- <button v-if="form.videoImage" @click.prevent="videoImagebut"> 当有图片的时候才显示按钮 -->
                    <!-- <i class="el-icon-search"></i>放大镜图标 -->
                    <!-- </button> -->
                    <img :src="form.videoImage" style="width: 100%; height: auto;" v-if="videoImageTF">
                </el-form-item>
                <el-form-item label="视频名称">
                    <el-input v-model="form.videoName"></el-input>
                </el-form-item>
                <el-form-item label="视频简介">
                    <el-input v-model="form.videoSummary"></el-input>
                </el-form-item>
                <el-form-item label="价格">
                    <el-input v-model="form.price"></el-input>
                </el-form-item>
                <el-form-item label="是否免费">
                    <el-input v-model="form.resourceIsFree" style="width: 50px;"></el-input>
                    <span>&nbsp&nbsp&nbsp&nbsp&nbsp注：0为免费1为付费</span>
                </el-form-item>
                <div slot="footer">
                    <el-button :loading="loading" type="primary" @click="assignRole(form)">保存</el-button>
                    <el-button @click="resetRoleData">取消</el-button>
                </div>
                <div>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;修改图片 </span>
                    <p></p>
                    <input type="file" @change="handleFileUpload" accept="image/*" />
                    <button @click.prevent="uploadImage">上传图片</button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { setToken, getToken, clearToken, setImg } from '../storage'  //临时存放Token
import qs from 'qs';

export default {
    data() {
        return {
            form: {
                videoName: "test"
            },
            uid: null,
            videoImageTF: false,    //用于图片放大和缩小
            selectedFile: null  //关于图片上传
        }
    },
    mounted() {
        this.Method();
        this.userid();
    },
    methods: {
        Method() {
            if (this.$route.params.introduction === 0) {
                return
            }
            this.form = JSON.parse(this.$route.params.introduction)
            console.log(this.form)
        },

        userid() {
            axios.get(this.$globalInternet + '/user/get', {
                headers: {
                    token: getToken()
                }
            })
                .then(response => {
                    // 请求成功的处理逻辑
                    // console.log(response.data.data.id);
                    this.uid = response.data.data.id;
                    // console.log(this.uid)
                })
                .catch(error => {
                    // 请求失败的处理逻辑
                    console.error(error);
                });
        },

        /*这两个方法都是用户显示/隐藏图片 */
        videoImagebut() {
            this.videoImageTF = !this.videoImageTF
        },

        handleFileUpload(event) {
            // 处理文件上传逻辑
            const file = event.target.files[0];
            // 在这里可以对文件进行处理，比如读取文件内容、验证文件类型等
            this.selectedFile = file

        },
        uploadImage() {
            if (!this.selectedFile) {
                console.log("空")
                this.$message.error('请选择文件');
                // 没有选择文件，不执行上传
                return
            }
            const formData = new FormData();
            formData.append('file', this.selectedFile);

            axios.put(this.$globalInternet + '/project/uploadCoverImg', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    token: getToken(), // 使用 getToken() 获取 token 的值
                },
            })
                .then(response => {
                    // 上传成功的处理逻辑
                    // console.log(response.data);
                    // console.log(response.data.data)
                    this.form.videoImage = response.data.data
                    this.$message.success('上传成功');

                })
        },

        assignRole(form) {
            //保存按钮
            console.log(form)
            const formData = qs.stringify({
                id: form.id,
                price: form.price,
                publisher: this.uid,
                resourceIsFree: form.resourceIsFree,
                videoImage: form.videoImage,
                videoName: form.videoName,
                videoSummary: form.videoSummary,
            });

            axios.post(this.$globalInternet + "/course/updateVideoTopic", formData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'token': getToken() // 使用 getToken() 获取 token 的值
                }
            }).then(res => {
                console.log(res.data);
                this.$router.go(-1); // 或者使用 this.$router.back();
                // this.loading = false;
                // this.$message.success('保存成功!');
                // this.user = {};
                // this.dialogUserVisible = false;
                // this.getUsers();
            });
        },

        resetRoleData() {   //返回到上一页
            this.$router.go(-1); // 或者使用 this.$router.back();
        }
    }
}

</script>