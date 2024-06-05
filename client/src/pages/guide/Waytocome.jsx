import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import greetings from "../../images/greetings.png";
import './guide.css';

const Waytocome = () => {
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
                    <h1 className='search-right-h1'>오시는 길</h1>
                    <div style={{ font: 'normal normal 400 12px/normal dotum, sans-serif', width: '640px', height: '392px', color: '#333', position: 'relative', display: "flex", flexDirection: "column"}}>
                        <div style={{ height: '360px' }}>
                            <a href="https://map.kakao.com/?urlX=533084.0&urlY=920058.0&itemId=1308094337&q=%EB%AA%A8%EB%B8%94%EA%B5%90%EC%9C%A1%EC%84%BC%ED%84%B0%20%ED%8F%89%EC%83%9D%EA%B5%90%EC%9C%A1%EC%9B%90&srcid=1308094337&map_type=TYPE_MAP&from=roughmap" target="_blank" rel="noopener noreferrer">
                                <img
                                    className="map"
                                    src="http://t1.daumcdn.net/roughmap/imgmap/8fdfbe3b8b3fa9db8dcbcbe95075b864e7449f2ba663e70965b04d5d939fe47a"
                                    width="638px"
                                    height="358px"
                                    style={{ border: '1px solid #ccc' }}
                                    alt="Kakao Map"
                                />
                            </a>
                        </div>
                        <div style={{ overflow: 'hidden', padding: '7px 11px', border: '1px solid rgba(0, 0, 0, 0.1)', borderRadius: '0px 0px 2px 2px', backgroundColor: 'rgb(249, 249, 249)' }}>
                            <a href="https://map.kakao.com" target="_blank" rel="noopener noreferrer" style={{ float: 'left' }}>
                                <img
                                    src="//t1.daumcdn.net/localimg/localimages/07/2018/pc/common/logo_kakaomap.png"
                                    width="72"
                                    height="16"
                                    alt="카카오맵"
                                    style={{ display: 'block', width: '72px', height: '16px' }}
                                />
                            </a>
                            <div style={{ float: 'right', position: 'relative', top: '1px', fontSize: '11px' }}>
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href="https://map.kakao.com/?from=roughmap&srcid=1308094337&confirmid=1308094337&q=%EB%AA%A8%EB%B8%94%EA%B5%90%EC%9C%A1%EC%84%BC%ED%84%B0%20%ED%8F%89%EC%83%9D%EA%B5%90%EC%9C%A1%EC%9B%90&rv=on"
                                    style={{ float: 'left', height: '15px', paddingTop: '1px', lineHeight: '15px', color: '#000', textDecoration: 'none' }}
                                >
                                    로드뷰
                                </a>
                                <span style={{ width: '1px', padding: '0', margin: '0 8px 0 9px', height: '11px', verticalAlign: 'top', position: 'relative', top: '2px', borderLeft: '1px solid #d0d0d0', float: 'left' }}></span>
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href="https://map.kakao.com/?from=roughmap&eName=%EB%AA%A8%EB%B8%94%EA%B5%90%EC%9C%A1%EC%84%BC%ED%84%B0%20%ED%8F%89%EC%83%9D%EA%B5%90%EC%9C%A1%EC%9B%90&eX=533084.0&eY=920058.0"
                                    style={{ float: 'left', height: '15px', paddingTop: '1px', lineHeight: '15px', color: '#000', textDecoration: 'none' }}
                                >
                                    길찾기
                                </a>
                                <span style={{ width: '1px', padding: '0', margin: '0 8px 0 9px', height: '11px', verticalAlign: 'top', position: 'relative', top: '2px', borderLeft: '1px solid #d0d0d0', float: 'left' }}></span>
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href="https://map.kakao.com?map_type=TYPE_MAP&from=roughmap&srcid=1308094337&itemId=1308094337&q=%EB%AA%A8%EB%B8%94%EA%B5%90%EC%9C%A1%EC%84%BC%ED%84%B0%20%ED%8F%89%EC%83%9D%EA%B5%90%EC%9C%A1%EC%9B%90&urlX=533084.0&urlY=920058.0"
                                    style={{ float: 'left', height: '15px', paddingTop: '1px', lineHeight: '15px', color: '#000', textDecoration: 'none' }}
                                >
                                    지도 크게 보기
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <Footer />
        </div>
    );
}

export default Waytocome;