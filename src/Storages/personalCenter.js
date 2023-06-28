import { getToken, clearToken } from "@/storage";
import axios from "axios";

const personalCenter = {
    state: {
        userDataUrl: "http://localhost:9001/user",
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
        getUserData({ commit, state }) {
            return axios.get(state.userDataUrl + "/get", {
                headers: {
                    token: state.token(),
                },
            })
        },
        updateUser({ commit, state }, params) {
            return axios.put(state.userDataUrl + "/update", params, {
                headers: {
                    token: state.token(),
                },
                data: params
            })
        },
        updateImg({ commit, state }, params) {
            let param = new FormData()
            param.append('file', params)
            console.log('----------------')
            console.log(param)
            return axios.post(state.userDataUrl + "/fileUpload", param, {
                headers: {
                    token: state.token(),
                },
                data: params
            })
        },
    }
}

export default personalCenter;