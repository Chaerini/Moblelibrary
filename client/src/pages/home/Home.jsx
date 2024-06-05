import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import libraryicon from "../../images/library-icon.png";
import readingicon from "../../images/reading-icon.png";
import besticon from "../../images/best-icon.png";
import arrivalicon from "../../images/arrival-icon.png";
import banner4 from "../../images/banner-4.png";
import searchicon from "../../images/search-icon.png";
import "./home.css";
import { useContext, useState } from "react";
import { useNavigate} from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";
import SimpleSlider from "../../components/slider/SimpleSlider";

const Home = () => {
    // 검색
    const [searchWord, setSearchWord] = useState("");
    const navigate = useNavigate(); // 페이지 이동을 위한 함수 선언

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            navigate(`/search?title=${searchWord}`);
        } catch (err) {
            console.log(err);
        }
    }

    // 엔터키치면 검색되도록
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch(e);
        }
    }

    return (
        <div>
            <Navbar />
            <div className="home-container">
                <div className="home-left">
                    <SimpleSlider />
                </div>
                <div className="home-right">
                    <div className="home-search">
                        <h2>자료 검색</h2>
                        <div className="home-input">
                            <input type="text" placeholder="검색어를 입력해주세요" onChange={(e) => setSearchWord(e.target.value)} onKeyDown={handleKeyPress}></input>
                            <button onClick={handleSearch}><img src={searchicon} /></button>
                        </div>
                    </div>
                    <div className="home-menu">
                        <div className="home-menu-box">
                            <a href="/infomation">
                                <img src={libraryicon} className="home-icon"></img>
                                <span>이용안내</span>
                            </a>
                        </div>
                        <div className="home-menu-box">
                            <a href="/best">
                                <img src={besticon} className="home-icon"></img>
                                <span>베스트도서</span>
                            </a>
                        </div>
                        <div className="home-menu-box">
                            <a href="/newarrival">
                                <img src={arrivalicon} className="home-icon"></img>
                                <span>신착도서</span>
                            </a>
                        </div>
                        <div className="home-menu-box">
                            <a href="/mystudy">
                                <img src={readingicon} className="home-icon"></img>
                                <span>내서재</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Home;