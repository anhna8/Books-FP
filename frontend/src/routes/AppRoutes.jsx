import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home/Home.jsx'
import Catalog from '../pages/Catalog/Catalog.jsx'
import BookDetail from '../pages/BookDetail/BookDetail.jsx'
import Login from '../pages/Login/Login.jsx'
import Signup from '../pages/Signup/Signup.jsx'

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/catalog" element={<Catalog />} />
    <Route path="/book/:id" element={<BookDetail />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
  </Routes>
)
