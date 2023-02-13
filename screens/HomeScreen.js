import {ActivityIndicator, View, Pressable ,Text, SafeAreaView, Image, TextInput, ScrollView,TouchableOpacity } from 'react-native'
import React, { useEffect, useLayoutEffect,useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons';
import Logo from '../assets/logo.png'
import Categories from '../components/Categories';
import { auth, db } from '../firebase';
import ProductCard from '../components/ProductCard';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import Slider from '../components/Slider';



const HomeScreen = () => {
    const navigation = useNavigation()
    const [featuredCategories, setFeaturedCategories] = useState([]);
    const [loading, setLoading] = useState(true);
  const userId = auth.currentUser.uid; 
    const [errorMessage, setErrorMessage] = useState("");
    const [mobiles,setMobiles] = useState([])
    const [gadgets,setGadgets] = useState([])
    const [laptops,setLaptops] = useState([])
    const [userData,setUserData] = useState('');

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])

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
        getUser()
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
        <ActivityIndicator size="large" color="text-yellow-500" />
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
        <SafeAreaView className="bg-[#18191a] pt-5">
            {/* header  */}
            <Header />

            {/* search  */}
           <SearchBar />

            {/* Body */}
            <ScrollView
                className="bg-[#18191a]"
                contentContainerStyle={{
                    paddingBottom: 150
                }}
            >

                {/* slider  */}
                <Slider />

                
                {/* Categories */}
                <Categories />

                

                {/* Mobile  */}

                  {mobiles &&  
                  <>
                  <View className="mt-4 flex-row items-center justify-between px-4">
                    <Text className="font-bold text-lg text-white">Mobiles</Text>
                <AntDesign name="arrowright" size={24} color="gray" />
                </View>
                
                <ProductCard data={mobiles} />
                  </>
                }

                {/* laptops  */}
                {laptops && 
               <>
               <View className="mt-4 flex-row items-center justify-between px-4">
                    <Text className="font-bold text-lg text-white">Laptops</Text>
                    <AntDesign name="arrowright" size={24} color="gray" />
                </View>
                <ProductCard data={laptops} />
               </>
            }


                {/* Gadgets */}
                
               {gadgets && 
               <>
               <View className="mt-4 flex-row items-center justify-between px-4">
                    <Text className="font-bold text-lg text-white">Gadgets</Text>
                    <AntDesign name="arrowright" size={24} color="gray" />
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