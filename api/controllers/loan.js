import Loan from "../models/Loan.js";
import User from "../models/User.js";
import Book from "../models/Book.js";

// 대출 등록
export const createLoan = async (req, res, next) => {
    // 로그인 한 유저로 대출 등록을 하기 위함
    const user = await User.findById(req.user.id);
    const userid = user._id.toString();

    // 대출 등록 날짜를 현재로 하기 위함
    const currentDate = new Date();
    currentDate.setHours(currentDate.getHours() + 9);
    const date = currentDate.toISOString().slice(0, 10);

    // 반납 날짜를 대출 등록 날짜 +7로 하기 위함
    const reDate = new Date(date);
    reDate.setDate(reDate.getDate() + 7);
    const returnDate = reDate.toISOString().slice(0, 10);

    const newLoan = new Loan({
        userid: userid,
        bookid: req.body.bookid,
        loanDate: date,
        returnDate: returnDate,
        loanStatus: "대출중",
        extension: false
    });

    try {
        const savedLoan = await newLoan.save();
        res.status(200).json(savedLoan);
    } catch (err) {
        next(err);
    }
};

// 대출 상태 변경
export const updateLoan = async (req, res, next) => {
    try {
        const updatedLoan = await Loan.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedLoan);
    } catch (err) {
        next(err);
    }
};

// 대출 삭제
export const deleteLoan = async (req, res, next) => {
    try {
        await Loan.findByIdAndDelete(req.params.id);
        res.status(200).json("Loan has been deleted.");
    } catch (err) {
        next(err);
    }
};

// 대출 조회
export const getLoan = async (req, res, next) => {
    try {
        const loan = await Loan.findById(req.params.id);
        res.status(200).json(loan);
    } catch (err) {
        next(err);
    }
};

// 대출 현황 전체 조회
export const getLoans = async (req, res, next) => {
    try {
        const loans = await Loan.find();
        res.status(200).json(loans);
    } catch (err) {
        next(err);
    }
};

// 해당하는 유저의 지난 대출 정보만 조회
export const getUserLoan = async (req, res, next) => {
    try {
        const userloan = await Loan.find(
            {
                userid: req.params.userid,
                loanStatus: "반납완료",
            }
        )
        res.status(200).json(userloan);
    } catch (err) {
        next(err);
    }
}

// 해당하는 유저의 대출 중인 정보만 조회
export const getUserLoaning = async (req, res, next) => {
    try {
        const userloan = await Loan.find(
            { userid: req.params.userid,
                loanStatus: "대출중"
             }
        )
        res.status(200).json(userloan);
    } catch (err) {
        next(err);
    }
}