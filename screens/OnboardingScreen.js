import React , {useState,useRef,useLayoutEffect} from 'react';
import {View,Text,StyleSheet,FlatList , Animated, Pressable} from 'react-native';
import OnboardingData from '../utils/OnboardingData';
import Onboardingitems from '../components/OnboardingItems';
import Paginator from '../components/Paginator';

const OnboardingScreen = ({navigation})=>{
    const [currentIndex,setCurrentIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;
    const slidesRef = useRef(null);
    const viewableItemChanged = useRef(({viewableItems})=>{
        setCurrentIndex(viewableItems[0].index)
    }).current

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])


    const viewConfig = useRef({viewAreaCoveragePercentThreshold:50}).current;

    const onStarted = ()=>{
        navigation.navigate('Signin')
    }

    return(
       <View style={styles.root}>
           <View style={{flex:3}}>
           <FlatList 
            data={OnboardingData} 
            renderItem={({item})=><Onboardingitems item={item} />} 
            horizontal
            showsHorizontalScrollIndicator = {false}
            pagingEnabled
            bounces={false}
            keyExtractor={(item)=>item.id}
            onScroll={Animated.event([{nativeEvent:{contentOffset:{x:scrollX}}}],{
                useNativeDriver:false
            })}
            scrollEventThrottle={32}
            onViewableItemsChanged={viewableItemChanged}
            // viewabilityConfig={viewConfig}
            ref={slidesRef}
            />
            </View>

            
            <Paginator data={OnboardingData} scrollX={scrollX} />
            
            <Pressable onPress={onStarted} className="bg-purple-600" style={styles.btn}>
                <Text style={styles.text}>Get Started</Text>
             </Pressable>
            
        </View>
    )
}

const styles = StyleSheet.create({
    root:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'white'
        
    },
    title:{
        color:"white",
    },
    btn:{
        width:'80%',
        padding:15,
        marginVertical:15,
        alignItems:'center',
        borderRadius:5,
       
    },
    text:{
        fontWeight:'bold',
        color:'white'
    },

})

export default OnboardingScreen;