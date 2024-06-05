import {
    faHouse,
    faBook,
    faUser,
    faX,
    faPen,
    faTrash,
    faPlus
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import searchicon from "../../images/search-icon.png";
import './admin.css';
import { useEffect, useState } from "react";
import axios from "axios";
import BookUpdate from "../../components/update/BookUpdate";
import BookAdd from "../../components/add/BookAdd";
import { Navigate, useNavigate } from "react-router-dom";
import Logo from "../../images/logo-1.png";

const BookManage = () => {
    const [bookData, setBookData] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [openAddModal, setOpenAddModal] = useState(false);
    const [selectBookId, setSelectBookId] = useState();
    const [searchWord, setSearchWord] = useState('');
    const apiUrl = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();

    // 도서 정보 불러오기
    useEffect(() => {
        const fetchBook = async () => {
            try {
                const res = await axios.get(`${apiUrl}/books`, { withCredentials: true });
                setBookData(res.data);
            } catch (err) {
                alert("정보를 가져오는 데에 실패했습니다.");
                console.log(err);
            }
        };
        fetchBook();
    }, [searchWord, openModal, openAddModal]);

    // 수정 버튼 클릭했을 때
    const updateClick = async (bookid) => {
        try {
            setSelectBookId(bookid);
            setOpenModal(true);
        } catch (err) {
            alert("정보를 가져오는 데에 실패했습니다.");
            console.log(err);
        }
    }

    // 검색 버튼 클릭 했을 때
    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.get(`${apiUrl}/books/search?title=${searchWord}`);
            setBookData(res.data);
            console.log(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch(e);
        }
    }

    // 추가 버튼 클릭 했을 때
    const addClick = () => {
        try {
            setOpenAddModal(true);
        } catch (err) {
            console.log(err);
        }
    }

    // 삭제 버튼 클릭 했을 때
    const deleteClick = async (bookid) => {
        let result = window.confirm("정말 삭제하시겠습니까?");
        if (result) {
            try {
                const res = await axios.delete(`${apiUrl}/books/${bookid}`, { withCredentials: true });
                alert("삭제되었습니다.");
            } catch (err) {
                alert("삭제하는데 실패했습니다.");
                console.log(err);
            }
        } else {
            navigate('/book');
        }

    }

    return (
        <div className="admin">
            <div className="admin-left">
            <img className="admin-menu-logo" src={Logo}></img>
                <a href="/book" className="admin-menu-a"><FontAwesomeIcon icon={faBook} className="admin-icon" />도서 관리</a>
                <a href="/user" className="admin-menu-a"><FontAwesomeIcon icon={faUser} className="admin-icon" />사용자 관리</a>
            </div>

            <div className="admin-center">
                <div className="admin-center-top"><FontAwesomeIcon icon={faX} className="admin-exit-icon" onClick={() => navigate('/')} /></div>

                <div className="admin-search-bg">
                    <div className="admin-search-input">
                        <input type="text" placeholder="검색할 도서를 적어주세요" className="admin-input" value={searchWord} onChange={(e) => setSearchWord(e.target.value)} onKeyDown={handleKeyPress}></input>
                        <button className='admin-input-button' onClick={handleSearch}><img src={searchicon} /></button>
                    </div>
                </div>
                <div className="admin-container">
                    <div className="admin-info-bg">

                        <table className="admin-table">
                            <colgroup>
                                <col style={{ width: '30%' }} />
                                <col style={{ width: '15%' }} />
                                <col style={{ width: '15%' }} />
                                <col style={{ width: '15%' }} />
                                <col style={{ width: '15%' }} />
                                <col style={{ width: '5%' }} />
                                <col style={{ width: '5%' }} />
                            </colgroup>
                            <tr className="table-title">
                                <th className="table-title-th">책제목</th>
                                <th>저자</th>
                                <th>출판사</th>
                                <th>출판날짜</th>
                                <th>도착날짜</th>
                                <th></th>
                                <th></th>
                            </tr>
                            {(!bookData || bookData.length < 0) ? (
                                <tr className="table-content"><td colSpan="7">도서 정보가 없습니다.</td></tr>
                            ) : (
                                bookData.map((book, index) => (
                                    <tr className="table-content">
                                        <td className="content-title">{book.title}</td>
                                        <td>{book.author}</td>
                                        <td>{book.publisher}</td>
                                        <td>{book.releaseDate}</td>
                                        <td>{book.arrivalDate}</td>
                                        <td><FontAwesomeIcon icon={faPen} className="admin-icon" onClick={() => updateClick(book._id)} /></td>
                                        <td><FontAwesomeIcon icon={faTrash} className="admin-icon" onClick={() => deleteClick(book._id)} /></td>
                                    </tr>
                                )))}
                        </table>
                    </div>
                </div>
                <div className="admin-add">
                    <FontAwesomeIcon icon={faPlus} className="admin-add-icon" onClick={addClick} />
                </div>
            </div>
            {openModal && <BookUpdate setOpen={setOpenModal} bookid={selectBookId} />}
            {openAddModal && <BookAdd setOpen={setOpenAddModal} />}
        </div>
    );
};

export default BookManage;