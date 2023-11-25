import React, { useState } from 'react'
import  {useNavigate} from 'react-router-dom'
function Login(props) {
const {handleAlert}=props
const [credential, setCredential]=useState({email:'',password:''})
let navigate = useNavigate()


   const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'content-Type': 'application/json',
            },
            body:JSON.stringify({email:credential.email , password:credential.password})
        });
        const json = await response.json()
      if(json.success){
        localStorage.setItem('token',json.token)
        handleAlert(json.msg,"success")
        navigate("/")
      }else{
           handleAlert(json.msg,"danger")
           navigate("/")
      }
    }

    const handleChange=(e)=>{
        setCredential({...credential,[e.target.name]:e.target.value})
       
       
    }
    return (
        <>
            <div className='container'>
                <div className='row my-5'>
                    <div className='text-center'>
                        <h1>Login</h1>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-3'></div>
                    <div className='col-md-6'>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                <input type="email" className="form-control" name='email' onChange={handleChange} value={credential.email} id="exampleInputEmail1" aria-describedby="emailHelp" />
                                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                <input type="password" className="form-control" name='password' onChange={handleChange} value={credential.password} id="exampleInputPassword1" />
                            </div>
                            <button type="submit" disabled={localStorage.getItem('token')} className="btn btn-primary" >Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
