import request from '../../service/axiosService';
import { LoginProps } from '../../shared/type';

const URL_LOGIN = "/auth/login";
const URL_LOGOUT = "/logout";

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