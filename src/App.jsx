import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing'
import './App.css'
import Layout from './Components/Layout'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route exact path="/" element={<Landing />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
