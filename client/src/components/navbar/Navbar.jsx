import { useContext } from 'react';
import './navbar.css';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo from '../../images/logo-1.png';

const Navbar = () => {
    const { user, dispatch } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const apiUrl = process.env.REACT_APP_API_URL;
            const res = await axios.get(`${apiUrl}/auth/logout`, {}, { withCredentials: true });
            dispatch({ type: "LOGOUT" });
            navigate('/');
        } catch (err) {
            console.log(err);
        }
    }

    const AdminClick = () => {
        navigate('/book');
    }
    
    return (
        <div className='navbar'>
            <div className='nav-left'>
                <div className='nav-logo'>
                    <a href='/'><img src={Logo} /></a>
                </div>
                <div className='nav-menu'>
                    <a href='/search'><span className='nav-menu-list'>자료검색</span></a>
                    <a href='/greetings'><span className='nav-menu-list'>도서관안내</span></a>
                    <a href='/mystudy'><span className='nav-menu-list'>내서재</span></a>
                </div>
            </div>
            {user ? (
                <div className='nav-button'>
                    { user.isAdmin === true ? (
                        <button className='nav-admin' onClick={AdminClick}>관리자</button>
                    ) : (
                        <></>
                    )}
                    
                    <span><b>{user.name}</b>님 환영합니다!</span>
                    <a className='nav-login' onClick={handleClick}>로그아웃</a>
                </div>
            ) : (
                <div className='nav-button'>
                    <a href='/login' className='nav-login'>로그인</a>
                </div>
            )
            }

        </div>
    );
};

export default Navbar;