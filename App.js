import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { TailwindProvider } from "tailwindcss-react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer'
import HomeScreen from './screens/HomeScreen';
import SigninScreen from './screens/SigninScreen';
import SignupScreen from './screens/SignupScreen';
import AddProductScreen from './screens/AddProductScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';
import FavouriteScreen from './screens/FavouriteScreen';
import Profile from './screens/Profile';
import EditProfile from './screens/EditProfile';
import MyProductScreen from './screens/MyProductScreen';
import Tabs from './navigation/tabs'
import SearchProduct from './screens/SearchProduct';
import EditEmail from './screens/EditEmail';


const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
        <TailwindProvider>
          <Stack.Navigator>
            <Stack.Screen name="Signin" component={SigninScreen} />
            <Stack.Screen name="Home" component={Tabs} />
            <Stack.Screen name="FavouriteProduct" component={Tabs} />
            <Stack.Screen name="Profile" component={Tabs} />
            <Stack.Screen name="MyProduct" component={Tabs} />
            <Stack.Screen name="AddProduct" component={AddProductScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
            <Stack.Screen name="SearchProduct" component={SearchProduct} />
            <Stack.Screen name="EditEmail" component={EditEmail} />
          </Stack.Navigator>
        </TailwindProvider>
    </NavigationContainer>
  );
}
