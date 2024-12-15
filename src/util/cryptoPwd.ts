import CryptoJS from 'crypto-js'

// @ts-ignore
export const secret_key:string = __APP_ENV__.SECRET_KEY

// 加密
export const encrypt = (pwd:string):string => {
    return CryptoJS.AES.encrypt(pwd, secret_key).toString()
}

// 解密
export const decrypt = (encryptPwd:string):string => {
    const bytes = CryptoJS.AES.decrypt(encryptPwd, secret_key)
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
}