import axios from 'axios';
import { useState } from "react";

export default function RegisterForm() {
  const [input, setInput] = useState({
    username: 'catcat',
    password: 'catcat1',
    confirmPassword: 'catcat1',
    email: 'mdd5744@gmail.com'
  })

  const hdlChange = e => {
    setInput(prv => ({ ...prv, [e.target.name]: e.target.value }))
  }

  const hdlSubmit = async e => {
    try {
      e.preventDefault()
      // validation
      if (input.password !== input.confirmPassword) {
        return alert('Please check confirm password')
      }
      const rs = await axios.post('http://localhost:8889/auth/register', input)
      console.log(rs)
      if (rs.status === 200) {
        alert('Register Successful')
      }
    } catch (err) {
      console.log(err.message)
    }

  }

  const handleFacebookLogin = () => {
    // Call Facebook login SDK or redirect to Facebook login page
    // Example: window.location.href = 'FacebookLoginURL'
    alert("Facebook login functionality will be implemented here.")
  }

  const handleGoogleLogin = () => {
    // Call Google login SDK or redirect to Google login page
    // Example: window.location.href = 'GoogleLoginURL'
    alert("Google login functionality will be implemented here.")
  }

  return (
    <div className="p-5 border w-4/6 min-w-[500px] mx-auto rounded mt-5 ">
      <div className="text-3xl mb-5">Register Form</div>
      <form className="flex flex-col gap-4" onSubmit={hdlSubmit}>

        <div className="flex justify-between mt-5">
          <button onClick={handleFacebookLogin} className="btn btn-primary">Sign up with Facebook</button>
        </div>

        <div>
        <button onClick={handleGoogleLogin} className="btn btn-primary">Sign up with Google</button>
        </div>

        <label className="form-control">
          <span className="label-text">Username</span>
          <input
            type="text"
            className="input input-bordered"
            name="username"
            value={input.username}
            onChange={hdlChange}
          />
        </label>
        <label className="form-control">
          <span className="label-text">E-mail</span>
          <input
            type="email"
            className="input input-bordered"
            name="email"
            value={input.email}
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
        <label className="form-control">
          <span className="label-text">Confirm Password</span>
          <input
            type="password"
            className="input input-bordered"
            name="confirmPassword"
            value={input.confirmPassword}
            onChange={hdlChange}
          />
        </label>
        <div className="flex justify-center gap-5 ">
          <button type="submit" className="btn btn-primary">Submit</button>
          <button type="reset" className="btn btn-warning">Reset</button>
        </div>
      </form>
    </div>
  );
}
