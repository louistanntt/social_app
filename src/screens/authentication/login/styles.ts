import React from "react";
import { StyleSheet } from "react-native"; 
import colors from '../../../config/colors'

export const darkMode = StyleSheet.create({
    text: {
        color: colors.white 
    }
})

export const lightMode = StyleSheet.create({
    text: {
        color: colors.textGray
    }
})

