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
    textPrimary: {
        color: colors.primary,
        fontWeight: '700',
    },
})

export const lightMode = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.lightBackground,
    },
    text: {
        color: colors.textGray,
    },
    textPrimary: {
        color: colors.primary,
        fontWeight: '700',
    },
})

