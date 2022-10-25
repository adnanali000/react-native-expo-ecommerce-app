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
// import { Provider } from 'react-redux'
// import { store } from './store';


const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* <Provider store={store}> */}
        <TailwindProvider>
          <Stack.Navigator>
            <Stack.Screen name="Signin" component={SigninScreen} />
            {/* <Drawer.Navigator initialRouteName="Home"> */}
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="AddProduct" component={AddProductScreen} />
            {/* </Drawer.Navigator> */}
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
          </Stack.Navigator>
        </TailwindProvider>
      {/* </Provider> */}
    </NavigationContainer>
  );
}
