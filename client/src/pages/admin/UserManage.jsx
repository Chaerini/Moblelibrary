import {
    faHouse,
    faBook,
    faUser,
    faX,
    faPen,
    faTrash
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import searchicon from "../../images/search-icon.png";
import './admin.css';
import { useEffect, useState } from "react";
import axios from "axios";
import UserUpdate from "../../components/update/UserUpdate";
import Logo from "../../images/logo-1.png";
import { useNavigate } from "react-router-dom";

const UserManage = () => {
    const [userData, setUserData] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [selectUserId, setSelectUserId] = useState();
    const [searchWord, setSearchWord] = useState();
    const apiUrl = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();

    // 사용자 정보가 업데이트 됐을 경우 렌더링
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`${apiUrl}/users`, { withCredentials: true });

                setUserData(res.data);
                console.log(userData);
            } catch (err) {
                console.log(err);
            }
        }
        fetchUser();
    }, [openModal, searchWord]);

    // 검색 버튼 클릭 했을 때
    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.get(`${apiUrl}/users/search?name=${searchWord}`);
            setUserData(res.data);
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

    // 수정 버튼 클릭 했을 때
    const updateClick = async (userid) => {
        try {
            setSelectUserId(userid);
            setOpenModal(true);
        } catch (err) {
            alert("정보를 가져오는 데에 실패했습니다.");
            console.log(err);
        }
    }

    // 삭제 버튼 클릭 했을 때
    const deleteClick = async (userid) => {
        let result = window.confirm("정말 삭제하시겠습니까?");
        if (result) {
            try {
                const res = await axios.delete(`${apiUrl}/users/${userid}`, { withCredentials: true });
                alert("삭제되었습니다.");
                navigate('/user');
            } catch (err) {
                alert("삭제하는데 실패했습니다.");
                console.log(err);
            }
        } else {
            navigate('/user');
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
                <div className="admin-center-top"><FontAwesomeIcon icon={faX} className="admin-exit-icon" onClick={() => navigate('/')}/></div>

                <div className="admin-search-bg">
                    <div className="admin-search-input">
                        <input type="text" placeholder="검색할 사용자 이름을 적어주세요" className="admin-input" onChange={(e) => setSearchWord(e.target.value)} onKeyDown={handleKeyPress}></input>
                        <button className='admin-input-button' onClick={handleSearch}><img src={searchicon} /></button>
                    </div>
                </div>

                <div className="admin-container">
                    <div className="admin-info-bg">

                        <table className="admin-table">
                            <colgroup>
                                <col style={{ width: '20%' }} />
                                <col style={{ width: '20%' }} />
                                <col style={{ width: '30%' }} />
                                <col style={{ width: '10%' }} />
                                <col style={{ width: '5%' }} />
                                <col style={{ width: '5%' }} />
                            </colgroup>
                            <tr className="table-title">
                                <th className="table-title-th">아이디</th>
                                <th>이름</th>
                                <th>전화번호</th>
                                <th>관리자여부</th>
                                <th></th>
                                <th></th>
                            </tr>


                            {(!userData || userData.length < 0) ? (
                                <tr className="table-content"><td colSpan="6">사용자 정보가 없습니다.</td></tr>
                            ) : (
                                userData.map((user, index) => (
                                    <tr className="table-content" key={index}>
                                        <td className="content-title">{user.username}</td>
                                        <td>{user.name}</td>
                                        <td>{user.phone}</td>
                                        <td>{user.isAdmin ? 'Yes' : 'No'}</td>
                                        <td><FontAwesomeIcon icon={faPen} className="admin-icon" onClick={() => updateClick(user._id)}/></td>
                                        <td><FontAwesomeIcon icon={faTrash} className="admin-icon" onClick={() => deleteClick(user._id)}/></td>
                                    </tr>
                                )))}

                        </table>


                    </div>
                </div>

            </div>
            {openModal && <UserUpdate setOpen={setOpenModal} userid={selectUserId} />}
        </div >
    );
};

export default UserManage;