import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

// 회원가입
export const register = async (req, res, next) => {
    try {
        // 비밀번호 해싱
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        // 새로운 사용자 생성 (password는 따로 저장)
        const newUser = new User({
            ...req.body,
            password: hash,
        });

        // 새로운 사용자 저장
        await newUser.save();

        // 성공 응답
        res.status(200).send('User has been created.');
    } catch (err) {
        next(err);
    }
};

// 로그인
export const login = async (req, res, next) => {
    try {
        // 이름으로 해당 사용자 찾기
        const user = await User.findOne({ username: req.body.username });
        if (!user) return next(createError(404, "User not found!"));

        // 비밀번호 검증
        // compare() -> bcrypt에 내장 된 함수, 입력 된 비밀번호와 해시 된 비밀번호를 비교, 반환타입 true / false
        const isPasswordCorrect = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!isPasswordCorrect) return next(createError(400, "Wrong password or username!"));

        // JWT 생성 -> 사용자 아이디와 관리자 여부를 토큰 페이로드에 저장
        const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.JWT
        );

        // user._doc 실제 데이터만 포함하는 순수 JavaScript 객체
        // user._doc 객체에서 password, isAdmin을 제외한 모든 속성을 otherDetails에 저장
        const { password, ...otherDetails } = user._doc;
        res
            .cookie("access_token", token, { // 쿠키의 이름을 'access_token'으로 설정, 값은 token, 
                httpOnly: true, // 옵션 httpOnly: ture로 자바스크립트에서 쿠키 접근 제한
                sameSite: "strict",
                path: '/',
                // domain: 'moblelibrary.site',
            })
            .status(200) // 응답코드 200으로 설정
            .json({ details: { ...otherDetails } }); // 응답 json 형태, otherDetails와 isAdmin을 details에 포함
    } catch (err) {
        next(err);
    }
};

// 로그아웃
export const logout = (req, res) => {
    res
        .clearCookie("access_token", {
            httpOnly: true,
            // 프로덕션 환경에서는 secure 옵션을 활성화
            secure: process.env.NODE_ENV === "production",
            // 동일한 사이트의 요청에서만 처리되도록
            sameSite: "strict",
            path: '/',
        })
        .status(200)
        .json({ message: "Logged out successfully" });
};

