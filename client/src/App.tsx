import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import DonorDashboard from './pages/DonorDashboard'
import SearchDonors from './pages/SearchDonors'

function App() {
  return (
    <RecoilRoot>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/donor-dashboard" element={<DonorDashboard />} />
              <Route path="/search" element={<SearchDonors />} />
            </Routes>
          </main>
        </div>
      </Router>
    </RecoilRoot>
  )
}

export default App 