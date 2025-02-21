import React, { useState } from 'react';
import { IoChevronBack, IoEyeOutline, IoEyeSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

function SignUpForm() {
    const navigate = useNavigate();
    const [showpass, setShowPass] = useState(false);
    const [showrepass, setShowRePass] = useState(false);

    return (
        <div className='container-register'>
            <div className='formbox-register'>
                <div className='fillbox'>
                    <div className='registration-tab'>
                        <h2>
                            ACCOUNT REGISTRATION
                        </h2>
                        <IoChevronBack className='btn-back' onClick={() => navigate('/')} />
                    </div>
                    <form className='input-register'>
                        <div className='formgroup-input'>
                            <input className='txt-input' placeholder='Email' type='text' />
                        </div>
                        <div className='formgroup-input'>
                            <input className='txt-input' placeholder='Full Name' type='text' />
                        </div>
                        <div className='formgroup-input'>
                            <input className='txt-input' placeholder='Username' type='text' />
                        </div>
                        <div className='formgroup-input'>
                            <input className='txt-input' placeholder='Password' type={showpass ? 'text' : 'password'} />
                            <button
                                type='button'
                                className='toggle-password'
                                onClick={() => setShowPass(!showpass)}
                            >
                                {showpass ? <IoEyeSharp /> : <IoEyeOutline />}
                            </button>
                        </div>
                        <div className='formgroup-input'>
                            <input className='txt-input' placeholder='Repeat Password' type={showrepass ? 'text' : 'password'} />
                            <button
                                type='button'
                                className='toggle-password'
                                onClick={() => setShowRePass(!showrepass)}
                            >
                                {showrepass ? <IoEyeSharp /> : <IoEyeOutline />}
                            </button>
                        </div>
                        <div className='checkboxgroup'>
                            <input className='cb-confirm' type='checkbox' />
                            <label>I have agreed to the Terms and Conditions</label>
                        </div>
                        <div className='formbutton'>
                            <button
                                className='btn-input'
                                type='button'>
                                Create Account
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignUpForm