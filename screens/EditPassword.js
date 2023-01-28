import React, { createRef, useState, useEffect,useLayoutEffect } from 'react'
import {
    useWindowDimensions,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Alert,
    Keyboard,
    TouchableWithoutFeedback,
    ActivityIndicator
} from 'react-native'

import { FontAwesome,AntDesign } from '@expo/vector-icons';
import Animated from 'react-native-reanimated';
import { auth, db } from '../firebase';
import firebase from 'firebase'



const EditPassword = ({ navigation }) => {
    const email = auth.currentUser.email;
    const userId = auth.currentUser.uid;
    const { height } = useWindowDimensions();
    const [userData, setUserData] = useState('');
    const [newEmail,setNewEmail] = useState('');
    const [password,setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const [oldPassword,setOldPassword] = useState('')
    const [newPassword,setNewPassword] = useState('')

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])

    const userRef = db.collection('Users');


    //reauthenticate
    const reauthenticate = (password) => {
        var user = firebase.auth().currentUser;
        var cred = firebase.auth.EmailAuthProvider.credential(
            user.email, password);
        return user.reauthenticateWithCredential(cred);
      }

      //update password
      const updatePassword = ()=>{
        if(newPassword && oldPassword){
            setLoading(true)
            reauthenticate(oldPassword).then(() => {
                var user = firebase.auth().currentUser;
                user.updatePassword(newPassword).then(() => {
                    setLoading(false)
                    Alert.alert('Password Updated!', 'Your Password has been updated successfully');
                  }).catch((error) => {
                    // An error ocurred
                    setLoading(false)
                    Alert.alert('Error!', 'Server Error');
                    // ...
                  });
              }).catch((error) => { 
                setLoading(false)
                console.log(error); });
        }else{
            alert('wrong input filed')
        } 
      }  

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
            <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View className="relative">
                        <TouchableOpacity className="absolute top-5 left-3 p-2 rounded-full"
                            onPress={navigation.goBack}
                        >
                            <AntDesign name="arrowleft" size={34} color="black" />
                        </TouchableOpacity>
            </View>
                <Animated.View className="mt-20 px-6">
                    <Text className="text-xl font-bold text-gray-800">Password</Text>

                  
                  <View className="mt-12">
                    <Text className="text-[20px] text-gray-800">Current Password</Text>
                  </View>
                    <View style={styles.action}>
                        {/* <FontAwesome name="envelope-o" size={24} color="gray" /> */}
                        <TextInput
                            placeholder='Current passowrd'
                            placeholderTextColor="gray"
                            style={styles.textInput}
                            autoCorrect={false}
                            value={oldPassword}
                            onChangeText={setOldPassword}
                            secureTextEntry={true}                            
                        />
                    </View>

                    <View className="mt-6">
                    <Text className="text-[20px] text-gray-800">New Password</Text>
                  </View>
                    <View style={styles.action}>
                        {/* <FontAwesome name="lock" size={24} color="gray" /> */}
                        <TextInput
                            placeholder='New passowrd'
                            placeholderTextColor="gray"
                            style={styles.textInput}
                            autoCorrect={false}
                            value={newPassword}
                            onChangeText={setNewPassword}
                            secureTextEntry={true}                            
                        />
                    </View>
                   
                    <TouchableOpacity className="bg-purple-600 mb-12" style={styles.commandButton} onPress={updatePassword}>
                        <Text style={styles.panelButtonTitle}>Confirm modification</Text>
                    </TouchableOpacity>

                </Animated.View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        // flex:1,
    },
    commandButton: {
        padding: 15,
        borderRadius: 5,
       
        alignItems: 'center',
        marginTop: 30,
    },
    panel: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        paddingTop: 20,
        // borderTopLeftRadius: 20,
        // borderTopRightRadius: 20,
        // shadowColor: '#000000',
        // shadowOffset: {width: 0, height: 0},
        // shadowRadius: 5,
        // shadowOpacity: 0.4,
    },
    header: {
        backgroundColor: '#FFFFFF',
        shadowColor: '#333333',
        shadowOffset: { width: -1, height: -3 },
        shadowRadius: 2,
        shadowOpacity: 0.4,
        // elevation: 5,
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    panelHeader: {
        alignItems: 'center',
    },
    panelHandle: {
        width: 40,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#00000040',
        marginBottom: 10,
    },
    panelTitle: {
        fontSize: 27,
        height: 35,
    },
    panelSubtitle: {
        fontSize: 14,
        color: 'gray',
        height: 30,
        marginBottom: 10,
    },
    panelButton: {
        padding: 13,
        borderRadius: 15,
        backgroundColor: '#5e35b1',
        alignItems: 'center',
        marginVertical: 7,
    },
    panelButtonTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        // marginBottom: 10,
        borderWidth: 1,
        borderColor: 'gray',
        padding: 12,
        borderRadius:5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5,
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: 'gray',
    },
    userImg: {
        height: 150,
        width: 150,
        borderRadius: 75,
    },

})

export default EditPassword