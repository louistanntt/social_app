import request from '../../service/axiosService';
import { LoginProps, RegisterProps } from '../../shared/type';

const URL_REGISTER = "/auth/register";

export function registerAPI(data: RegisterProps){
    return request({
        url: URL_REGISTER,
        method: "post",
        data,
    });
}