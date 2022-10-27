import {ActivityIndicator, View, Pressable ,Text, SafeAreaView, Image,Alert, TextInput, ScrollView,TouchableOpacity } from 'react-native'
import React, { useEffect, useLayoutEffect,useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons';
import Logo from '../assets/logo.png'
import Categories from '../components/Categories';
import { auth, db } from '../firebase';
import VerticalCard from '../components/VerticalCard';



const FavouriteScreen = () => {
    const navigation = useNavigation()
    const [loading, setLoading] = useState(false);
    const [favourites,setFavourites] = useState([])
    const user_id  = auth.currentUser.uid; 

    console.log(user_id)

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])

    const getFavourites = async ()=>{
      try{

        await db.collection('Favourites').where('userid','==',user_id)
        .onSnapshot(querySnapshot => {
            const favourite = [];
            querySnapshot.forEach(documentSnapshot => {
                favourite.push({
                    ...documentSnapshot.data(),
                    id: documentSnapshot.id,
                })
            });
            setFavourites(favourite);
            setLoading(false);
            console.log(favourite)
        });
      }catch(err){
        Alert.alert("Error","Server error")
      }
    }

   
   

    useEffect(()=>{
      console.log(user_id)
        getFavourites()
    },[])
  
if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0e9c99" />
      </View>
    );
  }


    return (
        <SafeAreaView className="bg-white pt-5">
            {/* header  */}
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
                    <Image source={{ uri: 'https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=604' }} style={{ width: 40, height: 40, borderRadius: 20 }} />
                </TouchableOpacity>
                </View>

            {/* search  */}
            <View className="flex-row items-center space-x-2 pb-2 mx-4">
                <View className="flex-row space-x-2 flex-1 bg-gray-200 p-3">
                    <AntDesign name="search1" color="gray" size={20} />
                    <TextInput
                        placeholder='Mobile Laptop and Gadgets'
                        keyboardType='default'
                    />
                </View>

                <AntDesign name="pluscircle" onPress={()=>navigation.navigate('AddProduct')} size={30} color="#FCB424" />
            </View>

            {/* Body */}
            <ScrollView
                className="bg-gray-100"
                contentContainerStyle={{
                    paddingBottom: 100
                }}
            >
             
                {/* Mobile  */}

                 {favourites &&  
                  <>
                  <View className="mt-4 flex-row items-center justify-between px-4">
                    <Text className="font-bold text-lg text-[#4EB1B3]">Your Favourit Products</Text>
                {/* <AntDesign name="arrowright" size={24} color="#4EB1B3" /> */}
                </View>
                
                <VerticalCard data={favourites} dataRef="Favourites"  />
                  </>
                }
               
              
        </ScrollView>
        </SafeAreaView>
    )
}

export default FavouriteScreen