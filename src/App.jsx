import './App.css'
import {Route, Routes} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import HomePage from './components/Homepage'
import RegisterForm from './components/Admin/Register'
import CampgroundDetail from './components/Admin/CampgroundDetail'
import AccountDetail from './components/AccountDetail'
import AdminDashboard from './components/Admin/AdminDashboard'
import CampsiteDetail from './components/CampsiteDetail'
import AdminCampsiteDetail from './components/Admin/AdminCampsiteDetail'


function App() {
  

  return (
    <div>
      <Routes>
        <Route index element={<LoginForm />}/>
        <Route path='/home' element={<HomePage />} />
        <Route path='/dashboard' element={<AdminDashboard />} />
        <Route path='/account' element={<AccountDetail />} />
        <Route path='/register' element={<RegisterForm />} />
        <Route path='/campground/:id' element={<CampgroundDetail />} />
        <Route path='/campsite/:id' element={<CampsiteDetail />} />
        <Route path='/dashboard/campsite/:id' element={<AdminCampsiteDetail />} />
      </Routes>
      
    </div>
  )
}

export default App
