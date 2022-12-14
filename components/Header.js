import { View, Text,Image,TouchableOpacity } from 'react-native'
import React,{useState,useEffect} from 'react'
import { useNavigation } from '@react-navigation/native'
import Logo from '../assets/logo.png'
import { AntDesign } from '@expo/vector-icons';
import { auth, db } from '../firebase';




const Header = () => {
    const navigation = useNavigation();
    const [userData,setUserData] = useState('');
    const userId = auth.currentUser.uid; 
    
    
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
        getUser()
    },[])

  return (
    <View className="flex-row pb-3 items-center mx-4 space-x-2">
                <Image
                    source={Logo}
                    className="h-7 w-7 bg-gray-300 p-4 rounded-full"
                />

                <View className="flex-1">
                    <Text className="font-bold text-gray-400 text-xs">Welcome!</Text>
                    <Text className="font-bold text-xl text-[#4EB1B3]">
                        Tech Store
                        <AntDesign name="down" size={18} color="#4EB1B3" />
                    </Text>
                </View>
                
                <TouchableOpacity onPress={()=>navigation.navigate('Profile')}>
                    <Image source={{ uri: userData ? userData.userImg || 'https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=604' : 'https://cdn2.iconfinder.com/data/icons/facebook-51/32/FACEBOOK_LINE-01-512.png' }} style={{ width: 40, height: 40, borderRadius: 20 }} />
                </TouchableOpacity>
                </View>
  )
}

export default Header