import React from 'react'
import { View, Text , StyleSheet ,Pressable } from 'react-native'

const CustomButton = ({onPress,text,type="PRIMARY"}) => {
    return (
        <Pressable onPress={onPress} style={[styles.container,styles[`container_${type}`]]}>
            <Text className="text-white font-bold">{text}</Text>
        </Pressable>
    )
}


const styles = StyleSheet.create({
    container:{
        width:'100%',
        padding:15,
        marginVertical:5,
        alignItems:'center',
        borderRadius:20
    },
    container_PRIMARY:{
        backgroundColor:'#FCB424'
    },
    container_TERTIARY:{
        backgroundColor:'#4EB1B3',
    },
})

export default CustomButton