import { useEffect, useState } from 'react';
import Footer from '../../components/footer/Footer';
import Navbar from '../../components/navbar/Navbar';
import bookimage from "../../images/banner-1.png";
import './search.css';
import axios from 'axios';

const Newarrival = () => {
    const [bookData, setBookData] = useState([]);
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const res = await axios.get(`${apiUrl}/books/arrival`, { withCredentials: true });
                setBookData(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchBook();
    })

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
                    <h1 className='search-right-h1'>신착도서</h1>
                    <p className='seaech-notice'>모블도서관에서 최근에 입고된 신간 도서 목록을 소개합니다. 이 도서들은 새롭게 출간되어 독자들에게 다양한 주제와 새로운 지식을 제공합니다.</p>
                    <div className='search-result-list'>
                        {(!bookData || bookData.length < 0) ? (
                            <></>
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
                                                <th className='search-table-title'>도착날짜</th>
                                                <th colSpan="3">{book.arrivalDate}</th>
                                            </tr>
                                            <tr>
                                                <th className='search-table-title'>책소개</th>
                                                <th colSpan="3">{book.description}</th>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                            ))

                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Newarrival;