import { View, Text,TouchableOpacity } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'


const SearchBar = () => {
    const navigation = useNavigation()

  return (
    <View className="flex-row items-center space-x-2 pb-2 px-4 justify-between">
    <TouchableOpacity onPress={()=>navigation.navigate('SearchProduct')} className="bg-gray-200 rounded flex-row w-10/12 p-2 justify-center items-center space-x-2">
        <AntDesign name="search1" color="gray" size={20} />
        <Text className="text-gray-400">What are you looking for ?</Text>
    </TouchableOpacity>

    <View className="mr-2">    
    <AntDesign name="pluscircle" onPress={()=>navigation.navigate('AddProduct')} size={30} color="gray" />
    </View>
</View>
  )
}

export default SearchBar