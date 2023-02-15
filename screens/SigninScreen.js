import { View, Text,useWindowDimensions,SafeAreaView,ActivityIndicator, Image ,TouchableWithoutFeedback,Keyboard, TouchableOpacity} from 'react-native'
import React,{useEffect,useState,useLayoutEffect} from 'react'
import { useNavigation } from '@react-navigation/native'
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { auth } from '../firebase';
import Logo from '../assets/images/logo.jpg'
import { Ionicons } from '@expo/vector-icons';

const SigninScreen = () => {
  const navigation = useNavigation()
  const [loading, setLoading] = useState(false);
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [showPassword,setShowPassword] = useState(false)

  useLayoutEffect(() => {
    navigation.setOptions({
        headerShown: false
    })
}, [])

useEffect(()=>{
  const unsubscribe = auth.onAuthStateChanged(user => {
      if(user){
          navigation.replace('Home')
      }
  })

  return unsubscribe;
},[])


if (loading) {
  return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:'black' }}>
          <ActivityIndicator size="large" color="#e8ca09" />
      </View>
  );
}

const onSignInPressed = ()=>{
  if(email && password){
    auth.signInWithEmailAndPassword(email,password)
    .then(userCredentials => {
        setLoading(true)
        const user = userCredentials.user;
        setLoading(false);
    })
    .catch(error => alert(error.message));

}
else{
    alert('Invalid input');
}
}

const onSignUpPressed = ()=>{
  navigation.navigate('Signup')
}


  return (
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
  }}>
         <SafeAreaView className="flex-1 bg-[black] justify-center items-center pb-20">

         <View className="flex justify-center items-center mt-10">
      <Text className="text-2xl text-[#606060] font-bold">Login In</Text>
    </View>
    <View>
      <Image source={Logo} className="w-[120px] h-[120px]" resizeMode="contain" />
    </View>
    <View className="flex flex-col justify-start w-10/12">
      {/* <Text className="text-lg text-white">Email</Text> */}
      <CustomInput value={email} setValue={setEmail} placeholder="Email" />
    </View>  
    <View className="flex flex-col justify-start w-10/12 mt-2">
      <View className="flex justify-between flex-row items-center w-full">
        <View>
        {/* <Text className="text-lg text-white">Password</Text> */}
        </View>
        <View>
          <TouchableOpacity onPress={()=>setShowPassword(!showPassword)}>
            <Ionicons name={showPassword ? 'eye-outline':'eye-off-sharp'} size={24} color="#606060" />
          </TouchableOpacity>
        </View>
      </View>
      <CustomInput value={password} setValue={setPassword} placeholder="Password" secureTextEntry={showPassword ? false : true} />
    </View>  
    <View className="w-10/12 py-4">
    <CustomButton onPress={onSignInPressed} text="Sign In" />
    </View>
    <View className="w-full flex items-center pb-20 text-center">
      <Text className="text-lg text-[#606060] font-semibold">Don't have an account ? <Text onPress={onSignUpPressed} className="text-yellow-500 font-bold ">Sign up</Text></Text>
    {/* <CustomButton text="Don't have an account? Create one" onPress={onSignUpPressed} type="TERTIARY" /> */}
    </View> 
    </SafeAreaView>
  </TouchableWithoutFeedback>
  )
}

export default SigninScreen