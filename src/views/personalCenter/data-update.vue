<template>
    <div class="update-all">
        <div class="update-head">
            <div class="update-text-head">
                <span class="text-01">我的信息</span>
            </div>
        </div>
        <div class="update-center">
            <label class="update-img-text">头像上传: </label>
            <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false"
                :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item>
                    <el-input v-model="form.id" type="hidden"></el-input>
                </el-form-item>
                <el-form-item label="昵称：">
                    <el-input v-model="form.nickName" type="text" placeholder="昵称"></el-input>
                </el-form-item>
                <el-form-item label="性别： ">
                    <el-radio-group v-model="form.sex">
                        <el-radio label="1">男</el-radio>
                        <el-radio label="0">女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="密码： ">
                    <el-input v-model="form.password" type="password" placeholder="************"></el-input>
                </el-form-item>
                <el-form-item label="邮箱： ">
                    <el-input v-model="form.email" type="text" placeholder="邮箱"></el-input>
                </el-form-item>
                <el-form-item label="手机号： ">
                    <el-input v-model="form.phonenumber" type="text" placeholder="手机号"></el-input>
                </el-form-item>
                <el-form-item style="text-align: center;">
                    <el-button type="primary" @click="onSubmit">提交</el-button>
                    <el-button @click="onReset">取消</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
  
<script>
import { setToken, getToken, clearToken, getImg } from '../../storage.js'  //临时存放Token
import app from '../../App.vue'

export default {
    data() {
        return {
            form: {

            },
            imageUrl: '',
            user: {

            }
        }
    },
    methods: {
        onSubmit() {
            console.log('submit!');
            console.log(this.form)
            this.updateUser(this.form)
        },
        onReset() {
            this.form.nickName = this.user.nickName
            this.form.password = this.user.password
            this.form.email = this.user.email
            this.form.phonenumber = this.user.phonenumber
            this.form.sex = this.user.sex
        },
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            console.log(this.imageUrl)
            console.log(file)
            if (isJPG && isLt2M) {
                this.updateImg(file)
            }
            return isJPG && isLt2M;

        },
        getUserData() {
            this.$store
                .dispatch("getUserData")
                .then((ret) => {
                    console.log(ret.data)
                    this.user = ret.data.data
                    this.form.id = this.user.id
                    this.form.nickName = this.user.nickName
                    this.form.password = this.user.password
                    this.form.email = this.user.email
                    this.form.phonenumber = this.user.phonenumber
                    this.form.sex = this.user.sex
                    this.imageUrl = ret.data.data.avatar
                    console.log('----------------------')
                    console.log(this.form)
                    console.log(this.imageUrl)
                })
        },
        updateUser(form) {
            this.$store
                .dispatch("updateUser", form)
                .then((ret) => {
                    console.log(ret.data)
                })
                this.$message({
                    message: "修改成功",
                    type: 'success'
                })
        },
        updateImg(file) {
            this.$store
                .dispatch("updateImg", file)
                .then((ret) => {
                    let img = {}
                    img.id = this.form.id
                    img.avatar = ret.data.data
                    console.log(ret.data.data)
                    console.log(img)
                    this.updateUser(img)
                    // setToken(ret.data.data)
                })
        },
    },
    mounted: function () {
        this.getUserData();
    }
}
</script>
  
<style scoped>
.update-all {
    height: auto;
    line-height: 50px;
}

.update-head {
    width: 793px;
    border-bottom: 5px solid #ddd;
}

.update-text {
    float: left;
    width: 600px;
}

.update-text-head {
    font-size: 18px;
    height: 56px;
    padding-left: 20px;
    padding-top: 5px;
}

.text-01 {
    border-left: 5px solid blue;
}

.update-img {
    padding: 25px 0px 0px;
    display: inline-block;
}

.update-img-text {
    font-size: 14px;
    line-height: 100px;
    width: 80px;
    float: left;
    color: #606266;
}

.update-is-img {
    float: left;
    width: 96px;
    height: 96px;
    overflow: hidden;
    border-radius: 50%;
    border: 1px solid #e6eaf0;
    background-size: cover;
}

.img-input {
    float: left;
    width: 96px;
    height: 96px;
    padding: 0px 30px 0px;
}

.update-center {
    font-size: 14px;
    line-height: 50px;
    padding-top: 40px;
    height: 600px;
    width: 550px;
    margin: auto auto;
    /* background-color: aquamarine; */
}

.update-nick-name {
    text-align: right;
    width: 100px;
    float: left;
    padding: 0;
}

.nick-input {
    float: left;
    width: 260px;
    height: 30px;
    margin-right: 40px;
}

.nick-input-sex {
    padding: 0px 0px 0px 0px;
}

.submit {
    display: flex;
    justify-content: center;
    align-items: center;
}

.submit-button {
    width: 80px;
    height: 40px;
    font-size: 18px;
}

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}

.avatar-uploader-icon {
    border-radius: 50%;
    border: 1px solid black;
    font-size: 28px;
    color: #8c939d;
    width: 96px;
    height: 96px;
    line-height: 96px;
    text-align: center;
}

.avatar {
    border-radius: 50%;
    width: 96px;
    height: 96px;
}

img {
    width: 100%;
    height: 100%;
}
</style>
