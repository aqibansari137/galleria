import React from 'react';
import { useNavigate } from 'react-router-dom'
import cloverIcon from '../assets/clover-icon.png'
import '../styles/Header.css'

const Header = ({ headBtnTxt, setHeadBtnTxt, showAlert, setCookieWithTimer }) => {

    const navigate = useNavigate();

    const showRegister = () => {
        let logEle = document.querySelector(".login-wrapper");
        let regEle = document.querySelector(".register-form");
        if (headBtnTxt === "Register") {
            setHeadBtnTxt("Login");
            logEle.classList.add("log-slide");
            regEle.classList.add("reg-slide");
        }
        else if (headBtnTxt === "Login") {
            setHeadBtnTxt("Register");
            logEle.classList.remove("log-slide");
            regEle.classList.remove("reg-slide");
        }
        else if (headBtnTxt === "Log Out") {
            setHeadBtnTxt("Register");
            showAlert("Logged out Successfully!", "success");
            setCookieWithTimer("isLoggedIn",false,1);
            navigate("/");
        }
    }

    return (
        <div className="header-container">
            <div className="header-wrapper">
                <img src={cloverIcon} alt="logo" width="50px" height="50px" />
                <p>Galleria</p>
            </div>
            <div className='userLogin'>
                <button className='btn-cls btn-black' onClick={showRegister}>{headBtnTxt}<i className={headBtnTxt === "Log Out" ? "bi bi-arrow-bar-right ms-1" : "bi bi-person-fill ms-1"}></i></button>
            </div>
        </div>
    )
}

export default Header;