import React from 'react'
import "./footer.css";
import Logo from "../../images/logo-1.png";
import {
    faHouse,
    faDownload,
    faEnvelope,
    faComment,
    faTrash,
    faPlus
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = () => {
    return (
        <footer>
            <div className="foot">
                <div className='footer-right'>
                    <div className='footer-right-list'>
                        <ul>
                            <li><img src={Logo}></img></li>
                            <li><b>| 개발자</b></li>
                            <li><b>| 개인정보처리방침</b></li>
                            <li><b>| 이용약관</b></li>
                        </ul>
                    </div>
                    <div className='footer-right-list'>
                        <ul>
                            <li>고객센터: 충남 천안시 58-10</li>
                            <li>| 전화번호: 010-1111-2222</li>
                            <li>| 이메일: dlcofls21@naver.com</li>
                        </ul>
                    </div>
                    <div className='footer-right-list' style={{marginTop: '2px'}}>
                        <ul>
                            <li>@MobleLibrary. ALL RIGHTS RESERVED</li>
                        </ul>
                    </div>
                </div>
                <div className='footer-left' style={{marginRight: '50px'}}>
                    <FontAwesomeIcon icon={faHouse} className='img' />
                    <FontAwesomeIcon icon={faDownload} className='img' />
                    <FontAwesomeIcon icon={faEnvelope} className='img' />
                    <FontAwesomeIcon icon={faComment} className='img' />
                </div>
            </div>
            
        </footer>
    )
}

export default Footer;
