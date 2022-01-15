import {createSlice, PayloadAction} from '@reduxjs/toolkit'

interface UserState {
    userName: string,
    phoneNumber: string
}

type T = {
    email: string,
    password: string
}

const initialState: UserState = {
    userName: '',
    phoneNumber: '+84',
} 

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserName(state, action: PayloadAction<T>){},
        setUserNameSuccess(state, action){}
    }
})

export const {
    setUserName, 
    setUserNameSuccess,
} = userSlice.actions

export default userSlice.reducer