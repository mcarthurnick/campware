import './App.css'
import {Route, Routes} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import HomePage from './components/Homepage'
import RegisterForm from './components/Admin/Register'

function App() {
  

  return (
    <div>
      <Routes>
        <Route index element={<LoginForm />}/>
        <Route path='/home' element={<HomePage />} />
        <Route path='/register' element={<RegisterForm />} />
      </Routes>
      
    </div>
  )
}

export default App
