import React from 'react'
import { useAuth } from '../../../hooks/useAuth';
import UserDefaultImg from "../../../assets/img/user.jpg"
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const { user, clearUser, clearToken } = useAuth();
    const pathname = useLocation().pathname;

    const [keyword, setKeyword] = useState("");
	const navigate = useNavigate();

    const onLogout = () => {
        clearUser();
        clearToken();
    }

    const onSearch = (e) => {
    }

    return (
        <nav className="navbar navbar-expand-lg bg-light navbar-light py-2 py-lg-0 px-lg-5">
            <a href="/home" className="navbar-brand d-block d-lg-none">
                <h1 className="m-0 display-5 text-uppercase"><span className="text-primary">News</span>Room</h1>
            </a>
            <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-between px-0 px-lg-3" id="navbarCollapse">
                <div className="navbar-nav mr-auto py-0">
                    <a href="/home" className={`nav-item nav-link ${ pathname.includes("/home") ? 'active' : '' }`}>Home</a>
                    <a href="/category/list" className={`nav-item nav-link ${ pathname.includes("/category/list") ? 'active' : '' }`}>Categories</a>
                    { user && 
                        <a href="/news/create" className={`nav-item nav-link ${ pathname.includes("/news/create") ? 'active' : '' }`}>Create news</a>
                    }
                    { user && 
                        <div className="nav-item dropdown d-flex align-items-center ml-3">
                            <img src={ user.avatar ?? UserDefaultImg} data-toggle="dropdown" className="cursor-pointer" style={{ width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover"}}/>
                            <div className="dropdown-menu rounded-0 m-0">
                                <div className="dropdown-item">
                                    <h4>{ user.username }</h4>
                                    <h6>{ user.email } </h6>
                                </div>
                                <a href="/profile" className="dropdown-item">Update profile</a>
                                <span className="dropdown-item" onClick={onLogout}>Logout</span>
                            </div>
                        </div>
                    }
                    {
                        !user && 
                        <a href="/login" className={`nav-item nav-link ${ pathname.includes("/login") || pathname.includes("/register") ? 'active' : '' }`}>Login</a>
                    }
                </div>
                <div className="input-group ml-auto" style={{ width: "100%", maxWidth: "300px" }}>
                    <input type="text" className="form-control" placeholder="Keyword" 
                        onChange={
                            (e) => {
                                setKeyword(e.target.value);
                            }
                       }
                       onKeyDown={(e) => {
                            if (e.key == "Enter")
                            {
                                navigate(`/search?keyword=${keyword}`)
                            }
                       }}
                    />
                    <div className="input-group-append">
                        <button className="input-group-text text-secondary" onClick={() => navigate(`/search?keyword=${keyword}`)}><i
                                className="fa fa-search"></i></button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar