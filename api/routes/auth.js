import express from "express";
import { login, logout, register } from "../controllers/auth.js";

const router = express.Router();

// 회원가입 라우터
router.post('/register', register);

// 로그인 라우터
router.post('/login', login);

// 로그아웃 라우터
router.get('/logout', logout);

export default router;