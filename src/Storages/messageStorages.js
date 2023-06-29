import { getToken, clearToken } from "@/storage";
import axios from "axios";

const messageStorages = {
    state: {
        messageDataUrl: "http://localhost:9001/message",
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
        selectContacts({ commit, state }) {
            return axios.get(state.messageDataUrl + "/queryContacts", {
                headers: {
                    token: state.token(),
                },
            })
        },
        selectMessage({ commit, state }, params) {
            return axios.get(state.messageDataUrl + "/reviewTheMessage/", {
                headers: {
                    token: state.token(),
                },
                params: params
            })
        },
        sendMessage({ commit, state }, params) {
            return axios.post(state.messageDataUrl + "/sendInformation", params, {
                headers: {
                    token: state.token(),
                },
                params: params
            })
        },
        selectMessageCount({ commit, state }, params) {
            return axios.get(state.messageDataUrl + "/unreadPartialInformation/", {
                headers: {
                    token: state.token(),
                },
                params: params
            })
        },
    }
}

export default messageStorages;