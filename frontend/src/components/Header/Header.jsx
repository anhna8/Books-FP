import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

function Header () {
  const { user, logout } = useAuth()

  return (
    <header>
      <nav>
        <Link to="/">Inicio</Link>
        <Link to="/catalog">Catálogo</Link>
        {user ? (
          <>
            <span>Hola, {user.name}</span>
            <button onClick={logout}>Cerrar sesión</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Registro</Link>
          </>
        )}
      </nav>
    </header>
  )
}

export default Header
