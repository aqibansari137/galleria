import React, { useEffect, useState } from 'react';
import '../styles/Login.css'
import { useNavigate } from 'react-router-dom';
const Login = ({ showAlert, setHeadBtnTxt, setCookieWithTimer }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [dob, setDob] = useState("");
    const [password, setPassword] = useState("");
    const [mobile, setMobile] = useState("");
    const [registeredData, setRegisteredData] = useState([]);

    const navigate = useNavigate();

    // fetching data from 
    useEffect(() => {
        let response = localStorage.getItem("userData") ? localStorage.getItem("userData") : [];
        setRegisteredData(response.length === 0 ? response : JSON.parse(response));
    }, [])

    // Adding data to localstorage
    useEffect(() => {
        localStorage.setItem("userData", JSON.stringify(registeredData));
    }, [registeredData])

    const clearForm = () => {
        setName("")
        setEmail("")
        setDob("")
        setPassword("")
        setMobile("")
    }

    const loginUser = () => {
        if(email==="" || password === ""){
            showAlert("Fields can't be empty", "error");
        }
        else{

            let foundUser = registeredData.find(obj => {
                return obj.email === email;
            });
            if (foundUser) {
                if (foundUser.password === password) {
                    showAlert("Login Successfull!", "success");
                    clearForm();
                    setHeadBtnTxt("Log Out");
                    setCookieWithTimer("isLoggedIn",true,3600);
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

    const registerUser = () => {
        let foundUser = registeredData.find(obj => {
            return obj.email === email;
        });

        if (foundUser) {
            showAlert(`Email ${email} Already Registered!`, "error");
            clearForm();
        }
        else {
            const userDetail = {
                name, email, mobile, dob, password
            }
            setRegisteredData([...registeredData, userDetail])
            showAlert("Registration Successfull!", "success");
            clearForm();
        }
    }

    return (
        <div className='comp-container'>
            <div className='login-wrapper row justify-content-center'>
                <div className='left-col col'>
                    <div className='login-form'>
                        <h1 className='mb-3'>Login</h1>
                        <form onSubmit={(e) => { e.preventDefault() }}>
                            <input type="email" placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)} />
                            <input type="password" placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)} />
                            <button className='btn-cls' onClick={loginUser}>Login</button>
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
                <div className='register-form'>
                    <h1 className='mb-3'>Register</h1>
                    <form onSubmit={(e) => { e.preventDefault() }}>
                        <input type="text" placeholder='Enter name' value={name} onChange={(e) => setName(e.target.value)} />
                        <input type="email" placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input type="number" placeholder='Enter mobile number' value={mobile} onChange={(e) => setMobile(e.target.value)} />
                        <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
                        <input type="password" placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)} />
                        <button className='btn-cls btn-red' onClick={registerUser} disabled={name === "" || email === "" || mobile === "" || dob === "" || password === ""}>Register</button>
                    </form>
                </div>
            </div>

        </div>
    );
}
export default Login;
