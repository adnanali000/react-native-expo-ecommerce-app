import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { TailwindProvider } from "tailwindcss-react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import SigninScreen from './screens/SigninScreen';
import SignupScreen from './screens/SignupScreen';
import AddProductScreen from './screens/AddProductScreen';
// import { Provider } from 'react-redux'
// import { store } from './store';



const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* <Provider store={store}> */}
        <TailwindProvider>
          <Stack.Navigator>
            <Stack.Screen name="Signin" component={SigninScreen} />
            <Stack.Screen name="AddProduct" component={AddProductScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
          </Stack.Navigator>
        </TailwindProvider>
      {/* </Provider> */}
    </NavigationContainer>
  );
}
