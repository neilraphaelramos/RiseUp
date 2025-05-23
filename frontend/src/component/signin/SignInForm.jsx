import React, { useState, useRef, useEffect } from 'react';
import crosslogo from './../../assets/images/icons/cross.png'
import { TfiEmail } from "react-icons/tfi";
import { CiLock, CiMail } from "react-icons/ci";
import { FaGoogle } from "react-icons/fa";
import { RiAccountCircleLine } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup, sendPasswordResetEmail } from 'firebase/auth';
import { authUser, googleProvider, db } from '../../../backend/config/firebase';
import { setDoc, doc, getDoc } from 'firebase/firestore';

function SignInForm() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLgoin, setIsLogin] = useState(false);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);


    //sigin to email & password
    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLogin(true);

        try {
            await signInWithEmailAndPassword(authUser, email, password);
            navigate('/dashboard');
        } catch (err) {
            setIsLogin(false);
            setPassword("");
            console.error("Login Error: ", err.message);

            //Set input red color if incorrect Credentials
            if (emailRef.current) {
                emailRef.current.style.border = "2px solid red";
            }
            if (passwordRef.current) {
                passwordRef.current.style.border = "2px solid red";
            }
        }
    }

    //reset input color
    const handleInputChange = (setter, ref) => (e) => {
        setter(e.target.value);
        if (ref.current) {
            emailRef.current.style.border = "none";
            passwordRef.current.style.border = "none";
        }
    };

    //sigin with google
    const handleLoginWithGoogle = async () => {
        try {
            const usergooglecredentials = await signInWithPopup(authUser, googleProvider);
            const userdata = usergooglecredentials.user;
            const googleusername = userdata.email.split('@')[0];
            const googlename = userdata.email.split('@')[0];

            const userRef = doc(db, "users_info", userdata.uid);
            const userSnap = await getDoc(userRef);

            if (!userSnap.exists()) {
                await setDoc(userRef, {
                    email: userdata.email,
                    username: googleusername,
                    fullname: googlename,
                    municipality: null,
                    parish: null,
                    createdAt: new Date(),
                });
            }

            navigate('/dashboard');
        } catch (err) {
            console.error("Google Sign-In Error: ", err.message);
        }
    };

    //reset sequences process
    const handleResetPassword = () => {
        if (email.trim() !== "") {
            sendPasswordResetEmail(authUser, email)
                .then(() => {
                    navigate("/forget-password/verification-message");
                })
                .catch((err) => {
                    console.error("Reset Password Error: ", err.message);
                });
        } else {
            navigate("/forget-password");
        }
    }

    return (
        <div className='container-login'>
            <form className='formbox-login' onSubmit={handleLogin}>
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
                    <div className='input-login'>
                        <div className='formgroup-input'>
                            <TfiEmail className='groupicon' />
                            <input
                                className='txt-input'
                                placeholder='Email'
                                type='text'
                                value={email}
                                onChange={handleInputChange(setEmail, emailRef)}
                                ref={emailRef}
                            />
                        </div>
                        <div className='formgroup-input'>
                            <CiLock className='groupicon' />
                            <input
                                className='txt-input'
                                placeholder='Password'
                                type='password'
                                value={password}
                                onChange={handleInputChange(setPassword, passwordRef)}
                                ref={passwordRef}
                            />
                        </div>
                        <div className='forget-pass'>
                            <a className='forgetpass-link'
                                type='button'
                                onClick={handleResetPassword}>
                                Forgot password?
                            </a>
                        </div>
                        <div className='formbutton'>
                            <button
                                className='btn-input'
                                type='submit'
                                disabled={isLgoin}
                            >
                                {isLgoin ? "Logging in..." : "Login"}
                            </button>
                        </div>
                        <div className='guest-create'>
                            <a
                                className='asguest'
                                type='button'
                                onClick={() => navigate('/dashboard')}
                                title='Sign In as Guest'
                            >
                                <RiAccountCircleLine className='account-guest-icon' />
                            </a>
                            <a
                                className='signwithgoogle'
                                type='button'
                                onClick={handleLoginWithGoogle}
                                title='Sign In with Google'
                            >
                                <FaGoogle className='account-google-icon' />
                            </a>
                            <a
                                className='createacc'
                                onClick={() => navigate('/registration')}
                                title='Create Account'
                            >
                                <CiMail className='create-account-icon' />
                            </a>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;