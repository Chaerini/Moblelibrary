import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import greetings from "../../images/greetings.png";
import './guide.css';

const Greetings = () => {
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
                    <h1 className='search-right-h1'>인사말</h1>
                    <img src={greetings}></img>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Greetings;