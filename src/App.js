import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { useState } from 'react';
import Alert from './components/Alert';

function App() {
  const [alertMsg, setAlertMsg] = useState("");
  const [alertType, setAlertType] = useState("alert-success");
  const [headBtnTxt, setHeadBtnTxt] = useState("Register");

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
        <Header headBtnTxt={headBtnTxt} setHeadBtnTxt={setHeadBtnTxt} showAlert={showAlert} />
        <Routes>
          <Route path='/' element={<Login showAlert={showAlert} setHeadBtnTxt={setHeadBtnTxt} />} exact />
          <Route path='/home' element={<Dashboard />} exact />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
