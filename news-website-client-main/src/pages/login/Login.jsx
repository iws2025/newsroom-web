import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../services/authService';
import { toast } from 'react-toastify';
import { useAuth } from '../../hooks/useAuth';

const Login = () => {
  const navigate = useNavigate();
  const { saveUser, saveToken } = useAuth();
  const [form, setForm] = useState({
    email: "",
    password: ""
  });
  
  const handleInputChange = (e) => {
    const { name, value } = e.target; 
    setForm((prevForm) => ({
      ...prevForm, 
      [name]: value, 
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const result = await login({
      email: form.email,
      password: form.password
    });
    
    if (result) {
      let token = result?.data?.token
      saveToken(token);
      saveUser(result?.data);
      toast.success(result?.message);
      navigate("/home");
      window.location.reload();
    }
  }

  return (
    <div className="d-flex justify-content-center min-h-screen bg-gray-50 px-4 mb-4" style={{ height: "550px" }}>
      <div className="d-flex flex-column align-items-center justify-content-center card bg-white p-8 rounded shadow text-center" style={{ padding: "200px", borderRadius: "15px" }}>
        <h1 className="m-0 display-5 text-uppercase"><span className="text-primary">News</span>Room</h1>
        <h3 className="text-lg font-semibold text-gray-700 mb-4 mt-2">              
          Login
        </h3>
        <form onSubmit={onSubmit}>
          <div className='d-flex flex-column align-items-center justify-content-center'>
            <div class="input-group d-flex flex-column align-items-start" style={{ width: "300px" }}>
              <label htmlFor="email" className="font-weight-bold">Email</label>
              <input type="text" class="form-control w-100" placeholder="Email" name="email" value={form.email} onChange={handleInputChange}/>
            </div>
            <div class="input-group mt-3 d-flex flex-column align-items-start" style={{ width: "300px" }}>
              <label htmlFor="password" className="font-weight-bold">Password</label>
              <input type="password" class="form-control w-100" placeholder="Password" name="password" value={form.password} onChange={handleInputChange}/>
            </div>
            <h6 className="mt-3 display-5">Don't have an account? <Link to="/register"><span className="text-primary">Register here!</span></Link></h6>
            <button className="btn btn-primary font-weight-semi-bold py-2 px-3 mt-3" type="submit" onClick={onSubmit}>
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login