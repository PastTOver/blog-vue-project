import { getToken, clearToken } from "@/storage";
import axios from "axios";

const docStorage = {
  state: {
    docBaseUrl: "http://localhost:9001/course",
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
        params
      });
    },
    getDocDetail({ commit, state }, params) {
      return axios.get(state.docBaseUrl + "/document_course/" + params.id, {
      });
    },
    getDocDetail_Free({ commit, state }, params) {
      return axios.get(state.docBaseUrl + "/document_course/free", {
        headers: {
          token: state.token(),
        },
        params
      });
    },
    getDocDetailBy_DetailId_Free({ commit, state }, params) {
      return axios.get(state.docBaseUrl + "/document_docById/free" ,{
        headers: {
          token: state.token(),
        },
        params
      });
    },
    getDocDetailBy_DetailId({ commit, state }, params) {
      return axios.get(state.docBaseUrl + "/document_docById" ,{
        headers: {
          token: state.token(),
        },
        params
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
    getSelfDoc({ commit, state }, params) {
      return axios.get(state.docBaseUrl + "/documents/mine", {
        params,
        headers: {
          token: state.token(),
        },
      });
    },
    //清除token
    respFilter({ commit, state }, { resp }) {
      if (resp.data.code == 208) {
        alert("您的登录已经过期，请重新登录");
        //清除token
        clearToken()
        //跳转首页
        this.$router.push('login')
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
