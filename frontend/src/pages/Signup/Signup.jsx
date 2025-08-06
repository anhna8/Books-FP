import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import { signupSchema } from '../../schemas/Signup'
import { z } from 'zod'

function Signup() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    try {
      signupSchema.parse(form)
      login({ name: form.name, email: form.email }) // Simulación de registro
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
      <h1>Crear cuenta</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={form.name}
          onChange={handleChange}
        />
        {errors.name && <p>{errors.name}</p>}

        <input
          type="email"
          name="email"
          placeholder="Correo"
          value={form.email}
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

        <button type="submit">Registrarse</button>
      </form>
    </div>
  )
}

export default Signup
