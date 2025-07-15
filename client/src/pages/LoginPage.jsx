import React, {useState, useEffect, useContext} from 'react'
import api from '../api/axios'
import { AuthContext } from '../context/authContext'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
    const { setUser} = useContext(AuthContext)
    const navigate = useNavigate()
    const [form, setForm] = useState({ email: '', password: '' })
    const [error, setError] = useState('')


    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await api.post('/auth/login', form)
            const res = await api.get('/auth/me')
            setUser(res.data.user)
            navigate('/dashboard')
        } catch (error) {
            setError(error.response?.data?.message || 'Login failed')
        }
    }

  return (
    <div>
        <h1>Login</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit="">
            <input 
                type="text"
                name='username'
                placeholder='Username'
                value={form.username}
                onChange={handleChange}
                required
            />
            <input 
                type="password"
                name='password'
                placeholder='Password'
                value={form.password}
                onChange={handleChange}
                required
            />
            <button type='submit'>Login</button>
        </form>
    </div>
  )
}

export default LoginPage