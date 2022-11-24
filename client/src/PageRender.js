import React from 'react'
import { useParams } from 'react-router-dom'
import NotFound from './components/NotFound'

const generatePage = (pageNam)=>{
    const component = ()=> require(`./pages/${pageNam}`).default

    try {
        return React.createElement(component())
    } catch (error) {
        return <NotFound/>
    }
}

const PageRender = () => {
    const {page,id} = useParams()    
    let pageNam = "";
    if(id){
        pageNam = `${page}/[id]`
    }else{
        pageNam = `${page}`
    }
    console.log(pageNam)
    return generatePage(pageNam)
}

export default PageRender