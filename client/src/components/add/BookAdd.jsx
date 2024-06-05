import {
    faHouse,
    faBook,
    faUser,
    faX,
    faPen,
    faTrash
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import bookimage from "../../images/banner-1.png";
import './add.css';
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BookAdd = ({ setOpen, bookid }) => {
    const [selectedImage, setSelectedImage] = useState();
    const [bookData, setBookData] = useState({
        title: '',
        author: '',
        publisher: '',
        releaseDate: '',
        arrivalDate: '',
        location: '',
        availability: true,
        page: '',
        description: '',
        image: '',
    });
    const apiUrl = process.env.REACT_APP_API_URL;

    const navigate = useNavigate();

    // 나가기 버튼 클릭 했을 때
    const exitClick = () => {
        setOpen(false);
    }

    // 저장 버튼 누르면 책 정보를 업데이트
    const saveClick = async () => {
        try {
            const add = await axios.post(`${apiUrl}/books`, bookData, { withCredentials: true });
            navigate('/book');
            setOpen(false);
            console.log(add.data);
        } catch (err) {
            alert("추가하는데 실패했습니다.");
            console.log(err);
        }
    }

    const handleChange = (e) => {
        const { id, value } = e.target;
        setBookData((prev) => ({
            ...prev,
            [id] : value
        }));
        console.log(id , ": ", value);
        console.log(bookData);
    }

    // 이미지 업로드 핸들러
    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);

        try {
            const res = await axios.post(`${apiUrl}/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setBookData((prev) => ({
                ...prev,
                image: res.data.imageUrl // 서버에서 반환된 이미지 URL
            }));
            setSelectedImage(res.data.imageUrl); // 이미지 미리보기
        } catch (err) {
            console.log(err);
            alert('이미지 업로드에 실패했습니다.');
        }
    }

    return (
        <div className='bookupdate'>

            <div className='bu-container'>
                <div className="bu-top">
                    <FontAwesomeIcon icon={faX} className="admin-exit-icon" onClick={exitClick} />
                </div>
                {(!bookData || bookData.length < 0) ? (
                    <></>
                ) : (
                    <div className="bu-center">
                        <div className='bu-left'>
                            <label>책이미지</label><div className="bu-img-bg"><img src={bookData.image}></img></div><div><input type="file" id="image"></input></div>
                        </div>
                        <div className='bu-right'>
                            <div><label for='title'>제목</label><input type="text" id="title" onChange={handleChange}></input></div>
                            <div><label for='author'>저자</label><input type="text" id="author" onChange={handleChange}></input></div>
                            <div><label for='publisher'>출판사</label><input type="text" id="publisher" onChange={handleChange}></input></div>
                            <div><label for='releaseDate'>출판날짜</label><input type="text" id="releaseDate" onChange={handleChange}></input></div>
                            <div><label for='arrivalDate'>도착날짜</label><input type="text" id="arrivalDate" onChange={handleChange}></input></div>
                            <div><label for='location'>도서위치</label><input type="text" id="location" onChange={handleChange}></input></div>
                            <div><label for='page'>페이지수</label><input type="text" id="page" onChange={handleChange}></input></div>
                            <div><label for='description'>책소개</label><input type="text" id="description" onChange={handleChange}></input></div>
                        </div>
                    </div>
                )}
                <div className="bu-bottom">
                    <button onClick={saveClick}>저장</button>
                </div>
            </div>
        </div>
    );
};

export default BookAdd;