import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Signup(props) {
    const { handleAlert } = props
    const [details, setDetails] = useState({ name: '', email: '', password: '', confirmPassword: '' })
    let navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (details.password === details.confirmPassword) {
            const response = await fetch("http://localhost:5000/api/auth/createuser", {
                method: 'POST',
                headers: {
                    'content-Type': 'application/json'
                },
                body: JSON.stringify({ name: details.name, email: details.email, password: details.password })
            });
            const json = await response.json()
            console.log(json)
            if (json.success) {
                localStorage.setItem('token', json.token)
                handleAlert(json.msg, "success")
                navigate("/login")
            } else {
                handleAlert(json.msg, "danger")
            }
        } else {
            handleAlert("Password and Confirm Password not matched", "danger")
        }
    }

    const handleChange = (e) => {
        setDetails({ ...details, [e.target.name]: e.target.value })


    }
    return (
        <>
            <div className='container'>
                <div className='row my-5'>
                    <div className='text-center'>
                        <h1>Sign Up</h1>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-3'></div>
                    <div className='col-md-6'>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="exampleInputName1" className="form-label">Name</label>
                                <input type="text" className="form-control" name='name' onChange={handleChange} value={details.name} id="exampleInputName1" aria-describedby="nameHelp" required/>
                                <div id="nameHelp" className="form-text">We'll never share your email with anyone else.</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                <input type="email" className="form-control" name='email' onChange={handleChange} value={details.email} id="exampleInputEmail1" aria-describedby="emailHelp" required />
                                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                <input type="password" className="form-control" name='password' onChange={handleChange} value={details.password} id="exampleInputPassword1" minLength={5} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputConfirmPassword1" className="form-label">Confirm Password</label>
                                <input type="password" className="form-control" name='confirmPassword' onChange={handleChange} value={details.confirmPassword} id="exampleInputConfirmPassword1" minLength={5} required/>
                            </div>
                            <button type="submit" className="btn btn-primary" >Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup
