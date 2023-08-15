import './App.css'
import {Route, Routes} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import HomePage from './components/Homepage'
import RegisterForm from './components/Admin/Register'
import CampgroundDetail from './components/Admin/CampgroundDetail'
import AccountDetail from './components/AccountDetail'

function App() {
  

  return (
    <div>
      <Routes>
        <Route index element={<LoginForm />}/>
        <Route path='/home' element={<HomePage />} />
        <Route path='/account' element={<AccountDetail />} />
        <Route path='/register' element={<RegisterForm />} />
        <Route path='/campground/:id' element={<CampgroundDetail />} />
      </Routes>
      
    </div>
  )
}

export default App
