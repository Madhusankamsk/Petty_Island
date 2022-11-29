import React from 'react'
import { useSelector,useDispatch } from 'react-redux'

const Notify = () => {
    const state = useSelector(state => state)
    console.log(state)
  return (
    <div>Notify</div>
  )
}

export default Notify