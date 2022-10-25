import { View, Text,ScrollView,Image,TouchableOpacity,ActivityIndicator,Platform,Linking } from 'react-native'
import React,{useLayoutEffect,useEffect,useState} from 'react'
import { AntDesign, Entypo,FontAwesome } from '@expo/vector-icons';
import ProductCard from '../components/ProductCard';
import ProductRow from '../components/ProductRow';
import { auth, db } from '../firebase';

const ProductDetailScreen = ({route: {params},navigation}) => {
    const {id,phone,productCondition,productDes,productImg,productPrice,productType,userid,username,productTitle} = params;
    const [data,setData] = useState()
    const [loading,setLoading] = useState(false)

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

    
useEffect(()=>{
    getProduct()  
},[])
  
    

  return (
<>

<View className="absolute bottom-10 z-50 w-full">
            <TouchableOpacity onPress={dialCall} className="bg-[#FCB424] p-4 rounded-lg flex-row items-center space-x-1 mx-5">
                <Text className="text-lg py-1 px-2">
                    <FontAwesome name='phone'  size={24} color="#fff" />
                </Text>
                <Text className="flex-1 text-center text-white text-lg font-extrabold">{phone}</Text>
            </TouchableOpacity>
        </View>

<ScrollView>
    <View className="relative">
      <Image
        source={{
          uri: productImg
        }}
        className="w-full h-56 bg-gray-300 p-4"
      />

      <TouchableOpacity className="absolute top-10 left-5 p-2 bg-gray-100 rounded-full"
        onPress={navigation.goBack}
      >
        <AntDesign name="arrowleft" size={24} color="#00CCBB" />
      </TouchableOpacity>
    </View>

    <View className="bg-white">
      <View className="px-4 pt-4">
        <Text className="text-3xl text-[#4EB1B3] font-bold">{productTitle}</Text>
        <View className="flex-row space-x-2 my-1">

          <View className="flex-row items-center space-x-1">
            <AntDesign name="star" size={22} color="#FF9529" />
            <Text className="text-gray-500">
              <Text className="text-[#FF9529]">{productCondition}</Text> ~ {productType}
            </Text>
          </View>

          <View className="flex-row items-center space-x-0.5">
            <Entypo name="location-pin" size={22} color="gray" />
            <Text className="text-gray-500 w-[230px]" numberOfLines={1}>
              <Text className="text-gray">Owner ~ {username}</Text>
            </Text>
          </View>
        </View>
        <View className="flex-row items-center space-x-1">
            <FontAwesome name="money" size={24} color="gray" />
            <Text className="text-gray-500 text-[16px]">
            ~ Rs.{productPrice}
            </Text>
          </View>
        <Text className="text-gray-500 mt-2 pb-4">{productDes}</Text>
      </View>
    </View>


    {loading ? (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0e9c99" />
      </View>
    ) :
    
    <View className="pb-36">
    <Text className="pt-6 px-4 mb-3 text-[#4EB1B3] font-bold text-xl">More {productType}s</Text>

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