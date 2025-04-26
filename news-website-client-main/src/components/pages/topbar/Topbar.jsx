import React from 'react';
import { formatDate } from '../../../utilities/utils';
import { useAuth } from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';


const Topbar = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    return (
        <div className="topbar container-fluid">
            <div className="row align-items-center bg-light px-lg-5"  style={{ height: "40px"}}>
                <div className="col-12 col-md-8">
                    <div className="d-flex justify-content-between">
                        <div className="owl-carousel owl-carousel-1 tranding-carousel position-relative d-inline-flex align-items-center ml-3" style={{ width: "calc(100% - 100px)", paddingLeft: "90px" }}>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 text-right d-none d-md-block">
                    {
                        !user && 
                        <button onClick={() => navigate("/login")} className={`btn btn-primary mr-3`}>Login</button>
                    }
                    { formatDate(new Date()) }
                </div>
            </div>
            <div className="row align-items-center py-2 px-lg-5">
                <div className="col-lg-4">
                    <a href="/home" className="navbar-brand d-none d-lg-block">
                        <h1 className="m-0 display-5 text-uppercase"><span className="text-primary">News</span>Room</h1>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Topbar