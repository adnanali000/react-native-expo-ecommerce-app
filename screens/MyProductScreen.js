import {ActivityIndicator, View, Pressable ,Text, SafeAreaView, Image,Alert, TextInput, ScrollView,TouchableOpacity } from 'react-native'
import React, { useEffect, useLayoutEffect,useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons';
import Categories from '../components/Categories';
import { auth, db } from '../firebase';
import VerticalCard from '../components/VerticalCard';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';


const MyProductScreen = () => {
    const navigation = useNavigation()
    const [loading, setLoading] = useState(false);
    const [products,setProducts] = useState([])
    const user_id  = auth.currentUser.uid; 

    console.log(user_id)

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])

    const getProducts = async ()=>{
      try{

        await db.collection('AllProducts').where('userid','==',user_id)
        .onSnapshot(querySnapshot => {
            const product = [];
            querySnapshot.forEach(documentSnapshot => {
                product.push({
                    ...documentSnapshot.data(),
                    id: documentSnapshot.id,
                })
            });
            setProducts(product);
            setLoading(false);
            console.log(product)
        });
      }catch(err){
        Alert.alert("Error","Server error")
      }
    }

   
   

    useEffect(()=>{
      console.log(user_id)
        getProducts()
    },[])
  
if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#5e35b1" />
      </View>
    );
  }


    return (
        <SafeAreaView className="bg-white pt-5">
            {/* header  */}
           <Header />

            {/* search  */}
           <SearchBar />

            {/* Body */}
            <ScrollView
                className="bg-gray-100"
                contentContainerStyle={{
                    paddingBottom: 100
                }}
            >
             
                {/* Mobile  */}

                 {products.length > 0 ?
                 (
                     <>
                  <View className="mt-4 flex-row items-center justify-between px-4">
                    <Text className="font-bold text-lg text-purple-600">Your Products</Text>
                </View>
                
                    <VerticalCard data={products} dataRef="AllProducts" />
                  </>
                     )  : (
                        
                        <>
                        <View className="flex items-center h-72 justify-center">
                            <Text className="font-bold text-lg text-purple-600">No Products</Text>
                        </View>
                        </>
                     )
                }
               
              
        </ScrollView>
        </SafeAreaView>
    )
}

export default MyProductScreen