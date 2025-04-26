import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../../services/authService';
import AvatarUpload from '../../components/imageUpload/AvatarUpload';
import { toast } from 'react-toastify';

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [avatar, setAvatar] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target; 
    setForm((prevForm) => ({
      ...prevForm, 
      [name]: value, 
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.username || !form.password || !form.confirmPassword) {
      toast.error("Please enter all fields!");
      return;
    }

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (!avatar) {
      toast.error("Please upload an avatar!");
      return;
    }

    const result = await register({
      email: form.email,
      username: form.username,
      password: form.password,
      avatar
    });
    
    if (result) {
      toast.success(result?.message);
      navigate("/login");
    }
  }

  return (
    <div className="d-flex justify-content-center min-h-screen bg-gray-50 px-4 mb-4" style={{ height: "650px" }}>
      <div className="d-flex flex-column align-items-center justify-content-center card bg-white p-8 rounded shadow text-center w-100" style={{ borderRadius: "15px", maxWidth: "800px" }}>
        <h1 className="m-0 display-5 text-uppercase"><span className="text-primary">News</span>Room</h1>
        <h3 className="text-lg font-semibold text-gray-700 mb-4 mt-2">              
          Register
        </h3>
        <form onSubmit={onSubmit} className='w-100'>
          <div className='d-flex align-items-center justify-content-center w-100'>
            <div className="left w-50" style={{ paddingLeft: "100px"}}>
              <div className="input-group d-flex flex-column align-items-start" style={{ width: "100%", maxWidth: "300px" }}>
                <label htmlFor="email" className="font-weight-bold">Email</label>
                <input type="text" className="form-control w-100" placeholder="Email" name="email" value={form.email} onChange={handleInputChange}/>
              </div>
              <div className="input-group mt-3 d-flex flex-column align-items-start" style={{ width: "100%", maxWidth: "300px" }}>
                <label htmlFor="username" className="font-weight-bold">Username</label>
                <input type="text" className="form-control w-100" placeholder="Username" name="username" value={form.username} onChange={handleInputChange}/>
              </div>
              <div className="input-group mt-3 d-flex flex-column align-items-start" style={{ width: "100%", maxWidth: "300px" }}>
                <label htmlFor="password" className="font-weight-bold">Password</label>
                <input type="password" className="form-control w-100" placeholder="Password" name="password" value={form.password} onChange={handleInputChange}/>
              </div>
              <div className="input-group mt-3 d-flex flex-column align-items-start" style={{ width: "100%", maxWidth: "300px" }}>
                <label htmlFor="confirmPassword" className="font-weight-bold">Confirm password</label>
                <input type="password" className="form-control w-100" placeholder="Confirm password" name="confirmPassword" value={form.confirmPassword} onChange={handleInputChange}/>
              </div>
            </div>
            <div className="right w-50 d-flex flex-column align-items-center" style={{ paddingRight: "50px"}}>
              <label htmlFor="confirmPassword" className="font-weight-bold">Avatar</label>
              <AvatarUpload setAvatar={setAvatar}/>
            </div>
          </div>
          <h6 className="mt-3 display-5">Already have an account? <Link to="/login"><span className="text-primary">Login here!</span></Link></h6>
          <button className="btn btn-primary font-weight-semi-bold py-2 px-3 mt-3" type="submit" onClick={onSubmit}>
            Register
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register