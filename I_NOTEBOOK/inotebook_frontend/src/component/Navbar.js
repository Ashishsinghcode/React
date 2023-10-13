import React from 'react'
import { useLocation } from 'react-router-dom'
import {
    Link
} from "react-router-dom";
export default function Navbar() {
    let location = useLocation();

    React.useEffect(() => {
       
    }, [location]);
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
            </nav>
        </>
    )
}
