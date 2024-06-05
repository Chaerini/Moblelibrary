import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import morgan from 'morgan';

import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import booksRoute from "./routes/books.js";
import loansRoute from "./routes/loans.js";



const app = express() // Express 애플리케이션 인스턴스 생성
dotenv.config() // 환경 변수 로드

// MongoDB 연결 함수
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to mongoDB.");
    } catch (error) {
        throw error;
    }
};

// MongoDB 연결 해제 이벤트 핸들러
mongoose.connection.on('disconnected', () => {
    console.log("mongoDB disconnected!");
});

// JSON 요청 본문 파싱 미들웨어 설정
app.use(express.json())

// 서버 시작 및 MongoDB 연결 시도
app.listen(process.env.PORT, () => {
    connect();
    console.log("Connected to backend.");
})

// // 클라이언트로부터 전송된 쿠키를 파싱하여 req.cookies 객체에 저장
app.use(cookieParser())

// 미들웨어 설정
// 모든 도메인에서의 요청을 허용하는 기본 CORS 설정 사용
// app.use(cors())

//middlewares
// ‘http://localhost:3000' 접근을 CORS 정책을 적용하여 자격 증명을 포함한 요청도 허용하도록 설정
// 이는 주로 프론트엔드 애플리케이션이 백엔드 서버에 안전하게 접근할 수 있도록 도와준다
const corsOptions = {
    origin: 'http://localhost:3000', // 클라이언트 url
    credentials: true, // 자격 증명 허용
}
app.use(cors(corsOptions))




// // JSON 요청 본문 파싱
app.use(express.json())

// // morgan 로깅 미들웨어 사용
// app.use(morgan('combined'));

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/books", booksRoute);
app.use("/api/loans", loansRoute);

// // 현재 모듈 파일의 디렉토리 이름 가져오기
const __filename = fileURLToPath(import.meta.url);

// // 파일 경로에서 디렉토리 이름 추출
const __dirname = path.dirname(__filename);

// // 웹 애플리케이션에서 정적 파일을 손쉽게 제공할 수 있게 해줍니다. 정적 파일을 제공할 경로를 명확하게 지정
app.use('/uploads',express.static(path.join(__dirname,'uploads')));

// // 전역 오류 처리를 위한 코드
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500; // err객체에서 status를 추출. 없을 경우 500 상태 코드 반환
    const errorMessage = err.message || "Something went wrong!"; // err객체에서 message를 추출. 없을 경우 문자열 반환
    return res.status(errorStatus).json({ // 추출한 상태코드를 json으로 응답
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
});