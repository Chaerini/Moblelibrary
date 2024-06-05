import {
    faHouse,
    faBook,
    faUser,
    faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './admin.css';
import { useNavigate } from "react-router-dom";

const Admin = () => {
    const navigate = useNavigate();

    return (
        <div className="admin">
            <div className="admin-left">
                <h1 className="admin-menu-logo">로고</h1>
                <a href="/admin" className="admin-menu-a"><FontAwesomeIcon icon={faHouse} className="admin-icon" />대시보드</a>
                <a href="/book" className="admin-menu-a"><FontAwesomeIcon icon={faBook} className="admin-icon" />도서 관리</a>
                <a href="/user" className="admin-menu-a"><FontAwesomeIcon icon={faUser} className="admin-icon" />사용자 관리</a>
            </div>
            <div className="admin-center">
                <div className="admin-center-top"><FontAwesomeIcon icon={faX} className="admin-exit-icon" onClick={() => navigate('/')}/></div>

                <div className="admin-container">
                    <div className="admin-dashboard">

                        <h2>대시보드</h2>
                    </div>
                    <div className="admin-right">
                        <h2>관리자</h2>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default Admin;