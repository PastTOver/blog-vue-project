<template>
    <div class="app-container">

        <el-card class="operate-container" shadow="never">
            <!-- <div style="margin-top: 15px">
                <el-form :inline="true" size="small" label-width="140px">
                    <el-form-item label="输入搜索：">
                        <el-input style="width: 203px" v-model="tempSearchObj.username" placeholder="用户名"></el-input>
                        <el-input style="width: 203px" v-model="tempSearchObj.theme" placeholder="主题名称"></el-input>
                    </el-form-item>

                    <el-button type="primary" icon="el-icon-search" @click.prevent="getUsers()">查询</el-button>
                    <el-button type="default" @click="resetSearch()">清空</el-button>
                </el-form>
            </div> -->
        </el-card>

        <!-- 工具条 -->
        <el-card class="operate-container" shadow="never">
            <i class="el-icon-tickets" style="margin-top: 5px"></i>
            <span style="margin-top: 5px">数据列表&nbsp;</span>
            <!-- <el-button class="btn-add" size="mini" @click="showAddUser">添 加</el-button>
            <el-button class="btn-add" size="mini" @click="revomveUsers" :disabled="selectedIds.length === 0"
                style="margin: 0 10px;">批量删除</el-button> -->
        </el-card>

        <!-- banner列表 -->
        <el-table v-loading="listLoading" :data="users" stripe border style="width: 100%;margin-top: 10px;"
            @selection-change="handleSelectionChange">

            <el-table-column type="selection" width="55" />

            <el-table-column prop="uid" label="用户ID" width="80" align="center" />
            <el-table-column prop="type" label="类型" width="120" />
            <el-table-column prop="userName" label="用户名" width="120" />
            <el-table-column prop="orderId" label="订单ID" width="120" />
            <el-table-column prop="price" label="金额" width="160" />
            <el-table-column prop="createDate" label="订单时间" width="170" />
            <el-table-column prop="resourcesname" label="购买主题" width="220" />
            <el-table-column prop="status" label="支付状态" width="150" />


        </el-table>

        <el-pagination :current-page="page" :total="total" :page-size="limit" :page-sizes="[5, 10, 20, 30, 40, 50, 100]"
            style="padding: 20px 0;" layout="prev, pager, next, jumper, ->, sizes, total" @current-change="getUsers"
            @size-change="handleSizeChange" />

        <el-dialog :title="user.id ? '修改用户' : '添加用户'" :visible.sync="dialogUserVisible">
            <el-form ref="userForm" :model="user" :rules="userRules" label-width="120px">
                <el-form-item v-if="user.id" label="id" prop="userName">
                    <el-input v-model="user.id" disabled />
                </el-form-item>
                <el-form-item label="用户名" prop="userName">
                    <el-input v-model="user.userName" />
                </el-form-item>
                <el-form-item label="用户名称">
                    <el-input v-model="user.nickName" />
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="user.email" />
                </el-form-item>
                <el-form-item label="手机号" prop="phonenumber">
                    <el-input v-model="user.phonenumber" />
                </el-form-item>

                <el-form-item v-if="!user.id" label="用户密码" prop="password">
                    <el-input v-model="user.password" type="password" />
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button :loading="loading" type="primary" @click="addOrUpdate">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="设置角色" :visible.sync="dialogRoleVisible" :before-close="resetRoleData">
            <el-form label-width="80px">
                <el-form-item label="用户名">
                    <el-input disabled :value="user.userName"></el-input>
                </el-form-item>

                <el-form-item label="角色列表">
                    <el-radio-group v-model="selectedRole">
                        <el-radio :label="5">普通用户</el-radio>
                        <el-radio :label="3">管理员</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>

            <div slot="footer">
                <el-button :loading="loading" type="primary" @click="assignRole">保存</el-button>
                <el-button @click="resetRoleData">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>
  
<script>
import cloneDeep from 'lodash/cloneDeep'
import axios from 'axios'
import querystring from "querystring"
import { setToken, getToken, clearToken, setImg } from '../storage'  //临时存放Token


export default {
    name: 'AclUserList',
    mounted() {   //生命周期

    },


    data() {
        return {
            listLoading: false, // 是否显示列表加载的提示
            searchObj: { // 包含请求搜索条件数据的对象
                username: ''
            },
            tempSearchObj: { // 收集搜索条件输入的对象
                username: ''
            },
            selectedIds: [], // 所有选择的user的id的数组
            users: [], // 当前页的用户列表
            page: 1, // 当前页码
            limit: 5, // 每页数量
            total: 0, // 总数量
            user: {}, // 当前要操作的user
            dialogUserVisible: false, // 是否显示用户添加/修改的dialog
            userRules: { // 用户添加/修改表单的校验规则
                username: [
                    // { required: true, message: '用户名必须输入' },
                    { min: 4, message: '用户名不能小于4位' }
                ],
                userName: [
                    { required: true, message: '用户名必须输入' }
                ],
                password: [
                    { required: false }
                ]
            },
            loading: false, // 是否正在提交请求中
            dialogRoleVisible: false, // 是否显示角色Dialog
            allRoles: [], // 所有角色列表
            userRoleIds: [], // 用户的角色ID的列表
            isIndeterminate: false, // 是否是不确定的
            checkAll: false, // 是否全选
            nickname: "",
            selectedRole: null,   //获取单选框内容
            adminrole: null
        }
    },
    created() {
        this.getUsers()
    },

    methods: {
        /*
        下面的都是axios请求代码
         */
        postuser() {   //用户列表post请求
            axios.get(this.$globalInternet + "/payment/userAmount/" + this.page + "/" + this.limit, {
                params: {
                    name: this.tempSearchObj.theme,
                    userName: this.tempSearchObj.username
                },
                headers: {
                    token: getToken(), // 使用 getToken() 获取 token 的值
                }
            }).then(res => {
                this.users = res.data.data.records
                this.total = res.data.data.total
                console.log(res.data)
            })

        },
        deluser(id) {    //删除单个用户
            axios.delete(this.$myVariable, {
                headers: {
                    token: getToken(), // 使用 getToken() 获取 token 的值
                }
            }).then(response => {
                // 请求成功处理逻辑
                console.log('删除成功');
                this.getUsers(this.users.length === 1 ? this.page - 1 : this.page)
            })
        },
        deluserlist(idlist) {    //删除多个用户
            console.log(idlist)
            axios.delete(this.$myVariable, {
                data: idlist,
                headers: {
                    token: getToken(), // 使用 getToken() 获取 token 的值
                }
            }).then(response => {
                // 请求成功处理逻辑
                console.log('删除成功');
                this.getUsers(this.users.length === 1 ? this.page - 1 : this.page)
                this.getUsers()
            })
        },
        usersave() {    //新增用户
            // console.log("saveuser", this.user.phonenumber)
            axios.post(this.$myVariable, {
                userName: this.user.userName,
                nickName: this.user.name,
                email: this.user.email,
                phonenumber: this.user.phonenumber,
                password: this.user.password
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    token: getToken(), // 使用 getToken() 获取 token 的值
                }
            }).then(res => {
                console.log(res.data);
                this.loading = false
                this.$message.success('保存成功!')
                // this.getUsers(user.id ? this.page : 1)
                this.user = {}
                this.dialogUserVisible = false
                this.getUsers()
            }).catch(error => {
                console.error(error);
            });

        },
        alteruser() {    //修改用户
            console.log("saveuser", this.user.id)
            axios.put(this.$myVariable, {
                id: this.user.id,
                userName: this.user.userName,
                nickName: this.user.name,
                email: this.user.email,
                phonenumber: this.user.phonenumber,
                password: this.user.password
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    token: getToken(), // 使用 getToken() 获取 token 的值
                }
            }).then(res => {
                console.log(res.data);
                this.loading = false
                this.$message.success('保存成功!')
                this.user = {}
                this.dialogUserVisible = false
                // console.log(this.page)
                this.getUsers()
            }).catch(error => {
                console.error(error);
            });

        },


        /*
        显示指定角色的界面
        */
        showAssignRole(user) {
            // console.log(getToken())
            axios.get(this.$myVariable, {
                params: {
                    id: user.id
                },
                headers: {
                    token: getToken(),
                    'Content-Type': 'application/x-www-form-urlencoded',
                    // 添加其他需要的请求头
                }
            }).then(response => {
                // 请求成功处理逻辑
                console.log(response.data);
                this.adminrole = response.data.data
                console.log(response.data.data, '!!!!!!!!!!!')

            }).catch(error => {
                // 请求失败处理逻辑
                console.error(error);
            });
            this.user = user
            this.dialogRoleVisible = true
            console.log(this.adminrole)
            if (this.adminrole === 'admin') {
                this.selectedRole = 3
            } else if (this.adminrole === 'commonUser') {
                this.selectedRole = 5
            } else {
                this.selectedRole = 3
            }
        },

        /*
        全选勾选状态发生改变的监听
        */
        handleCheckAllChange(value) {// value 当前勾选状态true/false
            // 如果当前全选, userRoleIds就是所有角色id的数组, 否则是空数组
            this.userRoleIds = value ? this.allRoles.map(item => item.id) : []
            // 如果当前不是全选也不全不选时, 指定为false
            this.isIndeterminate = false
        },

        /*
        异步获取用户的角色列表
        */
        async getRoles() {
            const result = await this.$API.user.getRoles(this.user.id)
            const { allRolesList, assignRoles } = result.data
            this.allRoles = allRolesList
            this.userRoleIds = assignRoles.map(item => item.id)
            this.checkAll = allRolesList.length === assignRoles.length
            this.isIndeterminate = assignRoles.length > 0 && assignRoles.length < allRolesList.length
        },

        /*
        角色列表选中项发生改变的监听
        */
        handleCheckedChange(value) {
            const { userRoleIds, allRoles } = this
            this.checkAll = userRoleIds.length === allRoles.length && allRoles.length > 0
            this.isIndeterminate = userRoleIds.length > 0 && userRoleIds.length < allRoles.length
        },

        /*
        请求给用户进行角色授权
        */
        async assignRole() {

            // 要发送的数据
            const data = new URLSearchParams();
            data.append('id', this.user.id); // 替换为实际的 id 值
            data.append('character', this.selectedRole); // 替换为实际的 character 值

            // 设置请求头
            const headers = {
                token: getToken(),
                'Content-Type': 'application/x-www-form-urlencoded'
            };

            // 发送 POST 请求
            axios.post(this.$myVariable + "/user/updateRoleById", data, { headers })
                .then(response => {
                    console.log(response.data);

                    // 处理响应数据
                })
                .catch(error => {
                    console.error(error);
                    // 处理错误
                });

            // const userId = this.user.id
            // const roleIds = this.userRoleIds.join(',')
            // this.loading = true
            // const result = await this.$API.user.assignRoles(userId, roleIds)
            // this.loading = false
            this.$message.success('分配角色成功')
            // this.resetRoleData()

            // // console.log(this.$store.getters.name, this.user)
            // if (this.$store.getters.name === this.user.username) {
            window.location.reload()
            // }
        },

        /*
        重置用户角色的数据
        */
        resetRoleData() {
            this.dialogRoleVisible = false
            this.allRoles = []
            this.userRoleIds = []
            this.isIndeterminate = false
            this.checkAll = false
            this.selectedRole = null
        },

        /*
        自定义密码校验
        */
        validatePassword(rule, value, callback) {
            if (!value) {
                callback('密码必须输入')
            } else if (!value || value.length < 6) {
                callback('密码不能小于6位')
            } else {
                callback()
            }
        },
        /*
        根据输入进行搜索
        */
        search() {
            this.searchObj = { ...this.tempSearchObj }
            this.getUsers()
        },

        /*
        重置输入后搜索
        */
        resetSearch() {
            this.searchObj = {
                username: ''
            }
            this.tempSearchObj = {
                username: ''
            }
            this.getUsers()
        },

        /*
        显示添加用户的界面
        */
        showAddUser() {
            this.user = {}
            this.dialogUserVisible = true

            this.$nextTick(() => this.$refs.userForm.clearValidate())
        },

        /*
        删除所有选中的用户
        */
        revomveUsers() {
            this.$confirm('确定删除吗?').then(async () => {
                await this.deluserlist(this.selectedIds)
                // await this.$API.user.removeUsers(this.selectedIds)
                this.$message.success('删除成功')

            }).catch(() => {
                this.$message.info('取消删除')
            })
        },

        /*
        列表选中状态发生改变的监听回调
        */
        handleSelectionChange(selection) {
            this.selectedIds = selection.map(item => item.id)
        },

        /*
        显示更新用户的界面
        */
        showUpdateUser(user) {
            this.user = cloneDeep(user)
            this.dialogUserVisible = true
        },

        /*
        删除某个用户
        */
        async removeUser(id) {
            this.$confirm('确定删除吗?').then(async () => {
                this.deluser(id)
                this.$message.success('删除成功')
            })
        },

        /*
        获取分页列表
        */
        async getUsers(page = 1) {
            this.page = page
            // console.log(this.page, this.limit)
            this.postuser()
            // const { limit, tempSearchObj } = this
            // this.listLoading = false
            // const result = await this.$API.user.getPageList(page, limit, tempSearchObj)
            // this.listLoading = false
            // const { records, total } = result.data
            // this.users = records
            // this.total = total - 1
            // this.selectedIds = []
        },

        /*
        处理pageSize发生改变的监听回调
        */
        handleSizeChange(pageSize) {
            this.limit = pageSize
            this.getUsers()
        },

        /*
        取消用户的保存或更新
        */
        cancel() {
            this.dialogUserVisible = false
            this.user = {}
        },

        /*
        保存或者更新用户
        */
        addOrUpdate() {   //如果为非空的话，就表示为调用更新用户请求
            console.log(this.user.id)  //到时候判断一下是否为user.id是否为空就行了
            if (this.user.id !== undefined) {
                console.log("非空")
                this.alteruser()
            } else {   //如果为空的话，就表示为调用创建用户请求
                // console.log("为空")
                // console.log(this.user.password)
                this.usersave()
            }
            // this.$refs.userForm.validate(valid => {
            //     if (valid) {
            //         const { user } = this
            //         this.loading = true
            //         this.$API.user[user.id ? 'update' : 'add'](user).then((result) => {
            //             this.loading = false
            //             this.$message.success('保存成功!')
            //             this.getUsers(user.id ? this.page : 1)
            //             this.user = {}
            //             this.dialogUserVisible = false
            //         })
            //     }
            // })
        }
    }
}
</script>
  