import { View, Text,useWindowDimensions,Alert,SafeAreaView,ActivityIndicator, Image,ScrollView,TouchableOpacity } from 'react-native'
import React,{useEffect,useState,useLayoutEffect} from 'react'
import { useNavigation } from '@react-navigation/native'
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import Logo from '../assets/images/logo.jpg'
import {auth,db} from '../firebase';
import { Ionicons } from '@expo/vector-icons';


const SignupScreen = () => {
  const navigation = useNavigation()
  const [loading, setLoading] = useState(false);
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [userName,setUserName] = useState('');
  const [number,setNumber] = useState('')
  const [confirmPassword,setConfirmPassword] = useState('')
  const [showPassword,setShowPassword] = useState(false)


  useLayoutEffect(() => {
    navigation.setOptions({
        headerShown: false
    })
}, [])

if (loading) {
  return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:'black' }}>
          <ActivityIndicator size="large" color="#e8ca09" />
      </View>
  );
}

const onSignInPressed = ()=>{
  navigation.navigate('Signin')
}


const userRef = db.collection('Users')

const onSignUpPressed = ()=>{
  if(userName && email && password && number){
    // if(password != confirmPassword){
    //     alert('password does not match')
    // }else{
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
    // }
    }else{
        alert('Invalid input')
    }   
}


  return (
      <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor:'black'}} >
    <SafeAreaView className="flex-1 w-full bg-[black] justify-center items-center">
    <View className="flex justify-center items-center mt-16">
      <Text className="text-2xl text-[#606060] font-bold">Create an account</Text>
    </View>
    <View>
      <Image source={Logo} className="w-[110px] h-[110px]" resizeMode="contain" />
    </View>
   
    <View className="flex flex-col justify-start w-10/12" style={{marginTop:40}} >
      {/* <Text className="text-lg text-white">Full Name</Text> */}
      <CustomInput value={userName} setValue={setUserName} placeholder="Full name" />
    </View>  
    <View className="flex flex-col justify-start w-10/12" style={{marginTop:40}}>
      {/* <Text className="text-lg text-white">Email</Text> */}
      <CustomInput value={email} setValue={setEmail} placeholder="Email" />
    </View>  
    <View className="flex flex-col justify-start w-10/12" style={{marginTop:40}}>
      {/* <Text className="text-lg text-white">Contact No.</Text> */}
      <CustomInput value={number} setValue={setNumber} placeholder="Phone" />
    </View>  
    <View className="flex flex-col justify-start w-10/12 mt-1">
      <View className="flex justify-between flex-row items-center w-full">
        <View>
        {/* <Text className="text-lg text-white">Password</Text> */}
        </View>
        <View style={{marginTop:25}}>
          <TouchableOpacity onPress={()=>setShowPassword(!showPassword)}>
            <Ionicons name={showPassword ? 'eye-outline':'eye-off-sharp'} size={24} color="#606060" />
          </TouchableOpacity>
        </View>
      </View>
      <CustomInput value={password} setValue={setPassword} placeholder="Password" secureTextEntry={showPassword ? false : true} />
    </View>  
    {/* <View className="flex flex-col justify-start w-10/12">
      <Text className="text-lg text-white">Cofirm Password</Text>
      <CustomInput value={confirmPassword} setValue={setConfirmPassword} placeholder="Retype password" secureTextEntry={true} />
    </View>   */}
    <View className="w-10/12 py-2" style={{marginTop:40}}>

    <CustomButton onPress={onSignUpPressed} text="Sign Up" />
    </View>
    <View className="w-full flex items-center">
    <Text className="text-lg text-[#606060] font-semibold">Already have an account ? <Text onPress={onSignInPressed} className="text-yellow-500 font-bold ">Login</Text></Text>
  
    {/* <CustomButton text="Already have an account? Sign in" onPress={onSignInPressed} type="TERTIARY" /> */}
    </View> 
    <Text className="h-[100px]"></Text>
    </SafeAreaView>
    </ScrollView>
  )
}

export default SignupScreen