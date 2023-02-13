import React,{useLayoutEffect,useState} from 'react';
import {View,Text,Image,TouchableOpacity,StyleSheet,Pressable} from 'react-native';
import {createBottomTabNavigator,BottomTabBar} from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/HomeScreen';
import FavouriteScreen from '../screens/FavouriteScreen';
import MyProductScreen from '../screens/MyProductScreen';
import Profile from '../screens/Profile';
import { Ionicons,EvilIcons,FontAwesome,Feather,Entypo } from '@expo/vector-icons'; 
import {useNavigation} from '@react-navigation/native'


const Tab = createBottomTabNavigator();



const Tabs = ()=>{
    const navigation = useNavigation();


    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])

    return(
       <Tab.Navigator   
            screenOptions={{
                headerShown:false,
                tabBarStyle:{
                    backgroundColor:'#18191a',
                    height:60,
                    position:'absolute',
                    bottom:0,
                    left:0,
                    right:0,
                    borderTopColor:'transparent',
                }
            }}
           
        >
           <Tab.Screen
                name='All Products'
                component={HomeScreen}
                options={{
                    tabBarIcon:({focused})=>(
                        <View
                            style={{
                                alignItems:'center',
                                justifyContent:'center',
                            }}
                        >
                            <Ionicons name="md-home" size={30} style={{color:focused ? '#e8ca09':'gray'}} />
                        </View>
                    )
                }}
           />
          <Tab.Screen
                name='Favourites'
                component={FavouriteScreen}
                options={{
                    tabBarIcon:({focused})=>(
                        <View
                            style={{
                                alignItems:'center',
                                justifyContent:'center'
                            }}
                        >
                            <Entypo name="heart" size={35} style={{color:focused ? '#e8ca09':'gray'}} />
                            
                        </View>
                    )
                }}
            />
             <Tab.Screen
                name='My Products'
                component={MyProductScreen}
                options={{
                    tabBarIcon:({focused})=>(
                        <View
                            style={{
                                alignItems:'center',
                                justifyContent:'center'
                            }}
                        >
                            <Entypo name="mobile" size={30} style={{color:focused ? '#e8ca09':'gray'}} />
                        </View>
                    )
                }}
            />
            
            <Tab.Screen
                name='Profile'
                component={Profile}
                options={{
                    tabBarIcon:({focused})=>(
                        <View
                            style={{
                                alignItems:'center',
                                justifyContent:'center'
                            }}
                        >
                            <EvilIcons name="user" size={40} style={{color:focused ? '#e8ca09':'gray'}} />
                        </View>
                    )
                }}
            />
       </Tab.Navigator>     
    )
}

export default Tabs;