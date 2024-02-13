import axios from 'axios'
import { useState } from "react";
import useAuth from '../hooks/useAuth'

export default function LoginForm() {
  const { setUser } = useAuth()
  const [input, setInput] = useState({
    username: 'catcat',
    password: 'catcat1'
  })

  const hdlChange = e => {
    setInput(prv => ({ ...prv, [e.target.name]: e.target.value }))
  }

  const hdlSubmit = async e => {
    try {
      e.preventDefault()
      // validation
      const rs = await axios.post('http://localhost:8889/auth/login', input)
      console.log(rs.data.token)
      localStorage.setItem('token', rs.data.token)
      const rs1 = await axios.get('http://localhost:8889/auth/me', {
        headers: { Authorization: `Bearer ${rs.data.token}` }
      })
      console.log(rs1.data)
      setUser(rs1.data)

    } catch (err) {
      console.log(err.message)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-5 border rounded w-full max-w-sm">
        <div className="text-3xl mb-5 text-center">Sign In</div>
        <form className="flex flex-col gap-2" onSubmit={hdlSubmit}>
          <div className="flex justify-center">
            <a href="URL_ของ_หน้า_ล็อกอิน_ของ_Facebook" className="btn btn-primary">Login with Facebook</a>
          </div>

          <div className="flex justify-center">
            <a href="URL_ของ_หน้า_ล็อกอิน_ของ_Google" className="btn btn-primary mx-3">Login with Google</a>
          </div>

          <label className="form-control">
            <span className="label-text">E-mail</span>
            <input
              type="text"
              className="input input-bordered"
              name="username"
              value={input.username}
              onChange={hdlChange}
            />
          </label>

          <label className="form-control">
            <span className="label-text">Password</span>
            <input
              type="password"
              className="input input-bordered"
              name="password"
              value={input.password}
              onChange={hdlChange}
            />
          </label>

          <div className="flex justify-center">
            <button type="submit" className="btn btn-outline btn-info">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}
