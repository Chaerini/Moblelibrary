import Footer from '../../components/footer/Footer';
import Navbar from '../../components/navbar/Navbar';
import searchicon from "../../images/search-icon.png";
import bookimage from "../../images/banner-1.png";
import './search.css';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Search = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search).get('title');
    const [searchWord, setSearchWord] = useState(params);
    const [bookData, setBookData] = useState();
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_URL;

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            navigate(`/search?title=${searchWord}`);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axios.get(`${apiUrl}/books/search?title=${searchWord}`);
                setBookData(res.data);
                console.log(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getData();
    }, [params])

    const loanClick = async (id) => {
        try {
            // 책 DB에서 대출 횟수 1 증가
            const bookInfo = await axios.get(`${apiUrl}/books/${id}`, { withCredentials: true });
            const currentLoanCount = bookInfo.data.loanCount;
            const updatedLoanCount = currentLoanCount + 1;

            // 책 DB에서 대출 불가능으로 상태 변경
            const updatebook = await axios.put(`${apiUrl}/books/${id}`, { availability: false, loanCount: updatedLoanCount }, { withCredentials: true });
            setBookData(prevData =>
                prevData.map(book => book._id === id ? { ...book, availability: false, loanCount: updatedLoanCount } : book)
            );
            console.log(bookData);

            // 대출 정보 생성
            const loan = await axios.post(`${apiUrl}/loans`, { bookid: id }, { withCredentials: true });
            
        } catch (err) {
            console.log(err);
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch(e);
        }
    }

    return (
        <div>
            <Navbar />
            <div className='search'>
                <div className='search-left'>
                    <h2 className='search-left-h2'>자료검색</h2>
                    <a href='/search' className='search-left-a'>자료검색</a>
                    <a href='/best' className='search-left-a'>베스트도서</a>
                    <a href='/newarrival' className='search-left-a'>신착도서</a>
                </div>
                <div className='search-right'>
                    <h1 className='search-right-h1'>자료검색</h1>
                    <div className='search-input'>
                        <h2 className='search-input-h2'>자료검색</h2>
                        <div className='search-inputbox'>
                            <input type='text' placeholder='검색어를 입력해주세요' className='search-input-input' value={searchWord} onChange={(e) => setSearchWord(e.target.value)} onKeyDown={handleKeyPress}></input>
                            <button className='search-input-button' onClick={handleSearch}><img src={searchicon} /></button>
                        </div>
                    </div>
                    <p className='seaech-notice'>모블도서관에서 소장하고 있는 국내외 자료를 통합검색할 수 있습니다.
                        검색 대상 항목은 도서, 고서/고문서, 학위논문, 잡지/학술지, 신문 기사, 멀티미디어, 장애인자료, 외부연계자료, 웹사이트 수집, 기타, 해외한국관련기록물 등이 있습니다.</p>
                    <div className='search-result-list'>
                        {(!bookData || bookData.length === 0) ? (
                            <h2></h2>
                        ) : (
                            bookData.map((book, index) => (
                                <div className='search-result-box' key={index}>
                                    <div className='search-title'>
                                        <h2 className='search-title-h2'>{book.title}</h2>
                                        <span className='search-title-span'>{book.author}</span>
                                        <span className='search-title-span'>{book.publisher}</span>
                                        <span className='search-title-span'>{book.releaseDate}</span>
                                    </div>
                                    <div className='search-table-box'>
                                        <div className='search-image'><img src={book.image}></img></div>
                                        <table className='search-table'>
                                            <colgroup>
                                                <col style={{ width: '15%' }} />
                                                <col style={{ width: '35%' }} />
                                                <col style={{ width: '15%' }} />
                                                <col style={{ width: '35%' }} />
                                            </colgroup>
                                            <tr>
                                                <th className='search-table-title'>책위치</th>
                                                <th>{book.location}</th>
                                                <th className='search-table-title'>소장처</th>
                                                <th>모블도서관</th>
                                            </tr>
                                            <tr>
                                                <th className='search-table-title'>대출상태</th>
                                                <th>
                                                    {book.availability === true ? "가능" : "불가능"}
                                                    {book.availability && <button onClick={() => loanClick(book._id)}>대출하기</button>}
                                                </th>
                                                <th className='search-table-title'>페이지수</th>
                                                <th>{book.page}p</th>
                                            </tr>
                                            <tr>
                                                <th className='search-table-title'>책소개</th>
                                                <th colSpan="3">{book.description}</th>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                            )))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Search;