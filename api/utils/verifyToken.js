// 사용자 인증 미들웨어

import jwt from 'jsonwebtoken';
import { createError } from '../utils/error.js';

export const verifyToken = (req, res, next) => { 
    const token = req.cookies.access_token; // 쿠키 값을 가져와 token에 저장
    if(!token) { // 토큰이 존재하지 않으면
        return next(createError(401, "You are not authenticated!")); // error.js에서 createError함수에 전달
    }

    jwt.verify(token, process.env.JWT, (err, user) => { // token과 env에 저장되어 있는 시크릿 키를 통해 검증
        if(err) return next(createError(403, "Token is not valid!")); // 에러가 발생하면 error.js에서 createError 함수에 전달
        req.user = user; // 요청 객체에 user 추가
        next(); // 다음 미들웨어로 전달
    });
};

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, next, () => { // verifyToken 함수를 실행 한 후
        if(req.user.id === req.params.id || req.user.isAdmin) { // 사용자 아이디와 params 아이디가 같거나 관리자가 true 일 경우
            next(); // 다음 미들웨어로 전달
        } else { // 아니라면
            return next(createError(403, "You are not authorized!")); // error.js에서 createError 함수에 전달
        }
    });
};

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, next, () => { // verifyToken 함수를 통해 JWT 검사
        if(req.user.isAdmin) { // 만약 관리자 아이디라면
            next(); // 다음 미들웨어로 전달
        } else { // 아니라면
            return next(createError(403, "You are not authorized!")); // error.js에서 createError 함수에 전달
        }
    });
};