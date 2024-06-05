import { useContext, useEffect, useState } from 'react';
import Footer from '../../components/footer/Footer';
import Navbar from '../../components/navbar/Navbar';
import bookimage from "../../images/banner-1.png";
import './mystudy.css';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const Lastloan = () => {
    const [loanData, setLoanData] = useState([]);
    const [bookData, setBookData] = useState([]);
    const { user } = useContext(AuthContext);
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const fetchLoans = async () => {
            try {
                const res = await axios.get(`${apiUrl}/loans/find/${user._id}`, { withCredentials: true });
                setLoanData(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchLoans();
    }, [user._id]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                if (loanData.length > 0) {
                    const bookIds = loanData.map(loan => loan.bookid);
                    const bookRequests = bookIds.map(id => axios.get(`${apiUrl}/books/${id}`, { withCredentials: true }));
                    const bookResponses = await Promise.all(bookRequests);
                    const books = bookResponses.map(response => response.data);
                    setBookData(books);
                }
            } catch (err) {
                console.log(err);
            }
        };
        fetchBooks();
    }, [loanData]);

    const reLoanClick = async (id, bookid) => {
        try {
            const reLoan = await axios.post(`${apiUrl}/loans`, { bookid: bookid }, { withCredentials: true });
            setLoanData(prevData =>
                prevData.filter(loan => loan._id !== id)
            );
            await axios.delete(`${apiUrl}/loans/${id}`, { withCredentials: true });
        } catch (err) {
            console.log(err);
        }
    }

    const deleteClick = async (id) => {
        try {
            await axios.delete(`${apiUrl}/loans/${id}`, { withCredentials: true });
            setLoanData(prevData =>
                prevData.filter(loan => loan._id !== id)
            );
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div>
            <Navbar />
            <div className='mystudy'>
                <div className='search-left'>
                    <h2 className='search-left-h2'>내서재</h2>
                    <a href='/mypage' className='search-left-a'>내정보</a>
                    <a href='/mystudy' className='search-left-a'>대출중인 책</a>
                    <a href='/lastloan' className='search-left-a'>지난대출 목록</a>
                </div>
                <div className="search-right">
                    <h1 className='search-right-h1'>지난대출 목록</h1>
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
                                <th className='mystudy-table-title'>재대출</th>
                                <th className='mystudy-table-title'>삭제</th>
                            </tr>

                            {(loanData.length > 0 && bookData.length > 0) ? (
                                loanData.map((loan, index) => (
                                    <tr>
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
                                        <th><button onClick={() => reLoanClick(loan._id, loan.bookid)} className='mystudy-btn'>재대출</button></th>
                                        <th><button onClick={() => deleteClick(loan._id)} className='mystudy-btn2'>삭제</button></th>
                                    </tr>
                                ))

                            ) : (
                                <td colSpan="5"><div className='mystudy-td'>대출한 도서가 없습니다.</div></td>
                            )}

                        </table>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Lastloan;