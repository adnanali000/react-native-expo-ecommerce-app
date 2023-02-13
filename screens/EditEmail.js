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



const EditEmail = ({ navigation }) => {
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


     //update work
     const handleUpdate = async () => {
        if(newEmail && password){
            setLoading(true)
            reauthenticate(password).then(() => {
                var user = firebase.auth().currentUser;
                user.updateEmail(newEmail).then(() => {
                  const updatedEmail = auth.currentUser.email;                  
                  db.collection('Users')
                  .doc(userId)
                  .update({
                      email:updatedEmail
                  })
                  .then(() => {
                    setLoading(false)
                      Alert.alert('Email Updated!', 'Your Email has been updated successfully');
                      navigation.goBack();
                  })

                }).catch((error) => { 
                    setLoading(false)
                    console.log(error) });
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
            <View style={{ flex: 1, backgroundColor: '#18191a' }}>
            <View className="relative mt-8">
                        <TouchableOpacity className="absolute top-5 left-3 p-2 rounded-full"
                            onPress={navigation.goBack}
                        >
                            <AntDesign name="arrowleft" size={34} color="white" />
                        </TouchableOpacity>
            </View>
                <Animated.View className="mt-20 px-6">
                    <Text className="text-xl font-bold text-white">Email</Text>

                     <View className="mt-8">
                            <Text className="text-[20px] font-medium text-white">Current Email adress</Text>
                            <Text className="text-yellow-500 py-1 font-bold text-[16px]">{email}</Text>
                        </View>   
                    {/* <View style={styles.action}>
                        <FontAwesome name="envelope-o" size={24} color="gray" />
                        <TextInput
                            placeholder='Email'
                            placeholderTextColor="gray"
                            style={styles.textInput}
                            autoCorrect={false}
                            keyboardType='email-address'
                            value={email}
                        />
                    </View> */}

                  
                  
                  <View className="mt-12">
                    <Text className="text-[20px] text-white">New email address</Text>
                  </View>
                    <View style={styles.action}>
                        {/* <FontAwesome name="envelope-o" size={24} color="gray" /> */}
                        <TextInput
                            placeholder='Email'
                            placeholderTextColor="gray"
                            style={styles.textInput}
                            autoCorrect={false}
                            keyboardType='email-address'
                            value={newEmail}
                            onChangeText={setNewEmail}
                        />
                    </View>

                    <View className="mt-6">
                    <Text className="text-[20px] text-white">Password</Text>
                  </View>
                    <View style={styles.action}>
                        {/* <FontAwesome name="lock" size={24} color="gray" /> */}
                        <TextInput
                            placeholder='Password'
                            placeholderTextColor="gray"
                            style={styles.textInput}
                            autoCorrect={false}
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={true}                            
                        />
                    </View>
                   
                    <TouchableOpacity className="bg-yellow-500 mb-12" style={styles.commandButton} onPress={handleUpdate}>
                        <Text style={styles.panelButtonTitle}>Confirm modification</Text>
                    </TouchableOpacity>

                    {/* <Text className="text-lg font-semibold text-white">Password</Text>

                    
                    <View style={styles.action}>
                        <FontAwesome name="lock" size={24} color="gray" />
                        <TextInput
                            placeholder='old passowrd'
                            placeholderTextColor="gray"
                            style={styles.textInput}
                            autoCorrect={false}
                            value={oldPassword}
                            onChangeText={setOldPassword}
                            secureTextEntry={true}                            
                        />
                    </View>

                    <View style={styles.action}>
                        <FontAwesome name="lock" size={24} color="gray" />
                        <TextInput
                            placeholder='new passowrd'
                            placeholderTextColor="gray"
                            style={styles.textInput}
                            autoCorrect={false}
                            value={newPassword}
                            onChangeText={setNewPassword}
                            secureTextEntry={true}                            
                        />
                    </View>
                   
                    <TouchableOpacity className="bg-[#FCB424]" style={styles.commandButton} onPress={updatePassword}>
                        <Text style={styles.panelButtonTitle}>Update Passowrd</Text>
                    </TouchableOpacity> */}
                    

                    {/* <TouchableOpacity style={styles.commandButton} className="bg-[#4EB1B3]" onPress={()=>navigation.goBack()}>
                  <Text style={styles.panelButtonTitle} >Go Back</Text>
              </TouchableOpacity> */}
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
        color: 'gray',
        paddingLeft:10,
        paddingTop:2,
        paddingBottom:2
    },
    userImg: {
        height: 150,
        width: 150,
        borderRadius: 75,
    },

})

export default EditEmail