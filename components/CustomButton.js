import React from 'react'
import { View, Text , StyleSheet ,Pressable } from 'react-native'

const CustomButton = ({onPress,text,type="PRIMARY"}) => {
    return (
        <Pressable onPress={onPress} className="bg-yellow-500"  style={[styles.container]}>
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
        borderRadius:5
    },
    container_PRIMARY:{
        backgroundColor:'#5e35b1'
    },
    container_TERTIARY:{
        backgroundColor:'#4EB1B3',
    },
})

export default CustomButton