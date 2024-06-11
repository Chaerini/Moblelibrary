import express from 'express';
import {
    createBook,
    updateBook,
    deleteBook,
    getBook,
    getBooks,
    searchTitle,
    getLank,
    getArrival,
    uploadImage,
    updateImage
} from '../controllers/book.js';
import { verifyAdmin } from '../utils/verifyToken.js';
import upload from '../utils/upload.js';

const router = express.Router();

// CREATE
router.post('/', verifyAdmin, createBook);

// UPDATE
router.put('/:id', verifyAdmin, updateBook);

// DELETE
router.delete('/:id', verifyAdmin, deleteBook);

// Search
router.get('/search', searchTitle);

// 대출 횟수 많은 순으로 10개 GET
router.get('/best', getLank);

// 도착 날짜 최신순으로 정렬 GET
router.get('/arrival', getArrival);

// 이미지 업로드
router.post('/upload', upload.single('image'), uploadImage);

// 이미지 업데이트
router.put('/update/:id', upload.single('image'), updateImage);

// GET
router.get('/:id', getBook);

// GET ALL
router.get('/', getBooks);





export default router;