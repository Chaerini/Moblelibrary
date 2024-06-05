// 유저 정보 관련 데이터 처리 //

import User from '../models/User.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// 유저 정보 업데이트
export const updateUser = async (req, res, next) => {
    try {
        const updatedUser = await User.findByIdAndUpdate( // 특정 사용자의 정보를 업데이트
            req.params.id,
            { $set: req.body }, // 필드 업데이트
            { new: true } // 업데이트 후 새로운 문서를 updateUser에 저장
        );
        res.status(200).json(updatedUser);
    } catch (err) {
        next(err);
    }
}

export const deleteUser = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.id); // id에 해당하는 사용자 삭제
        res.status(200).json('User has been deleted.');
    } catch (err) {
        next(err);
    }
}

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id); // id에 해당하는 사용자 보기
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
}

export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find(); // 모든 사용자 보기
        res.status(200).json(users);
    } catch (err) {
        next(err);
    }
}

// 사용자 이름으로 검색
export const searchName = async (req, res, next) => {
    try {
        const userName = await User.find({
            name: req.query.name
        });
        res.status(200).json(userName);
    } catch (err) {
        next(err);
    }
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const updateProfileImage = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const imgPath = req.file.path.replace(/\\/g, "/");
        if (!userId) {
            return next(createError(400, "User ID is required"));
        }
        const user = await User.findById(userId);
        if (!user) {
            return next(createError(404, "User not found"));
        }
        if (user.img) {
            const oldImage = path.join(__dirname, '../', user.img);
            if (fs.existsSync(oldImage)) {
                try {
                    fs.unlinkSync(oldImage);
                } catch {
                    return next(createError(500, "이미지 삭제 오류"));
                }
            }
        }
        user.img = `/uploads/${req.file.filename}`;
        await user.save();
        res.status(200).json({ message: "Profile image updated", user: { img: `/uploads/${req.file.filename}` } });
    } catch (e) {
        next(e);
    }
}