import {postDataAPI} from '../../utils/fetchDate'


export const TYPES = {
    AUTH : 'AUTH'
}





export const login = (data)=>async(dispatch)=>{
    try {
        dispatch({
            type: 'NOTIFY',
            payload: {loading: true}
        })

        const res = await postDataAPI('login', data)

        dispatch({
            type: 'AuTH',
            payload: {
                token: res.data.access_token,
                user: res.data.user
            }
        })

        localStorage.setItem("firsLogin",true)

        dispatch({
            type: 'NOTIFY',
            payload: {
                success: res.data.msg
            }
        })
        
    } catch (err) {
        dispatch({
            type: 'NOTIFY',
            payload: {
                error: err.responce.data.msg
            }
        })
    }
}