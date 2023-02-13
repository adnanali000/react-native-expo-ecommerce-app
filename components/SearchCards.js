import { View, Text,Alert, TouchableOpacity, Image, ScrollView,Pressable } from 'react-native'
import React,{useState} from 'react'
import { AntDesign,Entypo } from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native'
import { auth, db } from '../firebase';

const SearchCards = ({data}) => {
const navigation = useNavigation();


  return (
    <View>
        <ScrollView
      vertical
      contentContainerStyle={{
        paddingHorizontal: 15
      }}
      showsVerticalScrollIndicator={false}
      className="mb-10"
    >

    {data?.map((item)=>(
   
   <View key={item.id} className="bg-[#18191a] mb-3 shadow-lg border-gray-800">
   
    <TouchableOpacity
   
    onPress={() => navigation.navigate('ProductDetail',item)}
    >
        <View className="w-full flex items-center pt-2">

        <Image 
            source={{
                uri: item.productImg
            }}
            className="w-40 h-40 rounded-sm object-contain"
            />
        </View>
    </TouchableOpacity>
    

        <View className="px-3 pb-4">
            <View className="w-full flex-row pt-2 items-center justify-between">
            <Text className="font-bold text-lg text-yellow-500">{item.productTitle}</Text>
           
            </View>
    
            <View className="flex-row items-center space-x-1">
                <AntDesign name="star" size={18} color="#FF9529" />
                <Text className="text-white"> 
                   <Text className="text-yellow-500">{item.productCondition}</Text> ~ {item.productType}
                </Text>
            </View>

            <View className="flex-row items-center space-x-1 mt-1">
                <Text numberOfLines={2} className="text-xs text-white w-[260px]">{item.productDes}</Text>
            </View>
        </View>    
    </View>
    
))}
    </ScrollView>
    </View>
  )
}

export default SearchCards