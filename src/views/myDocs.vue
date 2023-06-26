<template>
  <el-row :gutter="20" justify="center">
    <el-col :span="18">
      <el-page-header @back="goBack" class="text-large font-600 mr-3">
        <template #content>
          <span class="text-large font-600 mr-3"> 我的文档: </span>
        </template>

        <el-row justify="center">
          <el-col :span="4">
            <el-input
              placeholder="请输入文档名称"
              v-model="docSearch.document_name"
            ></el-input>
          </el-col>
          <el-col :span="3">
            <el-input
              placeholder="请输入简介"
              v-model="docSearch.summary"
            ></el-input>
          </el-col>
          <el-col :span="3">
            <el-select v-model="docSearch.priceAsc" placeholder="价格排序">
              <el-option :value="true">按价格升序</el-option>
              <el-option :value="false">按价格倒序</el-option>
            </el-select>
          </el-col>
          <el-col :span="3">
            <el-button @click="loadPageData" type="primary">查询</el-button>
          </el-col>
        </el-row>
      </el-page-header>
    </el-col>
    <el-col :span="18">
      <el-table
      @cell-click='handleCellClick' 
        v-if="docPage.records.length > 0"
        :data="docPage.records"
        stripe
        style="width: 100%"
      >
        <el-table-column type="expand">
          <template #default="props">
            <div m="4">
              <el-image
                style="width: 100px; height: 100px"
                :src="props.row.documentImage"
                :fit="contain"
              />
              <p m="t-0 b-2">专题名称: {{ props.row.documentName }}</p>
              <p m="t-0 b-2">简介: {{ props.row.documentSummary }}</p>
              <p m="t-0 b-2">价格: {{ props.row.price }}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column 
        prop="documentName" label="专题名称" width="230" />
        <el-table-column prop="publishTime" label="发布时间" width="230" />
        <el-table-column prop="isDelete" label="状态" :formatter="formatDelete">
        </el-table-column>
        <el-table-column align="right">
          <template #header>
            <el-input
              v-model="search"
              size="small"
              placeholder="回车搜索专题名称"
            />
          </template>
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
              >Edit</el-button
            >

            <el-button
              v-if="scope.row.isDelete == 0"
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >禁用</el-button
            >
            <el-button
              v-if="scope.row.isDelete == 1"
              size="small"
              type="primary"
              @click="handlerShow(scope.$index, scope.row)"
              >显示</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <div v-else style="margin-top: 45px" class="danger">
        <h1>您名下没有对应数据</h1>
      </div>

      <el-row justify="center" style="margin: 35px 0px">
        <el-pagination
          :hide-on-single-page="docPage.pages == 1"
          :total="docPage.total"
          :page-size="docSearch.page_size"
          @current-change="current_change"
          background
          layout="prev, pager, next"
        />
      </el-row>
    </el-col>
  </el-row>

  <el-dialog v-model="editVisible" title="修改">
    <template #default>
      <el-dialog
        v-model="innerVisible"
        width="30%"
        title="Inner Dialog"
        append-to-body
      />
    </template>
    <template #footer>
      <div>
        <el-image :src="editDoc.documentImage" />
        <hr />
        <el-form>
          <input
            type="file"
            accept="image/*"
            @change="avatarChange"
          />(仅允许jpg与png)
          <el-form-item label="文档名称">
            <el-input
              v-model="editDoc.documentName"
              label="文档名称"
              placeholder="修改名称"
            />
          </el-form-item>

          <el-form-item label="修改简介">
            <el-input
              v-model="editDoc.documentSummary"
              :rows="2"
              label="文档简介"
              type="textarea"
              placeholder="修改简介"
              class="min-height:200px"
            />
          </el-form-item>

          <el-form-item label="是否免费">
            <el-select v-model="editDoc.resourceIsFree" class="m-2">
              <el-option :value="0" label="免费">免费</el-option>
              <el-option :value="1" label="收费">收费</el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="价格">
            <el-input-number min="0" v-model="editDoc.price" />
          </el-form-item>

          <el-form-item label="选择模板">
            <el-row :gutter="20" justify="center">
              <el-col v-for="cert in certs" :span="8">
                <el-image :src="cert.imageUrl"></el-image>
                <div>{{ cert.content }}</div>
                <el-radio-group v-model="editDoc.certTemplateId">
                  <el-radio @change="console.log(editDoc.certTemplateId)"
                    :label="cert.id" />
                </el-radio-group>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </div>
      <div class="dialog-footer">
        <el-button @click="editVisible = false">取消</el-button>
        <el-button type="primary" @click="submitEidt"> 确认提交 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script>
import { ElLoading, UploadInstance, useFloating } from "element-plus";
import { ref } from "vue";
import { ElMessageBox } from "element-plus";

export default {
  setup() {},
  data() {
    return {
      docSearch: {
        current: 1,
        page_size: 8,
      },
      docPage: {
        records: [],
      },
      editVisible: false,
      editDoc: {},
      certs: [],
    };
  },
  created() {},
  mounted() {
    this.globalLoading(true);
    this.init_page();
  },
  methods: {
    avatarChange(event) {
      const selectedFile = event.target.files[0];
      console.log(selectedFile);
      let vm = this;
      /**
       * 上传文件
       */
      this.$store
        .dispatch("UploadTopicAvatar", { file: selectedFile })
        .then((resp) => {
          console.log(resp);
          vm.$store.dispatch("respFilter", { resp });
          if (resp.data.code == 200) {
            console.log(resp);
            vm.editDoc.documentImage = resp.data.data;
          }
        });
    },
    goBack() {
      window.location.href = "#/docs";
    },
    formatDelete(row, column, value) {
      if (value == 0) {
        return `正常`;
      }
      return "已禁用";
    },
    globalLoading(isEnable) {
      if (isEnable)
        this.loadingService = ElLoading.service({
          fullscreen: true,
        });
      else {
        this.loadingService.close();
      }
    },
    init_page() {
      this.loadPageData();
      console.log("token:---------");
      this.token = this.$store.state.docStorage.token();
      console.log(this.token);
    },
    loadPageData() {
      let vm = this;
      this.$store
        .dispatch("Owner_Document_Topic", this.docSearch)
        .then((resp) => {
          console.log(resp);
          vm.$store.dispatch("respFilter", { resp });
          vm.docPage = resp.data.data;
          console.log(vm.docPage);
          vm.globalLoading(false);
        })
        .catch((resp) => {
          console.log(resp);
        });
    },
    //edit按钮点击时调用
    loadCertTemplates() {
      let vm = this;
      this.$store.dispatch("Owner_Cert_GET", {}).then((resp) => {
        console.log(resp);
        vm.$store.dispatch("respFilter", { resp });
        if (resp.data.code == 200) {
          vm.certs = resp.data.data;
        }
      });
    },
    handleEdit(index, row) {
      this.loadCertTemplates();
      this.editDoc = row;
      /*
        加载数据
         */
      this.editVisible = true;
    },
    submitEidt(){
      console.log('editData:--------------')
      console.log(this.editDoc)
      let vm=this;
      this.$store.dispatch("Sumit_DocTopic_POST",vm.editDoc)
      .then(resp=>{
        console.log(resp)
        vm.$store.dispatch("respFilter", { resp });
        if(resp.data.code==200){
          ElMessageBox.alert("修改成功！")
        }
      })
    },
    handleDelete(index, row) {
      console.log(row);
      let vm = this;
      this.$store
        .dispatch("Owner_Document_Topic_DELETE", row)
        .then((resp) => {
          console.log(resp);
          vm.$store.dispatch("respFilter", { resp });
          vm.docPage = resp.data.data;
          console.log(vm.docPage);
          vm.globalLoading(false);
          if(resp.data.code==200){
            ElMessageBox.alert('删除成功')
            window.location.reload()
          }
        })
        .catch((resp) => {
          console.log(resp);
        });
    },
    handlerShow(index, row) {
      console.log(row);
      let vm = this;
      this.$store
        .dispatch("Owner_Document_Topic_Show", row)
        .then((resp) => {
          console.log(resp);
          vm.$store.dispatch("respFilter", { resp });
          vm.docPage = resp.data.data;
          console.log(vm.docPage);
          vm.globalLoading(false);
          if(resp.data.code==200){
            ElMessageBox.alert('操作成功')
            window.location.reload()
          }
        })
        .catch((resp) => {
          console.log(resp);
        });
    },
    handleCellClick(arg1,arg2){
      this.$router.push({name:'docDetailUpdate',params:{id:arg1.id}});
    }
  },
};
</script>

<style scoped>
@import "../assets/css/app.css";
@import "../assets/css/animation.css";
</style>
