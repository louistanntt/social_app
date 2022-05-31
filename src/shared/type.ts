export type  LoginProps = {
    email: string;
    password: string;
    remember_me: boolean;
};

export type RegisterProps = Omit<LoginProps, "remember_me"> & {
    phone: string; 
    first_name: string;
    last_name: string;
    date_of_birth?: string;
}

export type ValidateCodeProps = Pick<LoginProps, 'email'> & {
    active_code?: string,
    reset_code?: string,
}

export type ChangedPasswordProps = {
    old_password: string,
    new_password: string,
    confirm_password: string,
}

export type ResetPasswordProps = Omit<ChangedPasswordProps, 'old_password'> & {
    email: string, 
    reset_code: string
}

export type ToastProps = {
    text: string; type:string ; duration:number ; text2?:string
}