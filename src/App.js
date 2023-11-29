import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { useState } from 'react';
import Alert from './components/Alert';
import AlbumViewer from './components/AlbumViewer';

function App() {
  const [alertMsg, setAlertMsg] = useState("");
  const [alertType, setAlertType] = useState("alert-success");
  const [headBtnTxt, setHeadBtnTxt] = useState("Register");

  const setCookieWithTimer = (cookieName, cookieValue, cookieExpiry) => {
    const d = new Date();
    d.setTime(d.getTime() + cookieExpiry * 1000);
    const expiry = "expires=" + d.toUTCString();
    document.cookie = cookieName + "=" + cookieValue + ";" + expiry + ";path=/";
  }
  const getCookie = (cookieName) => {
    const name = cookieName + "=";
    const decodeCookie = decodeURIComponent(document.cookie);
    const cookieArr = decodeCookie.split(";");
    for (let i = 0; i < cookieArr.length; i++) {
      let cookie = cookieArr[i].trim();
      if (cookie.indexOf(name) === 0) {
        return cookie.substring(name.length, cookie.length);
      }
    }
    return null;
  }

  const showAlert = (msg, type) => {
    setAlertMsg(msg)
    setAlertType(type)
    setTimeout(() => {
      let alertEle = document.querySelector(".alert-wrapper .display-alert");
      alertEle.classList.add("show-alert");
      setTimeout(() => {
        alertEle.classList.remove("show-alert");
      }, 3000)
    }, 300)
  }
  return (
    <div className="App">
      <BrowserRouter>
        <Alert message={alertMsg} type={alertType} />
        <Header headBtnTxt={headBtnTxt} setHeadBtnTxt={setHeadBtnTxt} showAlert={showAlert} setCookieWithTimer={setCookieWithTimer} getCookie={getCookie} />
        <Routes>
          <Route path='/' element={<Login showAlert={showAlert} setHeadBtnTxt={setHeadBtnTxt} setCookieWithTimer={setCookieWithTimer} />} exact />
          <Route path='/home' element={<Dashboard showAlert={showAlert} getCookie={getCookie} setHeadBtnTxt={setHeadBtnTxt} />} />
          <Route path='/view/album/:id' element={<AlbumViewer showAlert={showAlert} getCookie={getCookie} setHeadBtnTxt={setHeadBtnTxt} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
