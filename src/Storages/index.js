import { Store } from "vuex";
import docStorage from "./docStorage";


const store=new Store({
    modules:{
        docStorage
    }
})

export default store