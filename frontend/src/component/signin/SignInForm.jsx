import React, { useState } from 'react';
import crosslogo from './../../assets/images/icons/cross.png'
import { TfiEmail } from "react-icons/tfi";
import { CiLock } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';

function SignInForm() {
    const navigate = useNavigate();

    return (
        <div className='container-login'>
            <form className='formbox-login'>
                <div className='fillbox'>
                    <div className='logo-title-container'>
                        <img src={crosslogo} className='logo-img' />
                        <h2>
                            RiseUp
                        </h2>
                        <p>
                            - PATHWAY OF ENLIGTENHMENT -
                        </p>
                    </div>
                    <form className='input-login'>
                        <div className='formgroup-input'>
                            <TfiEmail className='groupicon' />
                            <input className='txt-input' placeholder='Email' type='text' />
                        </div>
                        <div className='formgroup-input'>
                            <CiLock className='groupicon' />
                            <input className='txt-input' placeholder='Password' type='password' />
                        </div>
                        <div className='forget-pass'>
                            <a className='forgetpass-link'>
                                Forgot password?
                            </a>
                        </div>
                        <div className='formbutton'>
                            <button
                                className='btn-input'
                                type='button'
                                onClick={() => navigate('/dashboard')}>
                                Login
                            </button>
                        </div>
                        <div className='guest-create'>
                            <a className='asguest'
                            type='button'
                            onClick={() => navigate('/dashboard')}>
                                Sign in as Guest
                            </a>
                            <a className='createacc' onClick={() => navigate('/registration')}>
                                Create Account
                            </a>
                        </div>
                    </form>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;