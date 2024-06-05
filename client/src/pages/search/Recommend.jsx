import Footer from '../../components/footer/Footer';
import Navbar from '../../components/navbar/Navbar';
import bookimage from "../../images/banner-1.png";
import './search.css';

const Recommend = () => {
    return (
        <div>
            <Navbar />
            <div className='search'>
                <div className='search-left'>
                    <h2 className='search-left-h2'>자료검색</h2>
                    <a href='/search' className='search-left-a'>자료검색</a>
                    <a href='/best' className='search-left-a'>베스트도서</a>
                    <a href='/recommend' className='search-left-a'>추천도서</a>
                    <a href='/newarrival' className='search-left-a'>신착도서</a>
                </div>
                <div className='search-right'>
                    <h1 className='search-right-h1'>추천도서</h1>
                    <p className='seaech-notice'>모블도서관의 사서가 추천하는 도서입니다. 추천 도서 목록은 이용자들의 흥미와 독서 즐거움을 고려하여 선별되었습니다. 추천도서는 10건까지 순서대로 출력됩니다.</p>
                    <div className='search-result-list'>
                        <div className='search-result-box'>
                            <div className='search-title'>
                                <h2 className='search-title-h2'>강원국의 인생 공부: 무엇을 위해 살 것인가</h2>
                                <span className='search-title-span'>강원국 지음</span>
                                <span className='search-title-span'>디플롯</span>
                                <span className='search-title-span'>2024</span>
                            </div>
                            <div className='search-table-box'>
                                <div className='search-image'><img src={bookimage}></img></div>
                                <table className='search-table'>
                                    <colgroup>
                                        <col style={{ width: '15%' }} />
                                        <col style={{ width: '35%' }} />
                                        <col style={{ width: '15%' }} />
                                        <col style={{ width: '35%' }} />
                                    </colgroup>
                                    <tr>
                                        <th className='search-table-title'>책위치</th>
                                        <th>어쩌구</th>
                                        <th className='search-table-title'>소장처</th>
                                        <th>모블도서관</th>
                                    </tr>
                                    <tr>
                                        <th className='search-table-title'>대출상태</th>
                                        <th>
                                            가능
                                            <button>대출하기</button>
                                        </th>
                                        <th className='search-table-title'>페이지수</th>
                                        <th>100p</th>
                                    </tr>
                                    <tr>
                                        <th className='search-table-title'>책소개</th>
                                        <th colSpan="3">어쩌구저쩌구솰랴솰랴</th>
                                    </tr>
                                    <tr>
                                        <th className='search-table-title'>대출횟수</th>
                                        <th colSpan="3">14</th>
                                    </tr>
                                </table>
                            </div>
                        </div>
                        <div className='search-result-box'>
                            <div className='search-title'>
                                <h2 className='search-title-h2'>강원국의 인생 공부: 무엇을 위해 살 것인가</h2>
                                <span className='search-title-span'>강원국 지음</span>
                                <span className='search-title-span'>디플롯</span>
                                <span className='search-title-span'>2024</span>
                            </div>
                            <div className='search-table-box'>
                                <div className='search-image'><img src={bookimage}></img></div>
                                <table className='search-table'>
                                    <colgroup>
                                        <col style={{ width: '15%' }} />
                                        <col style={{ width: '35%' }} />
                                        <col style={{ width: '15%' }} />
                                        <col style={{ width: '35%' }} />
                                    </colgroup>
                                    <tr>
                                        <th className='search-table-title'>책위치</th>
                                        <th>어쩌구</th>
                                        <th className='search-table-title'>소장처</th>
                                        <th>모블도서관</th>
                                    </tr>
                                    <tr>
                                        <th className='search-table-title'>대출상태</th>
                                        <th>
                                            가능
                                            <button>대출하기</button>
                                        </th>
                                        <th className='search-table-title'>페이지수</th>
                                        <th>100p</th>
                                    </tr>
                                    <tr>
                                        <th className='search-table-title'>책소개</th>
                                        <th colSpan="3">어쩌구저쩌구솰랴솰랴</th>
                                    </tr>
                                    <tr>
                                        <th className='search-table-title'>대출횟수</th>
                                        <th colSpan="3">14</th>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Recommend;