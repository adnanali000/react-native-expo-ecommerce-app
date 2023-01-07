import {ActivityIndicator, View, Pressable ,Text, SafeAreaView, Image,Alert, TextInput, ScrollView,TouchableOpacity } from 'react-native'
import React, { useEffect, useLayoutEffect,useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons';
import Logo from '../assets/logo.png'
import Categories from '../components/Categories';
import { auth, db } from '../firebase';
import VerticalCard from '../components/VerticalCard';
import Header from '../components/Header';



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
            console.log("favousrites",favourite)
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
           <Header />

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

                 {favourites.length > 0 ? 
                 (

                   <>
                  <View className="mt-4 flex-row items-center justify-between px-4">
                    <Text className="font-bold text-lg text-[#4EB1B3]">Your Favourit Products</Text>
                {/* <AntDesign name="arrowright" size={24} color="#4EB1B3" /> */}
                </View>
                
                <VerticalCard data={favourites} dataRef="Favourites" />
                  </>
                   ): (
                    <View className="flex items-center h-72 justify-center">
                      <Text className="font-bold text-lg text-[#4EB1B3]">Your Favourit Product list is empty</Text>
                    </View>
                   ) 
                }
               
              
        </ScrollView>
        </SafeAreaView>
    )
}

export default FavouriteScreen