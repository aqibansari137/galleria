import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
const Dashboard = ({getCookie,setHeadBtnTxt}) => {

    const [albumData,setAlbumData] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        checkCookie();
    },[])
    
    const checkCookie=()=>{
        const myCookieVal = getCookie("isLoggedIn");
        if(myCookieVal){
            console.log("Cookie isLoggedIn = " + myCookieVal);
            setHeadBtnTxt("Log Out");
            fetchData();
        }
        else{
            console.log("Cookie not found");
            navigate("/");
        }
    }

    const fetchData = async() =>{
        try {
            const response = await axios("https://picsum.photos/v2/list?page=1&limit=100");
            console.log(response.data);            
            setAlbumData(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            Dashboard
        </div>
    )
}

export default Dashboard;