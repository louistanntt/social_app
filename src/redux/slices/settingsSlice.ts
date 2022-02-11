import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import { ColorSchemeName } from 'react-native';



interface SettingsState {
    mode: ColorSchemeName,
    language: string,
    token: string,
    remember: boolean
}

const initialState: SettingsState = {
    mode: 'light',
    language: 'en',
    token: '',
    remember: false,
} 

const settingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {
        setMode(state: SettingsState, action: PayloadAction<ColorSchemeName>){
            state.mode = action.payload;
        },
        setLanguage(state: SettingsState, action: PayloadAction<string>){
            state.language = action.payload;
        },
        setToken(state: SettingsState, action: PayloadAction<string>){
            state.token = action.payload
        },
        setRemember(state: SettingsState, action: PayloadAction<boolean>){
            state.remember = action.payload
        }
    }
})

export const {
    setMode, 
    setLanguage,
    setToken,
    setRemember
} = settingsSlice.actions

export default settingsSlice.reducer