import { getToken } from "@/storage";
import axios from "axios";


const docStorage={
    state:{
        docBaseUrl:"http://localhost:9001/course",
        token:getToken,
        test:1,
    },
    /**
     * 修改状态用 用于动态改state
     */
    mutations:{
        /**
         * 使用样例
         */
        SET_TEST(state){
            state.test+=1;
        }
    },
    actions:{
        getPageDoc({commit,state},params){
            return axios.get(state.docBaseUrl+'/blog_course',{
                params,
                headers:{
                    token:state.token()
                }
            })
        },
        /**
         * 使用样例
         * @param {*} commit 
         * @param {*} payload 
         */
        setTestAdd1(commit,payload){
            console.log(commit)
            console.log(payload)
            //commit('SET_TEST',)
        }
    }
}

export default docStorage;
