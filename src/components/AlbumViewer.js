import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../styles/AlbumViewer.css';

const AlbumViewer = ({ getCookie, setHeadBtnTxt, showAlert }) => {
    const [albumData, setAlbumData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        checkCookie();
    }, [])

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
        <div className="album-view-container">
            <div className="album-view-wrapper">
                <div className="sections section-one">Section 1</div>
                <div className="sections section-two">Section 2</div>
                <div className="sections section-three">Section 3</div>
            </div>
        </div>
    )
}

export default AlbumViewer;