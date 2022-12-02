import React, { useState,useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getDataAPI } from '../../utils/fetchDate'
import { GLOBALTYPES} from '../../redux/actions/globalTypes'
import {Link} from 'react-router-dom'
import UserCard from '../UserCard'


const Search = () => {
  const [search, setSearch] = useState('')
  const {auth} = useSelector(state => state)
  const [users,setUsers] = useState('')
  const dispatch = useDispatch()

  useEffect(()=>{
      if(search && auth.token ){
        //console.log(auth.token)
        getDataAPI(`search?username=${search}`,auth.token)
        .then(res => console.log(res))
      }
  },[search,auth.token,dispatch])
  //console.log(users)
  return (
    <form className = "search_form" >
      <input type='text' name = 'search' value={search} id = 'search'
        onChange={e=> setSearch(e.target.value.toLowerCase().replace(/ /g,''))} />
        <div className='search_icon' style={{opacity: search ? 0 : 0.3}} >
            <span className='material-icons' >search</span>
            <span>search</span>
        </div>
        <div className='close_search' >
          &times;
        </div>
    </form>
  )
}

export default Search


// import React, { useState,useEffect } from 'react'
// import { useSelector, useDispatch } from 'react-redux'
// import { getDataAPI } from '../../utils/fetchDate'
// import { GLOBALTYPES} from '../../redux/actions/globalTypes'
// import {Link} from 'react-router-dom'
// import UserCard from '../UserCard'


// const Search = () => {
//   const [search, setSearch] = useState('')
//   const {auth} = useSelector(state => state)
//   const [users,setUsers] = useState('')
//   const dispatch = useDispatch()

//   useEffect(()=>{
//       if(search && auth.token ){
//         //console.log(auth.token)
//         getDataAPI(`search?username=${search}`,auth.token)
//         .then(res => setUsers(res.data.users))
//         .catch(err => {
//           dispatch({
//             type: GLOBALTYPES.ALERT, payload: {error:err.responce.data.msg}
//           })
//         })
//       }
//   },[search,auth.token,dispatch])
//   //console.log(users)
//   return (
//     <form className = "search_form" >
//       <input type='text' name = 'search' value={search} id = 'search'
//         onChange={e=> setSearch(e.target.value.toLowerCase().replace(/ /g,''))} />
//         <div className='search_icon' style={{opacity: search ? 0 : 0.3}} >
//             <span className='material-icons' >search</span>
//             <span>search</span>
//         </div>
//         <div className='close_search' >
//           &times;
//         </div>
//         <div className='users' >
//             {
//               users.map(user=>(
//                 <Link key={user._id} to={`/profile/${user._id}`} >
//                     <UserCard/>
//                 </Link>
//               ))
//             }
//         </div>
//     </form>
//   )
// }

// export default Search