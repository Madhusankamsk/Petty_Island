import { GLOBALTYPES } from "./globalTypes";
import { getDataAPI,patchDataAPI } from "../../utils/fetchDate";
import { imageUpload } from "../../utils/imageUpload";

export const PROFILE_TYPES = {
    LOADING : 'LOADING',
    GET_USER : 'GET_USER'
}


export const getProfileUsers = ({users,id,auth}) => async(dispatch) => {
    if(users.every(user => user._id !== id)){
        try {
            dispatch({type: PROFILE_TYPES.LOADING, payload: true})
            const res = await getDataAPI(`/user/${id}`,auth.token)
            //console.log(user._id)
            dispatch({type: PROFILE_TYPES.GET_USER, payload: res.data})
            //console.log(res.data)
            dispatch({type: PROFILE_TYPES.LOADING, payload: false})

        } catch (err) {
            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: {error: err.response.data.msg}
            })
        }
    }
}

export const updateProfileUser = ({userData,avatar,auth}) => async(dispatch)=>{
    if(!userData.fullname)
        return dispatch({type: GLOBALTYPES.ALERT,payload: {error: "Please add your full name."}})
    if(userData.fullname.length > 25)
        return dispatch({type: GLOBALTYPES.ALERT,payload: {error: "Your name is too large"}})
    if(userData.fullname.story > 200)
        return dispatch({type: GLOBALTYPES.ALERT,payload: {error: "Your Story is too LONG"}})

    try {
        let media;
        dispatch({type: GLOBALTYPES.ALERT,payload: {loading: true}})
        if(avatar) media = await imageUpload([avatar])
        const res = await patchDataAPI("user",{
            ...userData,
            avatar: avatar ? media[0].url : auth.user.avatar
        },auth.token)
        dispatch({
            type: GLOBALTYPES.AUTH,
            payload: {
                ...auth,
                user: {
                    ...auth.user,
                    ...userData,
                    avatar: avatar ? media[0].url : auth.user.avatar
                }
            }
        })
        dispatch({type: GLOBALTYPES.ALERT,payload: {success: res.data.msg}})
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {error: err.response.data.msg}
        })
    }
}