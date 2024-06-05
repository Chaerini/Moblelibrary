import { useState } from 'react';
import bookimage from "../../images/banner-1.png";
import './login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo from '../../images/logo-2.png';

const Register = () => {
    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined,
        name: undefined,
        phone: undefined
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const apiUrl = process.env.REACT_APP_API_URL;
            const res = await axios.post(`${apiUrl}/auth/register`, credentials);
            navigate('/login');
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="login">
            <div className="login-container">
                <div className='login-left'>
                    <img src={Logo}></img>
                </div>
                <div className="login-right">
                <h2 className="login-title">SIGN UP</h2>
                    <input type='text' placeholder='아이디' className="login-input" id="username" onChange={handleChange}></input>
                    <input type='password' placeholder='비밀번호' className="login-input" id="password" onChange={handleChange}></input>
                    <input type='text' placeholder='이름' className="login-input" id="name" onChange={handleChange}></input>
                    <input type='tel' placeholder='핸드폰번호' className="login-input" id="phone" onChange={handleChange}></input>
                    <button className="login-button" onClick={handleClick}>회원가입</button>
                </div>

            </div>
        </div>
    );
};

export default Register;