import React, { useState } from 'react'

export default function Register({ registeredData, setRegisteredData, showAlert }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [dob, setDob] = useState("");
    const [password, setPassword] = useState("");
    const [mobile, setMobile] = useState("");

    const registerUser = (e) => {
        e.preventDefault();
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
    const clearForm = () => {
        setName("")
        setEmail("")
        setDob("")
        setPassword("")
        setMobile("")
    }

    return (
        <div>
            <div className='register-form'>
                <h1 className='mb-3'>Register</h1>
                <form onSubmit={registerUser}>
                    <input type="text" placeholder='Enter name' value={name} onChange={(e) => setName(e.target.value)} />
                    <input type="email" placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="number" placeholder='Enter mobile number' value={mobile} onChange={(e) => setMobile(e.target.value)} />
                    <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
                    <input type="password" placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button className='btn-cls btn-red' disabled={name === "" || email === "" || mobile === "" || dob === "" || password === ""}>Register</button>
                </form>
            </div>
        </div>
    )
}
