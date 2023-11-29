import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';
import albumImg from "../assets/photo-album.png"
import cloverImg from "../assets/clover-icon.png"
const Dashboard = ({ getCookie, setHeadBtnTxt, showAlert }) => {
    const [albumData, setAlbumData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        checkCookie();
    }, [])

    useEffect(() => {
        console.log(albumData);
    }, [albumData])

    const checkCookie = () => {
        const myCookieVal = getCookie("isLoggedIn");
        if (myCookieVal) {
            console.log("Cookie isLoggedIn = " + myCookieVal);
            setHeadBtnTxt("Log Out");
            fetchData();
        }
        else {
            console.log("Cookie not found");
            showAlert("Session Expired, Please Login Again!", "error");
            navigate("/");
        }
    }

    const fetchData = async () => {
        try {
            const response = await axios("https://picsum.photos/v2/list?page=1&limit=100");
            const responseData = response.data;
            let currData = [];
            for (let i = 0; i < responseData.length; i += 10) {
                currData = [...currData, responseData.slice(i, i + 10)];
            }
            setAlbumData(currData);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='dashboard-container'>
            <div className='gallery-header'>
                <img className='img-left' src={cloverImg} alt='clover leaf' />
                <img className='img-left' src={cloverImg} alt='clover leaf' />
                <img className='img-left' src={cloverImg} alt='clover leaf' />
                <h1>Dashboard</h1>
                <img className='img-right' src={cloverImg} alt='clover leaf' />
                <img className='img-right' src={cloverImg} alt='clover leaf' />
                <img className='img-right' src={cloverImg} alt='clover leaf' />
            </div>
            <div className='dashboard-wrapper'>
                {
                    albumData.map((item, index) => {
                        return <div className='items' key={item[index].id}>
                            <div className='album-wrapper' onClick={() => navigate(`/view/album/${index}`)}>
                                <div className='image-content'><img src={albumImg} width="100px" height="100px" alt="album book" /></div>
                                <div className='title-content'>Album No {index + 1}</div>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default Dashboard;