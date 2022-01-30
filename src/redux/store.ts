import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import settingsReducer from './slices/settingsSlice'
const rootReducer = combineReducers({
  user: userReducer,
  settings: settingsReducer
})


const store = configureStore({
  reducer: rootReducer,
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store