import { getToken, clearToken } from "@/storage";
import axios from "axios";

const videoComment = {
    state: {
        videoDataUrl: "http://localhost:9001/videoComments",
        token: getToken,
        test: 1,
    },
    mutations: {
        /**
         * 使用样例
         */
        SET_TEST(state) {
            state.test += 1;
        },
    },
    actions: {
        getVideoComment({ commit, state }, params) {
            return axios.get(state.videoDataUrl + "/videoReviews", {
                headers: {
                    token: state.token(),
                },
                params: params
            })
        },
        sendComment({ commit, state }, params) {
            return axios.post(state.videoDataUrl + "/postAComment", params, {
                headers: {
                    token: state.token(),
                },
                params: params
            })
        },
    }
}

export default videoComment;