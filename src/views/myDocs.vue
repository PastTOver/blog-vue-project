<template>
  <el-row :gutter="20" justify="center">
    <el-col :span="18">
      <el-table
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
        <el-table-column prop="documentName" label="专题名称" width="230" />
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
        <el-image :src="editDoc.documentImage"/>
        <el-input v-model="editDoc.documentName" placeholder="修改名称" />
        <el-text v-model="editDoc.documentSummary" placeholder="修改简介" />

      </div>
      <div class="dialog-footer">
        <el-button @click="editVisible = false">取消</el-button>
        <el-button type="primary" @click="submitEidt"> 确认提交 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script>
import { ElLoading } from "element-plus";

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
    };
  },
  created() {},
  mounted() {
    this.globalLoading(true);
    this.init_page();
  },
  methods: {
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
        .dispatch("getSelfDoc", this.docSearch)
        .then((resp) => {
            console.log(resp)
            vm.$store.dispatch("respFilter",{resp})
            vm.docPage = resp.data.data;
            console.log(vm.docPage);
            vm.globalLoading(false);
        })
        .catch((resp) => {
          console.log(resp);
        });
    },
    handleEdit(index, row) {
      /*
        加载数据
         */
      this.editVisible = true;
    },
    handleDelete(index, row) {},
    handleShow(index, row) {},
  },
};
</script>

<style scoped>
@import "../assets/css/app.css";
@import "../assets/css/animation.css";
</style>
