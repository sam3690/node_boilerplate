import {BrowserRouter, ReactRouter, Route, Routes} from 'react-router-dom'
import UsersPage from './pages/UsersPage'
import CreateUserspage from './pages/CreateUserspage'
// import { useState } from 'react'
import './App.css'
import LoginPage from './pages/LoginPage'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/users" element={<UsersPage />} />
        <Route path="/create-user" element={<CreateUserspage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
