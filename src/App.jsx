import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing'
import './App.css'
import Layout from './Components/Layout'
import Login from './pages/Onboarding/Login'
import Signup from './pages/Onboarding/Signup'
import Example from './pages/firebase/example';
import UserAuthentication from './pages/firebase/UserAuthentication'
import ServicePage from './pages/ServicePage/ServicePage'
import CategoryPage from './pages/ServicePage/CategoryPage'


function App() {
  return (
    <Router>
      <Routes>
        <Route path='userauthentication' element={<UserAuthentication />} />
        <Route path='example' element={<Example />} />
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<Signup />} />
        <Route path="/" element={<Layout />} >
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/service" element={<ServicePage />} /> 
          <Route exact path="/category" element={<CategoryPage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
