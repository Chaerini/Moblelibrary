// 자주 쓰는 미들웨어는 따로 저장하여 사용

export const createError = (status, message) => { // status와 message를 매개변수로 받아서
    const err = new Error(); // 새로운 error 객체 생성
    err.status = status; // err 객체의 status에 매개 변수로 받은 status 저장
    err.message = message; // err 객체의 message에 매개 변수로 받은 message 저장
    return err; // err 반환
}