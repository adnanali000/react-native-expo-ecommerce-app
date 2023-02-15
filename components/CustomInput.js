import { View, Text,TextInput } from 'react-native'
import React from 'react'

const CustomInput = ({value,setValue,placeholder,secureTextEntry}) => {
    return (
        <View className="bg-white w-full border-2 rounded-sm  border-solid border-[#18191a]  ">
            <TextInput
            value={value}
            onChangeText={setValue}
            placeholder={placeholder} 
            secureTextEntry={secureTextEntry}
            placeholderTextColor="gray"
            className="text-gray-600"
            style={{
                backgroundColor:'#18191a', 
                height:45
        }}
            />
        </View>
    )
}


export default CustomInput