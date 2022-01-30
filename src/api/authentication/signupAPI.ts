import request from '../../service/axiosService';
import { LoginProps, SignUpProps } from '../../shared/type';

const URL_SIGNUP = "/auth/register";

export function signupAPI(data: SignUpProps){
    return request({
        url: URL_SIGNUP,
        method: "post",
        data,
    });
}