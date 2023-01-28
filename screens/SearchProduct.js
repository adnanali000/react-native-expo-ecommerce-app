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
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#5e35b1" />
          </View>
        );
      }

    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
        }}>
            <SafeAreaView className="flex-1 bg-white">

                    <View className="relative">
                        <TouchableOpacity className="absolute top-5 left-3 p-2  rounded-full"
                            onPress={navigation.goBack}
                        >
                            <AntDesign name="arrowleft" size={30} color="black" />
                        </TouchableOpacity>
                    </View>

                    <View className="mt-16 py-2 px-10 mb-6">
                        <Text className="text-black text-[30px] font-bold">Search</Text>
                        <View className="flex-row space-x-2 rounded-full border mt-6 bg-purple-50 border-purple-600 p-3">
                            <AntDesign name="search1" color="gray" size={20} />
                            <TextInput
                                placeholder='What are you looking for ?'
                                keyboardType='default'
                                className="w-8/12 text-purple-800"
                                onChangeText={(text) => searchFilterFunction(text)}
                                value={search}
                            />
                        </View>
                    </View>

                    <ScrollView
                className="bg-white px-4"
                contentContainerStyle={{
                    paddingBottom: 100
                }}
            >
             
                {/* Mobile  */}

                 {filteredDataSource.length > 0 ?
                 (
                     <>
                  <View className="mt-4 flex-row items-center justify-between px-4">
                    <Text className="font-bold text-[25px] text-gray-800">All Products</Text>
                </View>
                
                    <SearchCards data={filteredDataSource}  />
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
        </TouchableWithoutFeedback>
    )
}

export default SearchProduct