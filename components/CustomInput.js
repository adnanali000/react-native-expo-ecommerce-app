import { View, Text,TextInput } from 'react-native'
import React from 'react'

const CustomInput = ({value,setValue,placeholder,secureTextEntry}) => {
    return (
        <View className="bg-white w-full border-2 rounded-sm  border-solid border-gray-400 px-2 py-3 my-2">
            <TextInput
            value={value}
            onChangeText={setValue}
            placeholder={placeholder} 
            secureTextEntry={secureTextEntry}
            placeholderTextColor="gray"
            className="text-gray-600"
            />
        </View>
    )
}


export default CustomInput