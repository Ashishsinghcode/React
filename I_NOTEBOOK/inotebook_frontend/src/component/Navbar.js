import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
    Link
} from "react-router-dom";
export default function Navbar(props) {
    const {handleAlert}= props
    let location = useLocation();
    let navigate = useNavigate();

    React.useEffect(() => {
       
    }, [location]);

   const handleLogout=(e)=>{
    e.preventDefault();
    localStorage.removeItem('token')
    if(!localStorage.getItem('token')){
        handleAlert("Logout Successfully","success")
        navigate("/login")
    }

   }
       return (
        <>
            <nav className="sticky-top navbar navbar-expand-lg navbar-dark bg-dark">
                <Link className="navbar-brand mx-2" to="/">iNotebook</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link className={`nav-item nav-link ${location.pathname==="/"?'active':""}`} to="/">Home</Link>
                        <Link className={`nav-item nav-link ${location.pathname==="/about"?'active':""}`} to="/about">About</Link>
                        {/* <Link className="nav-item nav-link" to="/">Pricing</Link>
                        <Link className="nav-item nav-link disabled" to="/">Disabled</Link> */}
                    </div>
                </div>
                <form className='d-flex'>
                    {localStorage.getItem('token')? <Link className='btn btn-primary mx-2' onClick={handleLogout} role='button'>Logout</Link> : <Link className='btn btn-primary mx-2'  to="/login" role='button'>Login</Link>}
                   
                    <Link hidden={localStorage.getItem('token')} className='btn btn-primary mx-2' to="/signup" role='button'>Signup</Link>
                </form>
            </nav>
        </>
    )
}
