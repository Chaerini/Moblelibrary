import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Search from './pages/search/Search';
import Best from './pages/search/Best';
import Recommend from './pages/search/Recommend';
import Newarrival from './pages/search/Newarrival';
import Greetings from './pages/guide/Greetings';
import Information from './pages/guide/Information';
import Waytocome from './pages/guide/Waytocome';
import Mystudy from './pages/mystudy/Mystudy';
import Lastloan from './pages/mystudy/Lastloan';
import Login from './pages/login/Login';
import Register from './pages/login/Register';
import Mypage from './pages/mypage/Mypage';
import Admin from './pages/admin/Admin';
import BookManage from './pages/admin/BookManage';
import UserManage from './pages/admin/UserManage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/search' element={<Search />} />
        <Route path='/best' element={<Best />} />
        <Route path='/recommend' element={<Recommend />} />
        <Route path='/newarrival' element={<Newarrival />} />
        <Route path='/greetings' element={<Greetings />} />
        <Route path='/infomation'element={<Information />} />
        <Route path='/waytocome'element={<Waytocome />} />
        <Route path='/mypage' element={<Mypage />} />
        <Route path='/mystudy' element={<Mystudy />} />
        <Route path='/lastloan' element={<Lastloan />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/book' element={<BookManage />} />
        <Route path='/user' element={<UserManage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
