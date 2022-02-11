import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RegisterProps} from '../../shared/type'

type UserState = Omit<RegisterProps, 'confirm' | 'password'>

const initialState: UserState = {
    email: '',
    phone: '',
    last_name:'',
    first_name: '',
    day_of_birth: '',
} 

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserRegister(state, action: PayloadAction<UserState>){},
        setUserRegisterSuccess(state, action){},
    }
})

export const {
    setUserRegister, 
    setUserRegisterSuccess,
} = userSlice.actions

export default userSlice.reducer