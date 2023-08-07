import './App.css'
import {Route, Routes} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import HomePage from './components/Homepage'

function App() {
  

  return (
    <div>
      <Routes>
        <Route index element={<LoginForm />}/>
        <Route path='/home' element={<HomePage />} />
      </Routes>
      
    </div>
  )
}

export default App
