import { useContext } from "react";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import './mypage.css';
import { AuthContext } from "../../context/AuthContext";

const Mypage = () => {
    const { user } = useContext(AuthContext);
    console.log(user);
    return (
        <div>
            <Navbar />
            <div className="mypage">
                <div className='search-left'>
                    <h2 className='search-left-h2'>내서재</h2>
                    <a href='/mypage' className='search-left-a'>내정보</a>
                    <a href='/mystudy' className='search-left-a'>대출중인 책</a>
                    <a href='/lastloan' className='search-left-a'>지난대출 목록</a>
                </div>
                <div className="search-right">
                    <h1 className='search-right-h1'>내정보</h1>
                    <p className='seaech-notice'>정보 수정은 모블 도서관 관리자(010-1111-2222)에게 연락바랍니다.</p>
                    <div className="mypage-container">
                        <div className="mypage-left">
                            <label for="id" className="mypage-label">아이디</label>
                            <label for="password" className="mypage-label">비밀번호</label>
                            <label for="name" className="mypage-label">이름</label>
                            <label for="tel" className="mypage-label">전화번호</label>
                        </div>
                        <div className="mypage-right">
                            <input type="text" id="id" className="mypage-input" value={user.username} readOnly></input>
                            <input type="password" id="password" className="mypage-input" value="password" readOnly></input>
                            <input type="text" id="name" className="mypage-input" value={user.name} readOnly></input>
                            <input type="tel" id="tel" className="mypage-input" value={user.phone} readOnly></input>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Mypage;