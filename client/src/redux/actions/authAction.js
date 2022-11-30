import {postDataAPI} from '../../utils/fetchDate'
import {GLOBALTYPES } from './globalTypes'

export const login = (data)=>async(dispatch)=>{
    try {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {loading: true}
        })

        const res = await postDataAPI('login', data)
        //console.log(res)

        dispatch({
            type: GLOBALTYPES.AUTH,
            payload: {
                token: res.data.access_token,
                user: res.data.user
            }
        })
        //console.log(res.data.access_token)
        localStorage.setItem("firstLogin",true)

        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                success: res.data.msg
            }
        })
        
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
                error: err.responce.data.msg
            }
        })
    }
}


export const refreshToken = ()=> async (dispatch) =>{
    const firsLogin = localStorage.getItem("firstLogin");
    if(firsLogin){
        dispatch({type: GLOBALTYPES.ALERT, payload: {loading: true}})
        try {
            const res = await postDataAPI('refresh_token')
            //console.log(res)
            dispatch({
                type: GLOBALTYPES.AUTH,
                payload: {
                    token: res.data.access_token,
                    user: res.data.user
                }
            })

        dispatch({type: GLOBALTYPES.ALERT, payload: {}})

        } catch (err) {
            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: {
                    error: err.responce.data.msg
                }
            })
        }
    }
}