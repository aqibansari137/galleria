import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Register from './Register';
import '../styles/Login.css'

const Login = ({ showAlert, setHeadBtnTxt, setCookieWithTimer }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [registeredData, setRegisteredData] = useState([]);

    const navigate = useNavigate();

    // fetching data from 
    useEffect(() => {
        let response = localStorage.getItem("userData") ? localStorage.getItem("userData") : [];
        setRegisteredData(response.length === 0 ? response : JSON.parse(response));
        document.title = "Galleria"
    }, [])

    // Adding data to localstorage
    useEffect(() => {
        localStorage.setItem("userData", JSON.stringify(registeredData));
    }, [registeredData])

    const clearForm = () => {
        setEmail("")
        setPassword("")
    }

    const loginUser = (e) => {
        e.preventDefault();
        if (email === "" || password === "") {
            showAlert("Fields can't be empty", "error");
        }
        else {

            let foundUser = registeredData.find(obj => {
                return obj.email === email;
            });
            if (foundUser) {
                if (foundUser.password === password) {
                    showAlert("Login Successfull!", "success");
                    clearForm();
                    setHeadBtnTxt("Log Out");
                    setCookieWithTimer("isLoggedIn", true, 3600);
                    navigate("/home");
                }
                else {
                    showAlert("Incorrect Password!", "error");
                }
            }
            else {
                showAlert("User not Registered! Please Register!", "error");
            }
        }
    }

    return (
        <div className='comp-container'>
            <div className='login-wrapper row justify-content-center'>
                <div className='left-col col'>
                    <div className='login-form'>
                        <h1 className='mb-3'>Login</h1>
                        <form onSubmit={loginUser}>
                            <input type="email" placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)} />
                            <input type="password" placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)} />
                            <button className='btn-cls'>Login</button>
                        </form>
                    </div>
                </div>
                <div className='middle-col col'>
                    <div className='text-content'>
                        <p>Welcome to <span className='green-text'>Galleria</span>, where art comes to life in pixels and colors! Our virtual gallery space is a digital sanctuary for creativity, a haven where the extraordinary meets the imaginative. As you step into our online realm, prepare to embark on a visual journey that transcends boundaries and transports you to the heart of artistic expression.</p>
                    </div>
                </div>
            </div>
            <div className='register-wrapper'>
                <Register registeredData={registeredData} setRegisteredData={setRegisteredData} showAlert={showAlert} />
            </div>
        </div>
    );
}
export default Login;
