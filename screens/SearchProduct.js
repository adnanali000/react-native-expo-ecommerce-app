import { View, Text, SafeAreaView, TouchableOpacity, TextInput, Keyboard, TouchableWithoutFeedback,ScrollView,ActivityIndicator } from 'react-native'
import React,{useState,useEffect,useLayoutEffect} from 'react'
import { AntDesign } from '@expo/vector-icons';
import { auth, db } from '../firebase';
import SearchCards from '../components/SearchCards';


const SearchProduct = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const [products,setProducts] = useState([])
    const [search, setSearch] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])

    const getProducts = async ()=>{
        setLoading(true)
        try{
            await db.collection("AllProducts").get().then((querySnapshot) => {
                const product = []
                querySnapshot.forEach((doc) => {
                    console.log("doc",{ ...doc.data(), id: doc.id })
                    product.push({ ...doc.data(), id: doc.id })
                });
                setProducts(product)
                setFilteredDataSource(product)
                setLoading(false);
            });
          }
        catch(err){
            setLoading(false)
          Alert.alert("Error","Server error")
        }
      }

      useEffect(()=>{
        getProducts()
      },[])

      //search function
    const searchFilterFunction = (text) => {
        // Check if searched text is not blank
        if (text) {
            // Inserted text is not blank
            // Filter the provinces
            // Update FilteredDataSource
            const newData = products.filter(function (item) {
                const itemData = item.productTitle
                    ? item.productTitle.toUpperCase()
                    : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setFilteredDataSource(newData);
            setSearch(text);
        } else {
            // Inserted text is blank
            // Update FilteredDataSource with provinces
            setFilteredDataSource(products);
            setSearch(text);
        }
    };

      if (loading) {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:'black' }}>
            <ActivityIndicator size="large" color="#e8ca09" />
          </View>
        );
      }

    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
        }}>
            <SafeAreaView className="flex-1 bg-[black]">

                    <View className="relative mt-4">
                        <TouchableOpacity className="absolute top-5 left-3 p-2  rounded-full"
                            onPress={navigation.goBack}
                        >
                            <AntDesign name="arrowleft" size={30} color="white" />
                        </TouchableOpacity>
                    </View>

                    <View className="mt-16 py-2 px-10 mb-6">
                        <Text className="text-white text-[30px] font-bold">Search</Text>
                        <View className="flex-row space-x-2 rounded-full border mt-6 bg-[#18191a] border-gray-800 p-3 justify-center " >
                            <AntDesign name="search1" color="#7c8084" size={20} style={{marginTop:5}} />
                            <TextInput
                                placeholder='What are you looking for?'
                                keyboardType='default'
                                // className="w-8/12 text-[7c8084]"
                                onChangeText={(text) => searchFilterFunction(text)}
                                value={search}
                                placeholderTextColor='#a1a4a8'
                            />
                        </View>
                    </View>

                    <ScrollView
                className="bg-[black] px-4"
                contentContainerStyle={{
                    paddingBottom: 100
                }}
            >
             
                {/* Mobile  */}

                 {filteredDataSource.length > 0 ?
                 (
                     <>
                  <View className="my-2 flex-row items-center justify-between px-4">
                    <Text className="font-bold text-[25px] text-white">All Products</Text>
                </View>
                
                    <SearchCards data={filteredDataSource}  />
                  </>
                     )  : (
                        
                        <>
                        <View className="flex items-center h-72 justify-center">
                            <Text className="font-bold text-lg text-yellow-600">No Products</Text>
                        </View>
                        </>
                     )
                }
               
              
        </ScrollView>



            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

export default SearchProduct