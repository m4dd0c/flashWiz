export const genOTP = () => {
    let otp = '';
    for(let i = 0; i<6; i++){
        otp += Math.trunc(Math.random() * 10)
    }
    return otp;
}