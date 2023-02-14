import React from 'react'
import { View, Text , StyleSheet , Image , useWindowDimensions } from 'react-native'

const Onboardingitems = ({item}) => {
    const {width} = useWindowDimensions();

    return (
        <View style={styles.container , {width}}>
            <Image source={item.image} style={[styles.image,{width,resizeMode:'contain'}]} />
            <View style={{flex:0.3}}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
            </View>

        </View>
    )
}

const styles=StyleSheet.create({
    container:{
      flex:1,
      justifyContent:'center',
      alignItems:'center'
    },
    image:{
        flex:0.7,
        justifyContent:'center',
    },
    title:{
        fontSize:24,
        color:'white',
        fontWeight:'600',
        textAlign:'center',
        marginBottom:10
    },
    description:{
        fontWeight:'300',
        color:'gray',
        textAlign:'center',
        paddingHorizontal:64,
        lineHeight:20
    }

})

export default Onboardingitems