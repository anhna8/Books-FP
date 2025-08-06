import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import { loginSchema } from '../../schemas/Login'
import { z } from 'zod'

function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    try {
      loginSchema.parse(form)
      login({ name: 'Usuario', email: form.email }) // Simulación
      navigate('/')
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors = {}
        err.errors.forEach((e) => {
          fieldErrors[e.path[0]] = e.message
        })
        setErrors(fieldErrors)
      }
    }
  }

  return (
    <div>
      <h1>Iniciar sesión</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
        />

        {errors.email && <p>{errors.email}</p>}

        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
        />
        {errors.password && <p>{errors.password}</p>}

        <button type="submit">Entrar</button>
      </form>
    </div>
  )
}

export default Login
