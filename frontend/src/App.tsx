// src/App.tsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Homepage from './pages/homepage'
import Dashboard from './pages/dashboard'
import AboutPage from './pages/aboutpage'
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}
