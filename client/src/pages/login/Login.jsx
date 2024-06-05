import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import bookimage from "../../images/banner-1.png";
import './login.css';
import Logo from '../../images/logo-2.png';


const Login = () => {
    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined,
    });

    const { loading, error, dispatch } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGIN_START" });
        try {
            const apiUrl = process.env.REACT_APP_API_URL;
            const res = await axios.post(`${apiUrl}/auth/login`, credentials, { withCredentials: true });
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
            
            navigate('/');
        } catch (err) {
            dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleClick(e);
        }
    }

    return (
        <div className="login">
            <div className="login-container">
                <div className='login-left'>
                    <img src={Logo}></img>
                </div>
                <div className="login-right">
                    <h2 className="login-title">LOGIN</h2>
                    <input type='text' placeholder='아이디' className="login-input" id="username" onChange={handleChange}></input>
                    <input type='password' placeholder='비밀번호' className="login-input" id="password" onChange={handleChange} onKeyDown={handleKeyPress}></input>
                    <button className="login-button" disabled={loading} onClick={handleClick}>로그인</button>
                    <a href='/register' className="login-a">회원가입</a>
                </div>

            </div>
        </div>
    );
};

export default Login;