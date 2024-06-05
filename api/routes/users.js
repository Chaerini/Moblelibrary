// 유저 정보 관련 라우터 //

import express from 'express';
import {
    updateUser,
    deleteUser,
    getUser,
    getUsers,
    searchName,
    updateProfileImage,
    // updateImage,
} from '../controllers/user.js';
import { verifyAdmin, verifyToken, verifyUser } from '../utils/verifyToken.js';
import upload from '../utils/upload.js';

const router = express.Router();

// UPDATE
// verifyUser 미들웨어를 통해 JWT 검증한 후 updateUser 실행
router.put('/:id', verifyAdmin, updateUser);

// DELETE
router.delete('/:id', verifyAdmin, deleteUser); // 유저 정보 삭제 라우터

// 사용자 이름으로 검색
router.get('/search', searchName);

// GET
router.get('/:id', verifyAdmin, getUser); // 유저 정보 보기 라우터

// GET ALL
router.get('/', verifyAdmin, getUsers); // 모든 유저 정보 보기 라우터

// file upload UPDATE
router.put("/upload/:id", verifyUser, upload.single('file'), updateProfileImage);
// router.put('/upload/:id', updateImage);

export default router;