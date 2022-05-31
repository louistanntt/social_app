import React, { memo, useEffect, useState } from 'react'
import { View, StyleSheet, StyleProp, ViewStyle, Animated, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import colors from '../config/colors'
import { AntIcon } from './Icons'

type FloatingButtonProps = {
    style?: StyleProp<ViewStyle>,
    children?: any,
    navigation?: any,
    projectInfo?: any
}

const FloatingButton = (props: FloatingButtonProps) => {
    const { style, children, navigation, projectInfo } = props
    const [open, setOpen] = useState(false)

    const [animation] = useState(new Animated.Value(0))

    // useEffect(() => {
    //     const toValue = open ? 0 : 1;
    //     console.log(open)
    //     if(open){
    //     //     // console.log('1')
    //         Animated.timing(animation, {
    //             toValue: toValue,
    //             duration: 500,
    //             useNativeDriver: false
    //         }).start()
    //     }else{
    //         // console.log('value',animation)
    //         // console.log('2')
    //         Animated.timing(animation, {
    //             toValue: toValue,
    //             duration: 500,
    //             useNativeDriver: false
    //         }).start()
    //     }
    // }, [open])

    const toggleMenu = () => {
        const toValue = open ? 0 : 1;
        Animated.spring(animation, {
            toValue: toValue,
            friction: 5,
            useNativeDriver: false
        }).start()
        setOpen(!open)
    }

    const createTaskStyle = {
        transform: [
            {scale: animation},
            {
                translateY: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -80]
                }) 
            }
        ]
    }

    const createStageStyle = {
        transform: [
            {scale: animation},
            {
                translateY: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -140]
                }) 
            }
        ]
    }
    
    const rotation =  {
        transform: [
            {
                rotate: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '45deg'],
                })
            }
        ]
    }

    return (
        <View style={[styles.container, style]}>
            {/* {children} */}
            <TouchableWithoutFeedback onPress={() => console.log('haha')}>
                <Animated.View style={[styles.mainButton, styles.secondaryButton]}> 
                    <AntIcon name='staro' size={20} color={'white'}/>  
                </Animated.View> 
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => console.log('haha')}>
                <Animated.View style={[styles.mainButton, styles.secondaryButton, createStageStyle]}> 
                    <AntIcon name='questioncircleo' size={20} color={'white'}/>  
                </Animated.View> 
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => console.log('huhu')}>
                <Animated.View style={[styles.mainButton, styles.secondaryButton, createTaskStyle]}> 
                    <AntIcon name='infocircleo' size={20} color={'white'}/>  
                </Animated.View> 
            </TouchableWithoutFeedback> 
            <TouchableWithoutFeedback onPress={() => toggleMenu()}>
                <Animated.View style={[styles.mainButton, rotation]} >
                    <AntIcon name='plus' size={30} color={'white'}/>
                </Animated.View>
            </TouchableWithoutFeedback>        
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        alignItems: 'center'
    },
    mainButton: {
        position: 'absolute',
        width: 60,
        height: 60,
        borderRadius: 60 /2,
        backgroundColor: colors.primary,
        shadowColor: '#000000',
        shadowRadius: 5,
        shadowOffset: { height: 10, width: 7 },
        shadowOpacity: 0.15,
        elevation: 3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    secondaryButton: {
        // position: 'absolute',
        width: 40,
        height: 40,
        borderRadius: 40 / 2,
        // backgroundColor: settingApp.blueSky,
        // shadowColor: '#000000',
        // shadowRadius: 5,
        // shadowOffset: { height: 10, width: 7 },
        // shadowOpacity: 0.15,
        // elevation: 3,
        // justifyContent: 'center',
        // alignItems: 'center'
    }
})

export default memo(FloatingButton)