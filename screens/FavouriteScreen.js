import { View, Text } from 'react-native'
import React,{useLayoutEffect} from 'react'

const FavouriteScreen = ({navigation}) => {
    
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])

  return (
    <View>
      <Text>FavouriteScreen</Text>
    </View>
  )
}

export default FavouriteScreen