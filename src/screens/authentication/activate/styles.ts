import React from "react";
import { StyleSheet } from "react-native"; 
import colors from '../../../config/colors'
import { scale, verticalScale, moderateScale } from "../../../utilities/functions/scaling";

export const darkMode = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.darkBackground,
    },
    pinContent: {
        flex: 3,
        alignItems: 'center',
        backgroundColor: colors.darkSecondary,
        borderBottomLeftRadius: moderateScale(20),
        borderBottomRightRadius: moderateScale(20),
        paddingVertical: verticalScale(20),
    },
    text: {
        fontSize: 16,
        textAlign: 'center',
        color: colors.gray,
    },
    textNumber: {
        color: colors.lightGray
    },
    numericKey: {
        borderRadius: moderateScale(5),
        backgroundColor: colors.dark,
        alignItems: 'center',
        justifyContent: 'center',
        margin: moderateScale(5),
    },
    pinBox: {
        backgroundColor: colors.dark,
        borderRadius: moderateScale(10),
        width: scale(45),
        height: scale(45),
        justifyContent: 'center',
        alignItems: 'center',
    },
   
})

export const lightMode = StyleSheet.create({
    container: {
        flex: 1,
    },
    pinContent: {
        flex: 3,
        alignItems: 'center',
        backgroundColor: colors.white,
        borderBottomLeftRadius: moderateScale(20),
        borderBottomRightRadius: moderateScale(20),
        paddingVertical: verticalScale(20),
    },
    text: {
        fontSize: 16,
        textAlign: 'center',
        color: colors.gray,
    },
    textNumber: {
        color: colors.gray
    },
    numericKey: {
        borderRadius: moderateScale(5),
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        margin: moderateScale(5),
    },
    pinBox: {
        backgroundColor: colors.lightSecondary,
        borderRadius: moderateScale(10),
        width: scale(45),
        height: scale(45),
        justifyContent: 'center',
        alignItems: 'center',
    },
})