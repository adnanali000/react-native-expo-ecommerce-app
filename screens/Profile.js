import React,{useState,useEffect} from 'react'
import {useWindowDimensions, View,Image, Text , StyleSheet,TouchableOpacity,TextInput,SafeAreaView,ScrollView} from 'react-native'
import { auth,db } from '../firebase';
import CustomButton from '../components/CustomButton';
import { MaterialIcons } from '@expo/vector-icons';


const Profile = ({navigation}) => {
  const {height} = useWindowDimensions();
  const userId = auth.currentUser.uid; 
  const [userData,setUserData] = useState('');
  const [loading, setLoading] = useState(true);

  //get current user
  const getUser = async()=>{
    const currentUser = await db
    .collection('Users')
    .doc(userId)
    .get()
    .then((documentSnapshot)=>{
        if(documentSnapshot.exists){
            // console.log('user data',documentSnapshot.data());
            setUserData(documentSnapshot.data())
          
        }
    });
}    

useEffect(()=>{
  getUser();
  navigation.addListener('focus',()=>setLoading(!loading));
},[navigation,loading])



  const HandleSignout = ()=>{
    auth.signOut()
    .then(()=>{
    navigation.replace('Signin');
}).catch(error=>alert(error.message));
}

const handleEditProfile = () => {
  navigation.navigate('EditProfile')
}
const handleEditEmail = () => {
  // navigation.navigate('EditEmail')
  console.log("edit email")
}
  return (
    <SafeAreaView className="flex-1 mb-[60px]">
      <ScrollView className="pb-[100px]">
      <View className="w-full flex items-end">
        <TouchableOpacity onPress={HandleSignout} className="mr-4">
        <MaterialIcons name="logout" size={30} color="#FCB424" />
        </TouchableOpacity>
        </View>
        <View className="flex items-center mb-4">
          <Image source={{uri: userData ? userData.userImg || 'https://cdn2.iconfinder.com/data/icons/facebook-51/32/FACEBOOK_LINE-01-512.png' : 'https://cdn2.iconfinder.com/data/icons/facebook-51/32/FACEBOOK_LINE-01-512.png'}} resizeMode="contain" className="h-32 w-32 rounded-full" />
        </View>

        <View className="px-4">
            <View className="w-full flex-col justify-start border-b border-gray-800">
              <Text className="text-gray-400 text-lg font-bold">NAME</Text>
              <Text className="font-bold text-lg .border-b flex pt-1 pb-2">{`${userData ? userData.name || 'No details added' : ''}`}</Text>
            </View>
            <View className="w-full flex-col justify-start border-b pt-4 border-gray-800">
              <Text className="text-gray-400 text-lg font-bold">EMAIL ADDRESS</Text>
              <Text className="font-bold text-lg .border-b flex pt-1 pb-2">{`${userData ? userData.email || 'No details added' : ''}`}</Text>
            </View>
            <View className="w-full flex-col justify-start border-b pt-4 border-gray-800">
              <Text className="text-gray-400 text-lg font-bold">PHONE</Text>
              <Text className="font-bold text-lg .border-b flex pt-1 pb-2">{`${userData ? userData.number || 'No details added' : ''}`}</Text>
            </View>
            <View className="w-full flex-col justify-start border-b pt-4 border-gray-800">
              <Text className="text-gray-400 text-lg font-bold">COUNTRY</Text>
              <Text className="font-bold text-lg .border-b flex pt-1 pb-2">{`${userData ? userData.country || 'No details added' : ''}`}</Text>
            </View>
            <View className="w-full flex-col justify-start border-b pt-4 border-gray-800">
              <Text className="text-gray-400 text-lg font-bold">CITY</Text>
              <Text className="font-bold text-lg .border-b flex pt-1 pb-2">{`${userData ? userData.city || 'No details added' : ''}`}</Text>
            </View>
        </View>
        
        <View className="w-full flex px-4 items-center flex-row mt-4 justify-between">
          <View className="w-5/12">
          <CustomButton text="Edit Profile" type="TERTIARY" onPress={handleEditProfile}/>
          </View>
        <View className="w-5/12">
          <CustomButton text="Edit Email" type="TERTIARY" onPress={handleEditEmail}/>
        </View>
        </View>
      </ScrollView>

    </SafeAreaView>
  )
}

export default Profile