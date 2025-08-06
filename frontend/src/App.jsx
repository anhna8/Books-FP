import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Catalog from './pages/Catalog/Catalog'
import BookDetail from './pages/BookDetail/BookDetail'
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'
import Header from './components/Header/Header'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/book/:id" element={<BookDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  )
}

export default App
