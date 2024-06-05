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
import './userupdate.css';
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserUpdate = ({ setOpen, userid }) => {
    const [userData, setUserData] = useState({
        username: '',
        name: '',
        phone: '',
        isAdmin: false,
    });
    const apiUrl = process.env.REACT_APP_API_URL;
    console.log(userid);

    const navigate = useNavigate();

    // 나가기 버튼 클릭 했을 때
    const exitClick = () => {
        setOpen(false);
    }

    // userid에 해당하는 도서 정보 불러오기
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`${apiUrl}/users/${userid}`, { withCredentials: true });
                setUserData(res.data);
            } catch (err) {
                alert("사용자 정보를 가져오는데에 실패했습니다.");
                console.log(err);
            }
        }
        fetchUser();
    }, [])

    // 저장 버튼 누르면 도서 정보를 업데이트
    const saveClick = async () => {
        try {
            const update = await axios.put(`${apiUrl}/users/${userid}`, userData, { withCredentials: true });
            navigate('/user');
            setOpen(false);
        } catch (err) {
            alert("업데이트하는데 실패했습니다.")
            console.log(err);
        }
    }

    const handleChange = (e) => {
        const { id, value } = e.target;
        setUserData((prev) => ({
            ...prev,
            [id] : value
        }));
    }

    return (
        <div className='userupdate'>

            <div className='uu-container'>
                <div className="bu-top">
                    <FontAwesomeIcon icon={faX} className="admin-exit-icon" onClick={exitClick} />
                </div>
                {(!userData || userData.length < 0) ? (
                    <></>
                ) : (
                    <div className="bu-center">
                        <div className='bu-right'>
                            <div><label for='username'>아이디</label><input type="text" id="username" value={userData.username} onChange={handleChange}></input></div>
                            <div><label for='name'>이름</label><input type="text" id="name" value={userData.name} onChange={handleChange}></input></div>
                            <div><label for='phone'>전화번호</label><input type="text" id="phone" value={userData.phone} onChange={handleChange}></input></div>
                            <div><label for='isAdmin'>관리자여부</label><input type="text" id="isAdmin" value={userData.isAdmin} onChange={handleChange}></input></div>
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

export default UserUpdate;