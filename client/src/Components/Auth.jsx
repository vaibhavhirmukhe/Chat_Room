import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';

import { Alerts } from './';

const cookies = new Cookies();

const initialState = {
    fullName : '',
    username : '',
    email : '',
    password : '',
    confirmPassword : '',
    phoneNumber : '',
    avatarURL: '', 
}

const Auth = () => {
    const [form, setForm] = useState(initialState);
    const [isSignup, setIsSignup] = useState(false);

    const [alert, setAlert] = useState(null);

    const showAlert=(message)=>{
      setAlert({
        msg:message,
      })
      setTimeout(() => {
        setAlert(null);
      }, 1500);
    }

    const switchMode = () =>{
        setIsSignup((prevIsSignup) => !prevIsSignup);
    }

    const handleChange = (e)=>{
        setForm({...form, [e.target.name]: e.target.value});
        // console.log(form);
    }

    const handleSubmit = async(e) =>{
        e.preventDefault();

        const { username, email, password, phoneNumber, avatarURL} = form;

        const URL = 'https://vichat-room.onrender.com/auth';
        
        const { data : { token, userId, hashedPassword, fullName}} = await axios.post(`${URL}/${isSignup ? 'signup' : 'login'}`, {
            fullName: form.fullName, username, email, password, phoneNumber, avatarURL,
        }).catch((error) => {
            // console.log(error.response);
            // window.alert(error.response.data.message);
            showAlert(error.response.data.message);
          });

        cookies.set('token', token);
        cookies.set('email', email);
        cookies.set('username', username);
        cookies.set('fullName', fullName);
        cookies.set('userId', userId);
        
        if(isSignup){
            cookies.set('phoneNumber', phoneNumber);
            cookies.set('avatarURL', avatarURL);
            cookies.set('hashedPassword', hashedPassword);
        }

        window.location.reload();
    }

  return (
    <>

    <Alerts alert={alert}/>
    <div className='auth__form-container'>
        <div className="auth__form-container_fields">
            <div className="auth__form-container_fields-content">
                <p>{isSignup? "Sign Up" : "Sign In"}</p>
                <form onSubmit={handleSubmit}>
                   
                        <div className="auth__form-container_fields-content_input">
                            <label htmlFor="username">Username</label>
                            <input 
                                name='username'
                                type='text'
                                placeholder='Username'
                                onChange={handleChange}
                                required
                            />
                        </div>
                    { isSignup && (
                        <div className="auth__form-container_fields-content_input">
                            <label htmlFor="fullName">Full Name</label>
                            <input 
                                name='fullName'
                                type='text'
                                placeholder='Full Name'
                                onChange={handleChange}
                                required
                            />
                        </div>
                    )}
                    <div className="auth__form-container_fields-content_input">
                        <label htmlFor="email">Email</label>
                        <input 
                            name='email'
                            type="email"
                            placeholder='Email'
                            onChange={handleChange}
                            required
                        />
                    </div>
                    { isSignup && (
                        <div className="auth__form-container_fields-content_input">
                            <label htmlFor="phoneNumber">Phone Number</label>
                            <input 
                                name='phoneNumber'
                                type="number"
                                placeholder='Phone Number'
                                onChange={handleChange}
                                required
                            />
                        </div>
                    )}
                    { isSignup && (
                        <div className="auth__form-container_fields-content_input">
                            <label htmlFor="avatarURL">Avatar URL</label>
                            <input 
                                name='avatarURL'
                                type="text"
                                placeholder='Avatar URL'
                                onChange={handleChange}
                                required
                            />
                        </div>
                    )}
                    <div className="auth__form-container_fields-content_input">
                        <label htmlFor="password">Password</label>
                        <input 
                            name='password'
                            type="password"
                            placeholder='Password'
                            onChange={handleChange}
                            required
                        />
                    </div>

                    { isSignup && (
                        <div className="auth__form-container_fields-content_input">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input 
                                name='confirmPassword'
                                type="password"
                                placeholder='Confirm Password'
                                onChange={handleChange}
                                required
                            />
                        </div>
                    )}
                    <div className="auth__form-container_fields-content_button">
                        <button>{isSignup ? "Sign Up" : "Sign In"}</button>
                    </div>
                </form>
                <div className='auth__form-container_fields-account'>
                    <p>
                        {isSignup ? "Already have an account?": "Don't have an account?"}
                        <span onClick={switchMode}>
                            {isSignup ? "Sign In" : "Sign Up"}
                        </span>
                    </p>
                </div>
            </div>
        </div>
        <div className="auth__form-container_image">
            <img src="https://www.targetfirst.com/wp-content/uploads/2021/03/clictochat-e1620817319308.png" alt="Sign In" />
        </div>
    </div>
    </>
  )
}

export default Auth;