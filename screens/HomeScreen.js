import {ActivityIndicator, View, Pressable ,Text, SafeAreaView, Image, TextInput, ScrollView,TouchableOpacity } from 'react-native'
import React, { useEffect, useLayoutEffect,useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons';
import Logo from '../assets/logo.png'
import Categories from '../components/Categories';
import { auth, db } from '../firebase';
import ProductCard from '../components/ProductCard';



const HomeScreen = () => {
    const navigation = useNavigation()
    const [featuredCategories, setFeaturedCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [mobiles,setMobiles] = useState([])
    const [gadgets,setGadgets] = useState([])
    const [laptops,setLaptops] = useState([])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])

    const getMobiles = async ()=>{
        
            await db.collection('AllProducts').where('productType','==','Mobile')
            .onSnapshot(querySnapshot => {
            const mobile = [];
            querySnapshot.forEach(documentSnapshot => {
                mobile.push({
                    ...documentSnapshot.data(),
                    id: documentSnapshot.id,
                })
            });
            // setFilteredDataSource(mobile);
            setMobiles(mobile);
            setLoading(false);
            console.log(mobile)
        });
    }

    const getGadgets = async ()=>{       
        await db.collection('AllProducts').where('productType','==','Gadgets')
        .onSnapshot(querySnapshot => {
        const gadget = [];
        querySnapshot.forEach(documentSnapshot => {
            gadget.push({
                ...documentSnapshot.data(),
                id: documentSnapshot.id,
            })
        });
        // setFilteredDataSource(mobile);
        setGadgets(gadget);
        setLoading(false);
    });
}
    const getLaptops = async ()=>{       
        await db.collection('AllProducts').where('productType','==','Laptop')
        .onSnapshot(querySnapshot => {
        const laptop = [];
        querySnapshot.forEach(documentSnapshot => {
            laptop.push({
                ...documentSnapshot.data(),
                id: documentSnapshot.id,
            })
        });
        // setFilteredDataSource(mobile);
        setLaptops(laptop);
        setLoading(false);
    });
}

    useEffect(()=>{
        getMobiles()
        getGadgets()
        getLaptops()
    },[])


    const HandleSignout = ()=>{
        auth.signOut()
        .then(()=>{
        navigation.replace('Signin');
    }).catch(error=>alert(error.message));
}
  
if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0e9c99" />
      </View>
    );
  }

//   if (errorMessage) {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',color:'white' }}>
//         <Text style={{ fontSize: 18}}>
//           Error fetching data... Check your network connection!
//         </Text>
//       </View>
//     );
//   }


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
                {/* Categories */}
                <Categories />

                {/* Mobile  */}

                  {mobiles &&  
                  <>
                  <View className="mt-4 flex-row items-center justify-between px-4">
                    <Text className="font-bold text-lg text-[#4EB1B3]">Mobiles</Text>
                <AntDesign name="arrowright" size={24} color="#4EB1B3" />
                </View>
                
                <ProductCard data={mobiles} />
                  </>
                }

                {/* laptops  */}
                {laptops && 
               <>
               <View className="mt-4 flex-row items-center justify-between px-4">
                    <Text className="font-bold text-lg text-[#4EB1B3]">Laptops</Text>
                    <AntDesign name="arrowright" size={24} color="#4EB1B3" />
                </View>
                <ProductCard data={laptops} />
               </>
            }


                {/* Gadgets */}
                
               {gadgets && 
               <>
               <View className="mt-4 flex-row items-center justify-between px-4">
                    <Text className="font-bold text-lg text-[#4EB1B3]">Gadgets</Text>
                    <AntDesign name="arrowright" size={24} color="#4EB1B3" />
                </View>
                <View className="pb-10">
                <ProductCard data={gadgets} />
                </View>
               </>
            }
              
        </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen