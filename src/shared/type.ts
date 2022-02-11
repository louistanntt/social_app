export type  LoginProps = {
    email: string;
    password: string;
    remember_me: boolean;
};

export type RegisterProps = Omit<LoginProps, "remember_me"> & {
    confirm: string;
    phone: string; 
    first_name: string;
    last_name: string;
    day_of_birth: string;
}


export type ToastProps = {
    text: string; type:string ; duration:number ; text2?:string
}