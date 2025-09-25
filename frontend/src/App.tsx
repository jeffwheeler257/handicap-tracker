import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './Pages/Home';
import { Login } from './Pages/Login';
import { Register } from './Pages/Register';
import { RoundInput } from './Pages/RoundInput';
import History from './Pages/History';
import { Layout } from './Layout';
import ProtectedRoute from './Components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout/>}>
          {/* Public routes */}
          <Route path='/' element={<Navigate to='home' replace/>} />
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/home' element={<Home/>}/>
          {/* Protected routes */}
          <Route 
            path='/roundinput' 
            element={
              <ProtectedRoute>
                <RoundInput />
              </ProtectedRoute>
            }
          />
          <Route 
            path='/history' 
            element={
              <ProtectedRoute>
                <History />
              </ProtectedRoute>
            }
          />
        </Route>

      </Routes>
    </Router>
  )
}

export default App;
