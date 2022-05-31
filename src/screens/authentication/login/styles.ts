import React from "react";
import { StyleSheet } from "react-native"; 
import colors from '../../../config/colors'

export const darkMode = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.darkBackground,
    },
    text: {
        color: colors.white 
    },
   
})

export const lightMode = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.lightBackground,
    },
    text: {
        color: colors.textGray
    },
   
})

