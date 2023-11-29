import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ImageGalleryComp from 'react-image-gallery';
import loaderGif from "../assets/doggy.gif";
import axios from "axios";
import '../styles/AlbumViewer.css';

const AlbumViewer = ({ getCookie, setHeadBtnTxt, showAlert }) => {
    const [selectedAlbum, setSelectedAlbum] = useState([]);
    const [imageGallery, setImageGallery] = useState([]);
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        checkCookie();
    }, [])

    useEffect(() => {
        createImageGallery();
    }, [selectedAlbum]);

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
            setSelectedAlbum(currData[params.id]);
        } catch (error) {
            console.log(error);
        }
    }

    const createImageGallery = () => {
        let newArr = []
        selectedAlbum.map(item => {
            newArr = [...newArr, {
                original: `https://picsum.photos/id/${item.id}/1000/600/`,
                thumbnail: `https://picsum.photos/id/${item.id}/250/150/`,
            }];
        });
        setImageGallery(newArr);
    }

    return (
        <div className="album-view-container">
            <div className="album-view-wrapper">
                <div className="sections section-one"><i onClick={() => navigate(-1)} className="bi bi-arrow-left-short"></i><h1>Image Viewer</h1></div>
                <div className="sections section-three">
                    {
                        imageGallery.length !== 0 ?
                            <ImageGalleryComp items={imageGallery} />
                            :
                            <p><img src={loaderGif} alt="loader" /></p>
                    }
                </div>
            </div>
        </div >
    )
}

export default AlbumViewer;