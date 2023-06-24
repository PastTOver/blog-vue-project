import { getToken } from "@/storage";
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
        params,
        headers: {
          token: state.token(),
        },
      });
    },
    getDocDetail({ commit, state }, params) {
      return axios.get(state.docBaseUrl + "/document_course/" + params.id, {
        headers: {
          token: state.token(),
        },
      });
    },
    getDocDetailBy_DetailId({ commit, state }, params) {
      return axios.get(state.docBaseUrl + "/document_docById/" + params.id, {
        headers: {
          token: state.token(),
        },
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
