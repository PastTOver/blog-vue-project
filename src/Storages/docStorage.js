import { getToken, clearToken } from "@/storage";
import axios from "axios";
import {ElMessageBox } from 'element-plus'
const docStorage = {
  state: {
    docBaseUrl: "http://localhost:9001/course",
    certBaseUrl: "http://localhost:9001/cert",
    token: getToken,
    test: 1,
  },
  /**
   * 修改状态用 用于动态改state
   */
  mutations: {
    /**
     * 使用样例
     */
    SET_TEST(state) {
      state.test += 1;
    },
  },
  actions: {
    getPageDoc({ commit, state }, params) {
      return axios.get(state.docBaseUrl + "/blog_course", {
        params,
      });
    },
    getDocDetail({ commit, state }, params) {
      return axios.get(state.docBaseUrl + "/document_course", {
        headers:{
          token: state.token(),
          "Access-Control-Allow-Origin": "http://localhost:8081" 
        },
        params
      });
    },
    getDocDetail_Free({ commit, state }, params) {
      return axios.get(state.docBaseUrl + "/document_course/free", {
        headers: {

          "Access-Control-Allow-Origin": "http://localhost:8081" 
        },
        params,
      });
    },
    getDocDetailBy_DetailId_Free({ commit, state }, params) {
      return axios.get(state.docBaseUrl + "/document_docById/free", {
        headers: {

        },
        params,
      });
    },
    getDocDetailBy_DetailId({ commit, state }, params) {
      return axios.get(state.docBaseUrl + "/document_docById", {
        headers: {
          token: state.token(),
        },
        params,
      });
    },
    /**
     * 获取文档资源 (.md文件)
     * @param {*} param0
     * @param {*} params
     */
    getDocDetail_Resource({ commit, state }, params) {
      return axios({
        method: "get",
        url: params.url,
        responseType: "stream",
      });
    },
    Owner_Document_Topic({ commit, state }, params) {
      return axios.get(state.docBaseUrl+"/owner/load_document_topics",{
        headers:{
          token:state.token(),
        },
        params
      })
    },
    getSelfDoc({ commit, state }, params) {
      return axios.get(state.docBaseUrl + "/documents/mine", {
        params,
        headers: {
          token: state.token(),
        },
      });
    },
    Owner_Document_Topic_DELETE({ commit, state }, {id}) {
      return axios.delete(state.docBaseUrl + "/document_course", {
        params:{id},
        headers: {
          token: state.token(),
        },
      });
    },
    Owner_Document_Topic_Show({ commit, state }, {id}) {
      return axios.post(
        state.docBaseUrl + "/owner/document_course/show", 
        {},
        {
          params:{id},
          headers: {
            token: state.token(),
          }
        }
      )
    },
    /**
     * @returns 获取当前用户名下的全部证书模板
     */
    Owner_Cert_GET({ commit, state }){
      return axios.get(state.certBaseUrl+"/cert/templates",{
        headers: {
          token: state.token(),
        },
      })
    },
    UploadTopicAvatar({ commit, state }, {file}) {
      let formData =new FormData();
      formData.append('file',file)
      return axios.put(state.docBaseUrl+"/document_course/avatar",formData,{
        headers:{
          token: state.token()
        }
      })
    },
    Sumit_DocTopic_POST({ commit, state },data,) {
      return axios.post(state.docBaseUrl+"/updateDocTopic",data,{
        headers:{
          token: state.token()
        },
        params:{
          id:data.id,
          documentImage:data.documentImage,
          documentName:data.documentName,
          documentSummary:data.documentSummary,
          price:data.price,
          resourceIsFree:data.resourceIsFree,
          certTemplateId:data.certTemplateId
        }
      })
    },
    Owner_Document_Detail({commit,state},params){
      return axios.get(state.docBaseUrl+'/owner/load_document_detail_topics'
        ,{
          params:{documentId:params.id},
          headers:{
            token: state.token()
          }
        }
      )
    },
    Owner_Document_Detail_UPDATE({commit,state},params){
      return axios.post(state.docBaseUrl+'/updateDocDetail'
        ,{},
        {
          params:params,
          headers:{
            token: state.token()
          }
        }
      )
    },
    User_Cert_GET(){

    },
    //清除token
    respFilter({ commit, state }, { resp }) {
      if (resp.data.code == 208) {
        alert("您的登录已经过期，请重新登录");
        //清除token
        clearToken();
        //跳转首页
        window.location.href="#/login"
      }
      if (resp.data.code == 201) {
        ElMessageBox.alert(resp.data.data, "提示", {
          confirmButtonText: "确定",
          type: "success",
        });
        return
      }
    },
    /**
     * 使用样例
     * @param {*} commit
     * @param {*} payload
     */
    setTestAdd1(commit, payload) {
      console.log(commit);
      console.log(payload);
      //commit('SET_TEST',)
    },
  },
};

export default docStorage;
