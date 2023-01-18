import { View, Text,useWindowDimensions,Alert,SafeAreaView,ActivityIndicator, Image,ScrollView } from 'react-native'
import React,{useEffect,useState,useLayoutEffect} from 'react'
import { useNavigation } from '@react-navigation/native'
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import Logo from '../assets/logo.png'
import {auth,db} from '../firebase';

const SignupScreen = () => {
  const navigation = useNavigation()
  const [loading, setLoading] = useState(false);
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [userName,setUserName] = useState('');
  const [number,setNumber] = useState('')
  const [confirmPassword,setConfirmPassword] = useState('')

  useLayoutEffect(() => {
    navigation.setOptions({
        headerShown: false
    })
}, [])

if (loading) {
  return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#0e9c99" />
      </View>
  );
}

const onSignInPressed = ()=>{
  navigation.navigate('Signin')
}


const userRef = db.collection('Users')

const onSignUpPressed = ()=>{
  if(userName && email && password && confirmPassword && number){
    if(password != confirmPassword){
        alert('password does not match')
    }else{
        setLoading(true)
        auth.createUserWithEmailAndPassword(email,password)
        .then(userCredentials => {
            const user = userCredentials.user; 
            userRef.doc(`${user.uid}`).set({
                name: userName,
                email: email,
                number: number,
                uid: user.uid
            })
            setUserName("")
            setEmail("")
            setNumber("")
            setPassword("")
            setConfirmPassword("")
            setLoading(false)
            Alert.alert("Success","User created Successully")
            setTimeout(()=>{
              navigation.navigate("Home")
            },2000)
        })
        .catch(error => alert(error.message));
    }
    }else{
        alert('Invalid input')
    }   
}


  return (
      <ScrollView showsVerticalScrollIndicator={false} >
    <SafeAreaView className="flex-1 w-full bg-white justify-center items-center">
    {/* <View>
      <Image source={Logo} className="w-[140px] h-[160px]" resizeMode="contain" />
    </View> */}
    <View className="flex justify-start w-10/12 my-4">
      <Text className="text-2xl text-[#FCB424] font-bold">Sign Up</Text>
    </View>
    <View className="flex flex-col justify-start w-10/12">
      <Text className="text-lg text-[#4FA3A5]">Name</Text>
      <CustomInput value={userName} setValue={setUserName} placeholder="full name" />
    </View>  
    <View className="flex flex-col justify-start w-10/12">
      <Text className="text-lg text-[#4FA3A5]">Email</Text>
      <CustomInput value={email} setValue={setEmail} placeholder="abc@example.com" />
    </View>  
    <View className="flex flex-col justify-start w-10/12">
      <Text className="text-lg text-[#4FA3A5]">Contact No.</Text>
      <CustomInput value={number} setValue={setNumber} placeholder="03123456789" />
    </View>  
    <View className="flex flex-col justify-start w-10/12">
      <Text className="text-lg text-[#4FA3A5]">Password</Text>
      <CustomInput value={password} setValue={setPassword} placeholder="7+ character" secureTextEntry={true} />
    </View>  
    <View className="flex flex-col justify-start w-10/12">
      <Text className="text-lg text-[#4FA3A5]">Cofirm Password</Text>
      <CustomInput value={confirmPassword} setValue={setConfirmPassword} placeholder="Retype password" secureTextEntry={true} />
    </View>  
    <View className="w-10/12 py-2">
    <CustomButton onPress={onSignUpPressed} text="Sign Up" />
    </View>
    <View className="w-10/12">
    <CustomButton text="Already have an account? Sign in" onPress={onSignInPressed} type="TERTIARY" />
    </View> 
    <Text className="h-[100px]"></Text>
    </SafeAreaView>
    </ScrollView>
  )
}

export default SignupScreen