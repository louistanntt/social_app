import React from 'react'
import { View, StyleSheet } from 'react-native'

interface IProps {
}

const PurePie = (props: IProps) => {
    const data = [
        {
           id: 1,
           color: 'red',
           value: 1,
        },
        {
           id: 2,
           color: 'green',
           value: 2,
        },
        {
           id: 2,
           color: 'yellow',
           value: 4,
        }
    ]

    return (
        <View>

        </View>
    )
}
const styles = StyleSheet.create({
})
export default PurePie