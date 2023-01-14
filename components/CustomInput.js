import { View, Text,TextInput } from 'react-native'
import React from 'react'

const CustomInput = ({value,setValue,placeholder,secureTextEntry}) => {
    return (
        <View className="bg-white w-full border rounded-xl  border-solid border-[#4FA3A5] px-3 py-4 my-2">
            <TextInput
            value={value}
            onChangeText={setValue}
            placeholder={placeholder} 
            secureTextEntry={secureTextEntry}
            placeholderTextColor="#dae0db"
            className="text-gray-600"
            />
        </View>
    )
}


export default CustomInput