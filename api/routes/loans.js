import express from 'express';
import {
    createLoan,
    updateLoan,
    deleteLoan,
    getLoan,
    getLoans,
    getUserLoan,
    getUserLoaning
} from "../controllers/loan.js";
import { verifyUser, verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

// CREATE
router.post('/', verifyUser, createLoan);

// UPDATE
router.put('/:id', verifyUser, updateLoan);

// DELETE
router.delete('/:id', verifyUser, deleteLoan);

// 대출 정보 아이디로 GET
router.get('/:id', getLoan);

// 해당하는 유저의 지난 대출 정보만 GET
router.get('/find/:userid', verifyUser, getUserLoan);

// 해당하는 유저의 대출 중인 정보만 GET
router.get('/finds/:userid', verifyUser, getUserLoaning);

// GET ALL
router.get('/',verifyAdmin, getLoans);

export default router;