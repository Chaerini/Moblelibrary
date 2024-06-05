import { useContext, useEffect, useState } from 'react';
import Footer from '../../components/footer/Footer';
import Navbar from '../../components/navbar/Navbar';
import bookimage from "../../images/banner-1.png";
import './mystudy.css';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Mystudy = () => {
    const [loaningData, setLoaningData] = useState([]);
    const [bookData, setBookData] = useState([]);
    const { user } = useContext(AuthContext);
    const apiUrl = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();


    useEffect(() => {
        const fetchLoans = async () => {
            try {
                const res = await axios.get(`${apiUrl}/loans/finds/${user._id}`, { withCredentials: true });
                setLoaningData(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchLoans();
    }, [user._id]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                if (loaningData.length > 0) {
                    const bookIds = loaningData.map(loan => loan.bookid); // 대출 데이터에서 bookid 추출
                    const bookRequests = bookIds.map(id => axios.get(`${apiUrl}/books/${id}`, { withCredentials: true })); // 각 bookid로 책 데이터 요청
                    const bookResponses = await Promise.all(bookRequests); // 모든 책 데이터 요청이 완료될 때까지 기다림
                    const books = bookResponses.map(response => response.data); // 책 데이터를 추출
                    setBookData(books);
                    console.log(books);
                }
            } catch (err) {
                console.log(err);
            }
        };
        fetchBooks();
    }, [loaningData]);

    const extensionClick = async (id) => {
        try {
            // 반납일에서 7일을 더하기 위함
            const loanToUpdate = loaningData.find(loan => loan._id === id);
            const currentReturnDate = new Date(loanToUpdate.returnDate);
            const newReturnDate = new Date(currentReturnDate.setDate(currentReturnDate.getDate() + 7)).toISOString().split('T')[0];;

            const extension = await axios.put(`${apiUrl}/loans/${id}`, { extension: true, returnDate: newReturnDate }, { withCredentials: true });
            // 연장 성공 시 해당 대출 항목의 extension 상태를 업데이트
            setLoaningData(prevData =>
                prevData.map(loan =>
                    loan._id === id ? { ...loan, extension: true, returnDate: newReturnDate } : loan
                )
            );
        } catch (err) {
            console.log(err);
        }
    }

    const returnClick = async (id, bookid) => {
        try {
            // 반납일을 오늘로 설정하기
            const currentDate = new Date();
            currentDate.setHours(currentDate.getHours() + 9);
            const today = currentDate.toISOString().split('T')[0];

            // 대출 상태를 "반납완료"로 변경
            await axios.put(`${apiUrl}/loans/${id}`, { loanStatus: "반납완료", returnDate: today }, { withCredentials: true });

            // 책 대출 가능으로 변경
            await axios.put(`${apiUrl}/books/${bookid}`, { availability: true }, { withCredentials: true });

            console.log(bookData);

            // 대출 목록에서 해당 항목 제거
            setLoaningData(prevData =>
                prevData.filter(loan => loan._id !== id)
            );

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <Navbar />
            {(!user || user.length < 0) ? (
                <>
                    {alert("로그인이 필요합니다.")}
                    {navigate('/login')}
                </>

            ) : (
                <div className='mystudy'>
                    <div className='search-left'>
                        <h2 className='search-left-h2'>내서재</h2>
                        <a href='/mypage' className='search-left-a'>내정보</a>
                        <a href='/mystudy' className='search-left-a'>대출중인 책</a>
                        <a href='/lastloan' className='search-left-a'>지난대출 목록</a>
                    </div>
                    <div className="search-right">
                        <h1 className='search-right-h1'>대출중인 책</h1>
                        <div className='mystudy-table'>
                            <table>
                                <colgroup>
                                    <col style={{ width: '40%' }} />
                                    <col style={{ width: '12%' }} />
                                    <col style={{ width: '12%' }} />
                                    <col style={{ width: '12%' }} />
                                    <col style={{ width: '12%' }} />
                                </colgroup>
                                <tr>
                                    <th className='mystudy-table-title'>도서정보</th>
                                    <th className='mystudy-table-title'>대출일</th>
                                    <th className='mystudy-table-title'>반납일</th>
                                    <th className='mystudy-table-title'>연장</th>
                                    <th className='mystudy-table-title'>반납</th>
                                </tr>

                                {(loaningData.length > 0 && bookData.length > 0) ? (
                                    loaningData.map((loan, index) => (
                                        <tr key={loan._id}>
                                            <th>
                                                <div className='mystudy-info'>
                                                    <div className='mystudy-info-left'>
                                                        <img src={bookData[index].image}></img>
                                                    </div>
                                                    <div className='mystudy-info-right'>
                                                        <p>{bookData[index]?.title}</p>
                                                        <p>{bookData[index]?.author}</p>
                                                        <p>{bookData[index]?.publisher}</p>
                                                        <p>{bookData[index]?.releaseDate}</p>
                                                    </div>
                                                </div>
                                            </th>
                                            <th>{loan.loanDate}</th>
                                            <th>{loan.returnDate}</th>
                                            {loan.extension === false ? (
                                                <th><button onClick={() => extensionClick(loan._id)} className='mystudy-btn'>연장</button></th>
                                            ) : (
                                                <th>연장완료</th>
                                            )}

                                            <th><button onClick={() => returnClick(loan._id, loan.bookid)} className='mystudy-btn2'>반납</button></th>
                                        </tr>
                                    ))) : (
                                    <td colSpan="5"><div className='mystudy-td'>대출한 도서가 없습니다.</div></td>
                                )}

                            </table>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default Mystudy;