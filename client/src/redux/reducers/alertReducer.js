import { GLOBALTYPES } from "../actions/globalTypes";

const initialState = {}

const alertReducer = (state = initialState,action)=>{
    switch(action.type){
        case GLOBALTYPES.ALERT:
            return action.payload;
        default:
            return state;
    }
}
//console.log(notifyReducer)

export default alertReducer