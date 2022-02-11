import request from '../service/axiosService';
import { LoginProps, RegisterProps } from '../shared/type';

const URL_REGISTER = "/auth/register";
const URL_LOGIN = "api/auth/login";
const URL_LOGOUT = "api/logout";
const URL_FORGOT_PASSWORD = 'api/auth/password/forgot'

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

// export function logoutAPI(data: any){
//     return request({
//         url: URL_LOGOUT,
//         method: "get",
//         data,
//     });
// }

export function requestCodeAPI(data: Pick<LoginProps, 'email'>){
    return request({
        url: URL_FORGOT_PASSWORD,
        method: 'post',
        data
    })
}

