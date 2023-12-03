import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';
import albumImg from "../assets/photo-album.png"
import cloverImg from "../assets/clover-icon.png"
import loaderGif from "../assets/doggy.gif";
const Dashboard = ({ getCookie, setHeadBtnTxt, showAlert }) => {
    const [albumData, setAlbumData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        checkCookie();
        document.title = "Dashboard | Galleria"
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
                    albumData.length !== 0 ?
                        albumData.map((item, index) => {
                            return <div className='items' key={item[index].id}>
                                <div className='album-wrapper' onClick={() => navigate(`/view/album/${index}`)}>
                                    <div className='album-with-img'>
                                        <div className='image-content bk'><img src={albumImg} width="100px" height="100px" alt="album book" /></div>
                                        <div className='image-content fr'><img src={item[1].download_url} width="150px" height="100px" alt="album book" /></div>
                                    </div>
                                    <div className='title-content'>
                                        <div>Album No {index + 1}</div>
                                        <div>Author: {item[1].author}</div>
                                    </div>
                                </div>
                            </div>
                        })
                        :
                        <p className='loader'><img src={loaderGif} alt="loader" /></p>
                }
            </div>
        </div>
    )
}

export default Dashboard;