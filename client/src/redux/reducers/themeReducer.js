import { GLOBALTYPES } from "../actions/globalTypes";

const initialState = false

const themeReducer = (state = initialState,action)=>{
    switch(action.type){
        case GLOBALTYPES.THEME:
            return action.payload;
        default:
            return state;
    }
}

//console.log(authReducer)


export default themeReducer