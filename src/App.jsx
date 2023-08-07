import './App.css'
import {Route, Routes} from 'react-router-dom'
import LoginForm from './components/LoginForm'

function App() {
  

  return (
    <div>
      <Routes>
        <Route index element={<LoginForm />}/>
      </Routes>
      
    </div>
  )
}

export default App
