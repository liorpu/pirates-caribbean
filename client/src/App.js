import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import User from './User'
import Admin from './Admin'
import Login from './Login'

function App() {
  return (
    <div>       
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/User/:username" element={<User />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/Admin" element={<Admin />} />
            </Routes>
        </Router>        
    </div>
  )
}

export default App