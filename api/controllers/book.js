import { query } from "express";
import Book from "../models/Book.js";
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// 책 등록
export const createBook = async (req, res, next) => {
    const newBook = new Book(req.body);

    try {
        const savedBook = await newBook.save();
        res.status(200).json(savedBook);
    } catch (err) {
        next(err);
    }
};

// 책 수정
export const updateBook = async (req, res, next) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedBook);
    } catch (err) {
        next(err);
    }
};

// 책 삭제
export const deleteBook = async (req, res, next) => {
    try {
        await Book.findByIdAndDelete(req.params.id);
        res.status(200).json("Book has been deleted.");
    } catch (err) {
        next(err);
    }
};

// 책 조회
export const getBook = async (req, res, next) => {
    try {
        const book = await Book.findById(req.params.id);
        res.status(200).json(book);
    } catch (err) {
        next(err);
    }
};

// 책 전체 조회
export const getBooks = async (req, res, next) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (err) {
        next(err);
    }
};

// 책 이름으로 검색
export const searchTitle = async (req, res, next) => {
    try {
        const bookTitle = await Book.aggregate([
            {
                $search: {
                    index: 'title_index',
                    text: { query: req.query.title, path: 'title' }
                }
            }
        ]);
        res.status(200).json(bookTitle);
    } catch (err) {
        next(err);
    }
}

// 대출 횟수 순으로 10개 조회
export const getLank = async (req, res, next) => {
    try {
        const lank = await Book.find().sort({ loanCount: -1 }).limit(10);
        res.status(200).json(lank);
    } catch (err) {
        next(err);
    }
}

// 도착 순서대로 정렬한 책 정보
export const getArrival = async (req, res, next) => {
    try {
        const arrival = await Book.find().sort({ arrivalDate: -1 });
        res.status(200).json(arrival);
    } catch (err) {
        next(err);
    }
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const updateProfileImage = async (req, res, next) => {
    try {
        const bookId = req.params.id;
        const imgPath = req.file.path.replace(/\\/g, "/");
        if (!bookId) {
            return next(createError(400, "Book ID is required"));
        }
        const book = await Book.findById(bookId);
        if (!book) {
            return next(createError(404, "Book not found"));
        }
        if (book.image) {
            const oldImage = path.join(__dirname, '../', book.image);
            if (fs.existsSync(oldImage)) {
                try {
                    fs.unlinkSync(oldImage);
                } catch {
                    return next(createError(500, "이미지 삭제 오류"));
                }
            }
        }
        book.image = `/uploads/${req.file.filename}`;
        await book.save();
        res.status(200).json({ message: "Book image updated", user: { image: `/uploads/${req.file.filename}` } });
    } catch (e) {
        next(e);
    }
}

export const uploadImage = async (req, res, next) => {
    try {
        const image = `/uploads/${req.file.filename}`;
    } catch (err) {
        next(err);
    }
}