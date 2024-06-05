import {
    faBook,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import greetings from "../../images/greetings.png";
import './guide.css';

const Information = () => {
    return (
        <div>
            <Navbar />
            <div className="greetings">
                <div className='search-left'>
                    <h2 className='search-left-h2'>도서관안내</h2>
                    <a href='/search' className='search-left-a'>인사말</a>
                    <a href='/infomation' className='search-left-a'>대출이용안내</a>
                    <a href='/waytocome' className='search-left-a'>오시는길</a>
                </div>
                <div className="search-right">
                    <h1 className='search-right-h1'>대출이용안내</h1>
                    <div className="greetings-title"><FontAwesomeIcon icon={faBook} className="greetings-icon"/><h3>도서대출안내</h3></div>
                    <div className="greetings-content">
                        <li>관내열람 : 1일 3권 당일 반납(신분증 또는 대출증 지참)</li>
                        <li>반납일 연기 : 1회 7일 연기가능</li>
                        <li>홈페이지의 내서재(대출조회/연기)메뉴 이용</li>
                        <li>재대출 : 반납 즉시 재대출 가능</li>
                    </div>

                    <div className="greetings-title"><FontAwesomeIcon icon={faBook} className="greetings-icon"/><h3>도서반납안내</h3></div>
                    <div className="greetings-content">
                        <li>자료실 운영시간내 : 종합자료실,어린이자료실 반납</li>
                        <li>자료실 운영시간 지난후 : 1층 무인반납기에 반납</li>
                        <li>도서관 퇴관 및 휴관시 : 도서반납함에 반납(교육청 정문 좌측) / 홈페이지의 내서재 메뉴 이용</li>
                        <li>자료의 반납은 대출받은 도서관에서만 가능</li>
                    </div>

                    <div className="greetings-title"><FontAwesomeIcon icon={faBook} className="greetings-icon"/><h3>이용자주의사항</h3></div>
                    <div className="greetings-content">
                        <li>대출카드는 타인에게 양도 할 수 없으며, 대출시 반드시 제시 하여야 합니다.</li>
                        <li>대출도서의 분실 및 훼손시 동일한 도서로 변상하거나 현재의 시가로 변상하여야 합니다.</li>
                        <li>주소,전화번호 변동 또는 대출카드 분실 시에는 즉시 신고 하여야 합니다.</li>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Information;