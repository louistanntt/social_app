import request from '../service/axiosService';
import { ChangedPasswordProps, LoginProps, RegisterProps, ResetPasswordProps, ValidateCodeProps } from '../shared/type';

const URL_REGISTER = "api/auth/register"
const URL_LOGIN = "api/auth/login"
const URL_FORGOT_PASSWORD = 'api/auth/password/forgot'
const URL_VALIDATE_CODE = 'api/auth/password/check'
const URL_RESET_PASSWORD = 'api/auth/password/reset'
const URL_CHANGE_PASSWORD = 'api/auth/password/change'

export function registerAPI(data: RegisterProps){
    return request({
        url: URL_REGISTER,
        method: "post",
        data,
    });
}

export function loginAPI(data: LoginProps){
    return request({
        url: URL_LOGIN,
        method: "post",
        data,
    });
}

export function requestCodeAPI(data: Pick<LoginProps, 'email'>){
    return request({
        url: URL_FORGOT_PASSWORD,
        method: 'post',
        data
    })
}

export function validateCodeAPI(data: ValidateCodeProps){
    return request({
        url: URL_VALIDATE_CODE,
        method: 'post',
        data
    })
}

export function resetPassword(data: ResetPasswordProps){
    return request({
        url: URL_RESET_PASSWORD,
        method: 'put',
        data
    })
}

export function changePassword(data: ChangedPasswordProps){
    return request({
        url: URL_CHANGE_PASSWORD,
        method: 'post',
        data
    })
}

