import { Store } from "vuex";
import docStorage from "./docStorage";
import personalCenter from "./personalCenter";
import messageStorages from "./messageStorages";
import videoComment from "./videoComment";

const store = new Store({
    modules:{
        docStorage,
        personalCenter,
        messageStorages,
        videoComment
    }
})

export default store