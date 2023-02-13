import { View, Text,ScrollView,Image,TouchableOpacity,ActivityIndicator,Platform,Linking,Alert } from 'react-native'
import React,{useLayoutEffect,useEffect,useState} from 'react'
import { AntDesign, Entypo,FontAwesome } from '@expo/vector-icons';
import ProductCard from '../components/ProductCard';
import ProductRow from '../components/ProductRow';
import { auth, db } from '../firebase';

const ProductDetailScreen = ({route: {params},navigation}) => {
    const {id,phone,productCondition,productDes,productImg,productPrice,productType,userid,userImage,username,productTitle} = params;
    const [data,setData] = useState()
    const [loading,setLoading] = useState(false)
    const [focused,setFocused] = useState(false)
    const uid = auth.currentUser.uid

    useLayoutEffect(() => {
        navigation.setOptions({
          headerShown: false
        })
      }, [])

      const dialCall = () => {
 
        let phoneNumber = '';
     
        if (Platform.OS === 'android') {
          phoneNumber = `tel:${phone}`;
        }
        else {
          phoneNumber = `telprompt:${phone}`;
        }
     
        Linking.openURL(phoneNumber);
      };

      const getProduct = async ()=>{
        // console.log(productType)
        await db.collection('AllProducts').where('productType','==',productType)
        .onSnapshot(querySnapshot => {
        const products = [];
        querySnapshot.forEach(documentSnapshot => {
            products.push({
                ...documentSnapshot.data(),
                id: documentSnapshot.id,
            })
        });
        // setFilteredDataSource(mobile);
        setData(products);
        setLoading(false);
        console.log(products)
    });
}

const favouritesRef = db.collection('Favourites')

const handleFavourite = async ()=>{
    setFocused(true)
    try{
      setLoading(true)
      await favouritesRef.add({
      username: username,
      phone: phone,
      productImg: productImg,
      userid: uid,
      productTitle: productTitle,
      productDes:productDes,
      productType: productType,
      productCondition:productCondition,
      productPrice:productPrice,
      productId: id
    })
    .then(() => {
      setLoading(false)
      Alert.alert('Product Added!', 'Your Product has been successfully added to your Favourites');
    
    })
  }catch(err){
    setLoading(false)
    Alert.alert('Error!', 'Server error occur');
  }
}


    
useEffect(()=>{
    getProduct()  
},[])
  
if (loading) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#5e35b1" />
    </View>
  );
}

    

  return (
<>

{/* <View className="absolute bottom-10 z-50 w-full">
            <TouchableOpacity onPress={dialCall} className="bg-yellow-500 p-4 rounded-lg flex-row items-center space-x-1 mx-5">
                <Text className="text-lg py-1 px-2">
                    <FontAwesome name='phone'  size={24} color="#fff" />
                </Text>
                <Text className="flex-1 text-center text-white text-lg font-extrabold">{phone}</Text>
                <TouchableOpacity>
                    {userImage ? <Image source={{ uri: userImage }} style={{ width: 35, height: 35, borderRadius: 20 }} />: <FontAwesome name='user'  size={24} color="#fff" />}
                </TouchableOpacity>
            </TouchableOpacity>
        </View> */}

<View className="absolute bottom-10 z-50 w-3/12 rounded-lg right-0">
            <TouchableOpacity onPress={dialCall} className="bg-yellow-500 p-4 rounded-lg flex-row items-center justify-end mx-5">
                <Text className="text-lg py-1 px-2 flex justify-end">
                    <FontAwesome name='phone'  size={24} color="#fff" />
                </Text>
                {/* <Text className="flex-1 text-center text-white text-lg font-extrabold">{phone}</Text> */}
                {/* <TouchableOpacity>
                    {userImage ? <Image source={{ uri: userImage }} style={{ width: 35, height: 35, borderRadius: 20 }} />: <FontAwesome name='user'  size={24} color="#fff" />}
                </TouchableOpacity> */}
            </TouchableOpacity>
        </View>

<ScrollView>
    <View className="relative bg-[#18191a]">
      <View className="flex justify-center items-center w-full">
      <Image
        source={{
          uri: productImg
        }}
        // className="w-full h-80 bg-gray-300 p-4"
        resizeMode="contain" className="h-60 w-60 mt-10 mb-2"
      />
      </View>

      <TouchableOpacity className="absolute top-10 left-3 p-2 rounded-full"
        onPress={navigation.goBack}
      >
        <AntDesign name="arrowleft" size={30} color="white" />
      </TouchableOpacity>
    </View>

    <View className="bg-[#18191a]">
      <View className="px-4 pt-4">
        <View className="flex items-center justify-between flex-row">
        <Text className="text-3xl text-yellow-500 font-bold pb-2">{productTitle}</Text>
        <Entypo name="heart" onPress={handleFavourite} size={30} style={{color:focused ? 'red':'gray'}} /> 
        </View>
        <View className="flex-row space-x-2 my-1">

          <View className="flex-row items-center space-x-1">
            <AntDesign name="star" size={22} color="#FF9529" />
            <Text className="text-white">
              <Text className="text-yellow-500">{productCondition}</Text> ~ {productType}
            </Text>
          </View>

          <View className="flex-row items-center space-x-0.5">
            <Entypo name="location-pin" size={22} color="gray" />
            <Text className="text-white w-[230px]" numberOfLines={1}>
                Owner ~ {username}
            </Text>
          </View>
        </View>
        <View className="flex-row items-center py-1 space-x-1">
            {/* <FontAwesome name="money" size={24} color="gray" /> */}
            <Text className="text-yellow-500 text-[16px]">
            Rs.{productPrice}
            </Text>
          </View>
        <Text className="text-white mt-2 pb-4">{productDes}</Text>
      </View>
    </View>


    {loading ? (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#5e35b1" />
      </View>
    ) :
    
    <View className="pb-36 bg-[#18191a]">
    <Text className="pt-6 px-4 mb-3 text-white font-bold text-xl">More {productType}s</Text>

    {/* dish row  */}
    {data && data.map((item) => (
      <ProductRow
        key={item.id}
        id={item.id}
        productTitle={item.productTitle}
        productDes={item.productDes}
        productPrice={item.productPrice}
        productImg={item.productImg}
        username={item.username}
        productType={item.productType}
        userid={item.userid}
        productCondition={item.productCondition}
        phone={item.phone}
      />
    ))}
  </View>
    
    }
    

  </ScrollView>

</>
  )
}

export default ProductDetailScreen