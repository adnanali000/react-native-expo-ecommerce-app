import { View, Text,TouchableOpacity,Image } from 'react-native'
import React from 'react'
import {useNavigation} from '@react-navigation/native'


const ProductRow = ({ 
    id, 
    productTitle, 
    productDes, 
    productPrice, 
    productImg,
    productCondition,
    phone,
    productType,
    userid,
    username,
}) => {

    const navigation = useNavigation();

  return (
    <>
            <TouchableOpacity onPress={() => navigation.navigate('ProductDetail',{ 
    id, 
    productTitle, 
    productDes, 
    productPrice, 
    productImg,
    productCondition,
    phone,
    productType,
    userid,
    username,
})}
                 className={`bg-[#18191a] p-4 border border-gray-800 mt-2 shadow-lg mx-2`}>
                <View className="flex-row">
                    <View className="flex-1 pr-2">
                        <Text className="text-lg mb-1 text-yellow-500">{productTitle}</Text>
                        <Text className="text-white">{productDes}</Text>
                        <Text className="text-yellow-500 mt-2">
                            Rs.{productPrice}
                            {/* <Currency quantity={price} currency="PKR" /> */}
                        </Text>
                    </View>
                    <View>
                        <Image
                            source={{
                                uri: productImg
                            }}
                            style={{
                                borderWidth: 1,
                                borderColor: "black"
                            }}
                            className="h-20 w-20 p-4"
                        />
                    </View>
                </View>
            </TouchableOpacity>
            </>
  )
}

export default ProductRow