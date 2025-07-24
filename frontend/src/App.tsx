import './App.css'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { Home } from './Pages/home'
import { Login } from './Pages/login'
import { RoundInput } from './Pages/roundinput'
import History from './Pages/history'
import { Layout } from './Layout'

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout/>}>
          <Route path='/' element={<Login/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/roundinput' element={<RoundInput/>}/>
          <Route path='/history' element={<History/>}/>
        </Route>

      </Routes>
    </Router>
  )
}

export default App
