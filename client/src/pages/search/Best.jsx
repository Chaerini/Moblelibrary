import { useEffect, useState } from 'react';
import Footer from '../../components/footer/Footer';
import Navbar from '../../components/navbar/Navbar';
import bookimage from "../../images/banner-1.png";
import '../search/search.css';
import axios from 'axios';

const Best = () => {
    const [bestData, setBestData] = useState([]);
    const apiUrl = process.env.REACT_APP_API_URL;

    const loanClick = async (id) => {
        try {
            // 책 DB에서 대출 횟수 1 증가
            const bookInfo = await axios.get(`${apiUrl}/books/${id}`, { withCredentials: true });
            const currentLoanCount = bookInfo.data.loanCount;
            const updatedLoanCount = currentLoanCount + 1;

            // 책 DB에서 대출 불가능으로 상태 변경
            // 책 DB 업데이트
            const updatebook = await axios.put(`${apiUrl}/books/${id}`, { availability: false, loanCount: updatedLoanCount }, { withCredentials: true });
            setBestData(prevData =>
                prevData.map(best => best._id === id ? { ...best, availability: false, loanCount: updatedLoanCount } : best)
            );
            console.log(bestData);

            // 대출 정보 생성
            const loan = await axios.post(`${apiUrl}/loans`, { bookid: id }, { withCredentials: true });

        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 대출 횟수 상위 10개 조회
                const res = await axios.get(`${apiUrl}/books/best`, { withCredentials: true });
                setBestData(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [])

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
                    <h1 className='search-right-h1'>베스트도서</h1>
                    <p className='seaech-notice'>모블도서관에서 대출하고 있는 도서 중 대출건수가 많은 도서를 보여 드립니다. <br />대출베스트도서는 10건까지 순서대로 출력됩니다.</p>
                    <div className='search-result-list'>
                        {(!bestData || bestData.length === 0) ? (
                            <h2></h2>
                        ) : (
                            bestData.map((best, index) => (
                                <div className='search-result-box'>
                                    <div className='search-title'>
                                        <h2 className='search-title-h2'>{best.title}</h2>
                                        <span className='search-title-span'>{best.author}</span>
                                        <span className='search-title-span'>{best.publisher}</span>
                                        <span className='search-title-span'>{best.releaseDate}</span>
                                    </div>
                                    <div className='search-table-box'>
                                        <div className='search-image'><img src={best.image}></img></div>
                                        <table className='search-table'>
                                            <colgroup>
                                                <col style={{ width: '15%' }} />
                                                <col style={{ width: '35%' }} />
                                                <col style={{ width: '15%' }} />
                                                <col style={{ width: '35%' }} />
                                            </colgroup>
                                            <tr>
                                                <th className='search-table-title'>책위치</th>
                                                <th>{best.location}</th>
                                                <th className='search-table-title'>소장처</th>
                                                <th>모블도서관</th>
                                            </tr>
                                            <tr>
                                                <th className='search-table-title'>대출상태</th>
                                                <th>
                                                    {best.availability === true ? "가능" : "불가능"}
                                                    {best.availability && <button onClick={() => loanClick(best._id)}>대출하기</button>}
                                                </th>
                                                <th className='search-table-title'>페이지수</th>
                                                <th>{best.page}p</th>
                                            </tr>
                                            <tr>
                                                <th className='search-table-title'>책소개</th>
                                                <th colSpan="3">{best.description}</th>
                                            </tr>
                                            <tr>
                                                <th className='search-table-title'>대출횟수</th>
                                                <th colSpan="3">{best.loanCount}</th>
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

export default Best;