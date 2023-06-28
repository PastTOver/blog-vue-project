import { Store } from "vuex";
import docStorage from "./docStorage";
import personalCenter from "./personalCenter";
import messageStorages from "./messageStorages";

const store = new Store({
    modules:{
        docStorage,
        personalCenter,
        messageStorages
    }
})

export default store