export const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|net|org|co|kr|edu|gov|io|me)$/;
export const passwordPattern = /^(?:(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,13}|(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/-])[A-Za-z\d!@#$%^&*()_+{}[\]:;<>,.?~\\/-]{10,13})$/;
export const namePattern = /^[가-힣]{2,5}$/;
export const phonePattern = /^010([0-9]{4})([0-9]{4})$/;
export const birthPattern = /^\d{4}\.(0[1-9]|1[0-2])\.(0[1-9]|[12]\d|3[01])$/;
