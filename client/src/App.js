import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import PageRender from './PageRender';
import Login from './pages/login';
import Home from './pages/home';
import 'bootstrap/dist/css/bootstrap.min.css';
import Alert from './components/alert/Alert';
import Header from './components/Header';
import { useSelector, useDispatch } from 'react-redux'
import {useEffect} from 'react'
import {refreshToken} from './redux/actions/authAction'

function App() {
  const {auth} = useSelector(state => state)
  //console.log(auth.token)
  const dispatch = useDispatch()
  
  useEffect(()=>{
    dispatch(refreshToken())
  },[dispatch])

  return (
    <Router>
      <Alert/>
      <input type="checkbox" id="theme" />
      <div className="App">
        <div className='main'>
        {auth.token && <Header/>}
          <Routes>
            <Route exact path = "/" element={auth.token ? <Home/> : <Login/>}/>
            <Route exact path = "/:page" element={<PageRender/>}/>
            <Route exact path = "/:page/:id" element={<PageRender/>}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
