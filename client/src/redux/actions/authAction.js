import {postDataAPI} from '../../utils/fetchDate'


export const TYPES = {
    AUTH : 'AUTH'
}


export const login = (data)=>async(dispatch)=>{
    try {
        dispatch({type: 'NOTIFY', payload: {loading: true}})
        const res = await postDataAPI('login', data)
        console.log(res)
    } catch (error) {
        
    }
}