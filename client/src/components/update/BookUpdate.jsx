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
import './bookupdate.css';
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BookUpdate = ({ setOpen, bookid }) => {
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
    const [bookImage, setBookImage] = useState();
    const apiUrl = process.env.REACT_APP_API_URL;

    const navigate = useNavigate();

    // 나가기 버튼 클릭 했을 때
    const exitClick = () => {
        setOpen(false);
    }

    // bookid에 해당하는 책 정보 불러오기
    useEffect(() => {
        const fetchBook = async () => {
            try {
                const res = await axios.get(`${apiUrl}/books/${bookid}`, { withCredentials: true });
                setBookData(res.data);
                setBookImage(res.data.image);
            } catch (err) {
                alert("책정보를 가져오는데에 실패했습니다.");
                console.log(err);
            }
        }
        fetchBook();
    }, [])

    // 저장 버튼 누르면 책 정보를 업데이트
    const saveClick = async () => {
        try {
            const update = await axios.put(`${apiUrl}/books/${bookid}`, bookData, { withCredentials: true });
            setOpen(false);
            navigate('/book');
        } catch (err) {
            alert("업데이트하는데 실패했습니다.")
            console.log(err);
        }
    }

    // 이미지 바꾸면 바꾼 이미지 저장
    const ImageChange = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);

        try {
            const res = await axios.put(`${apiUrl}/books/update/${bookid}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }, { withCredentials: true });
            setBookData((prev) => ({...prev, image: res.data.user.image}));
            setBookImage(res.data.user.image);
        } catch (err) {
            alert("이미지 가져오는데에 실패했습니다.");
            console.log(err);
        }
    }

    const handleChange = (e) => {
        const { id, value } = e.target;
        setBookData((prev) => ({
            ...prev,
            [id]: value
        }));
    }

    const availabilityClick = () => {
        setBookData((prev) => ({
            ...prev,
            availability: !prev.availability
        }))
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
                            <label>책이미지</label>
                            <img src={`${process.env.REACT_APP_API_IMAGE_URL}${bookImage}`}></img>
                            <div><input type="file" onChange={ImageChange}></input></div>
                        </div>
                        <div className='bu-right'>
                            <div><label for='title'>제목</label><input type="text" id="title" value={bookData.title} onChange={handleChange}></input></div>
                            <div><label for='author'>저자</label><input type="text" id="author" value={bookData.author} onChange={handleChange}></input></div>
                            <div><label for='publisher'>출판사</label><input type="text" id="publisher" value={bookData.publisher} onChange={handleChange}></input></div>
                            <div><label for='releaseDate'>출판날짜</label><input type="text" id="releaseDate" value={bookData.releaseDate} onChange={handleChange}></input></div>
                            <div><label for='arrivalDate'>도착날짜</label><input type="text" id="arrivalDate" value={bookData.arrivalDate} onChange={handleChange}></input></div>
                            <div><label for='own'>소장처</label><input type="text" id="own" value="모블도서관"></input></div>
                            <div><label for='location'>도서위치</label><input type="text" id="location" value={bookData.location} onChange={handleChange}></input></div>
                            <div><label for='availability'>대출상태</label>
                                <button id="availability" onClick={availabilityClick}>{(bookData.availability === true) ? '대출가능' : '대출중'}</button>
                            </div>
                            <div><label for='page'>페이지수</label><input type="text" id="page" value={bookData.page} onChange={handleChange}></input></div>
                            <div><label for='description'>책소개</label><input type="text" id="description" value={bookData.description} onChange={handleChange}></input></div>
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

export default BookUpdate;