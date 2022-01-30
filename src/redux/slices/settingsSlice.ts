import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import { ColorSchemeName } from 'react-native';


interface SettingsState {
    mode: ColorSchemeName,
    language: string,
}

const initialState: SettingsState = {
    mode: 'light',
    language: 'en',
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
        }
    }
})

export const {
    setMode, 
    setLanguage,
} = settingsSlice.actions

export default settingsSlice.reducer