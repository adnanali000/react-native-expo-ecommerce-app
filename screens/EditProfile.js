import {
    SafeAreaView, 
    useWindowDimensions,
    View,
    ImageBackground,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Alert,
    Keyboard,
    TouchableWithoutFeedback } from 'react-native'
import React,{useLayoutEffect,createRef, useState, useEffect} from 'react'
import { FontAwesome,AntDesign } from '@expo/vector-icons';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import { auth, db } from '../firebase';
import storage from 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';
import firebase from 'firebase'


const EditProfile = ({navigation}) => {
    const userId = auth.currentUser.uid;
    const { height } = useWindowDimensions();
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [transferred, setTransferred] = useState(0);
    const [userData, setUserData] = useState('');

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])

    const bs = createRef();
    const fall = new Animated.Value(1);

    //get current user data
    const getUser = async () => {
        const currentUser = await db
            .collection('Users')
            .doc(userId)
            .get()
            .then((documentSnapshot) => {
                if (documentSnapshot.exists) {
                    // console.log('user data',documentSnapshot.data());
                    setUserData(documentSnapshot.data())
                }
            });
    }

    useEffect(() => {
        getUser();
    }, [])

    //update work
    const handleUpdate = async () => {
        let imgUrl = await uploadImage();
        console.log({ imgUrl });
        if (!imgUrl&& userData.userImg) {
            imgUrl = userData.userImg;
        }

        db.collection('Users')
            .doc(userId)
            .update({
                name: userData.name,
                number: userData.number,
                country: userData.country || "",
                city: userData.city || "",
                userImg: imgUrl
            })
            .then(() => {
                Alert.alert('Profile Updated!', 'Your profile has been updated successfully');
                navigation.goBack();
            })

    }

    //image upload
    const uploadImage = async () => {
        try {

            const blob = await new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.onload = function () {
                    resolve(xhr.response);
                }
                xhr.onerror = function () {
                    reject(new TypeError('Network request failed'))
                }
                xhr.responseType = 'blob';
                xhr.open('GET', image, true)
                xhr.send(null)
            })

            if (image == null) {
                return null;
            }

            const uploadUri = image;
            let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

            //add timestamp to file name
            const extension = filename.split('.').pop();
            const name = filename.split('.').slice(0, -1).join('.');
            filename = name + Date.now() + '.' + extension;

            setUploading(true);
            setTransferred(0);

            const storageRef = firebase.storage().ref(`userimage/`).child(filename)
            const task = storageRef.put(blob);

            //set transferred status
            task.on('state_changed', (taskSnapshot) => {
                // console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
                setTransferred(Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100)
            })

            try {
                await task;
                const url = await storageRef.getDownloadURL();
                setUploading(false);
                setImage(null);
                blob.close();
                return url;

            } catch (e) {
                console.log(e);
                blob.close()
                return null;
            }

        } catch (error) {
            console.log({error});
            return null;
        }
    }

    const choosePhotoFromLibrary = async () => {
        // Ask the user for the permission to access the media library 
        // const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
        // if (permissionResult.granted === false) {
        //     alert("You've refused to allow this app to access your photos!");
        //     return;
        // }
      
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
        });
        if (!result.cancelled) {
            setImage(result.uri);
            console.log(result.uri)
        }
      }


     //take photo

    //  const takePhoto = async () => {

    //     const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    //     if (permissionResult.granted === false) {
    //         alert("You've refused to allow this appp to access your camera!");
    //         return;
    //     }

    //     const result = await ImagePicker.launchCameraAsync({
    //         mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //         allowsEditing: true,
    //         aspect: [4, 3],
    //         quality: 1,
    //     });
    //     if (!result.cancelled) {
    //         setImage(result.uri);
    //     }

    // }

     //render header function

     const renderHeader = () => (
        <View style={styles.header} >
            <View style={styles.panelHeader}>
                <View style={styles.panelHandle}></View>
            </View>
        </View>
    )

     //render inner
     const renderInner = () => (
        <View style={styles.panel}>

            <View style={{ alignItems: 'center' }}>
                <Text style={styles.panelTitle}>Upload Photo</Text>
                <Text style={styles.panelSubtitle}>Choose your profile picture</Text>
            </View>
            {/* <TouchableOpacity style={styles.panelButton} onPress={takePhoto}>
                <Text style={styles.panelButtonTitle}>Take Photo</Text>
            </TouchableOpacity> */}

            <TouchableOpacity style={styles.panelButton} onPress={choosePhotoFromLibrary}>
                <Text style={styles.panelButtonTitle}>Choose from Library</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.panelButton} onPress={() => bs.current.snapTo(1)}>
                <Text style={styles.panelButtonTitle}>Cancel</Text>
            </TouchableOpacity>
        </View>
    )





  return (
    <TouchableWithoutFeedback onPress={() => {
        Keyboard.dismiss();
    }}>
        <View className="flex-1 bg-[black]">
        
    <BottomSheet
                    ref={bs}
                    snapPoints={[330, 0]}
                    renderContent={renderInner}
                    renderHeader={renderHeader}
                    initialSnap={1}
                    callbackNode={fall}
                    enabledGestureInteraction={true}
                />
                <Animated.View style={{ margin: 20, opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)) }}>
                <View className="mt-8">
                        <TouchableOpacity
                            onPress={navigation.goBack}
                        >
                            <AntDesign name="arrowleft" size={34} color="white" />
                        </TouchableOpacity>
                    </View>
                  
                    <View style={{ alignItems: 'center' }} className="pb-4 mt-6">
                        <TouchableOpacity onPress={() => bs.current.snapTo(0)}>
                            <View style={{
                                height: 150,
                                width: 150,
                                borderRadius: 75,
                                justifyContent: 'center',
                                alignItems: 'center',
                                // borderWidth: 1,
                                // borderColor: 'gray'
                            }}>
                                <ImageBackground
                                    source={{
                                        uri: image
                                            ? image
                                            : userData
                                                ? userData.userImg ||
                                                'https://cdn2.iconfinder.com/data/icons/facebook-51/32/FACEBOOK_LINE-01-512.png'
                                                : 'https://cdn2.iconfinder.com/data/icons/facebook-51/32/FACEBOOK_LINE-01-512.png',

                                    }}
                                    style={styles.userImg}
                                    imageStyle={{ borderRadius: 75 }}
                                    className="contain"
                                >

                                    <View style={{
                                        flex: 1,
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <FontAwesome name="camera" size={35} color="white" style={{
                                            opacity: 0.7,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }} />
                                    </View>
                                </ImageBackground>
                            </View>
                        </TouchableOpacity>
                        <Text style={{ marginTop: 10, fontSize: 18, fontWeight: 'bold', color: 'gray' }}>{userData ? userData.name : ''}</Text>
                    </View>

                    <View style={styles.action}>
                        <FontAwesome name="user" size={24} color="gray" />
                        <TextInput
                            placeholder='User name'
                            placeholderTextColor="gray"
                            style={styles.textInput}
                            autoCorrect={false}
                            value={userData ? userData.name : ''}
                            onChangeText={(txt) => setUserData({ ...userData, name: txt })}
                        />
                    </View>
                    <View style={styles.action}>
                        <FontAwesome name="phone" size={24} color="gray" />
                        <TextInput
                            placeholder='Phone'
                            placeholderTextColor="gray"
                            style={styles.textInput}
                            autoCorrect={false}
                            keyboardType='number-pad'
                            value={userData ? userData.number : ''}
                            onChangeText={(txt) => setUserData({ ...userData, number: txt })}
                        />
                    </View>
                    <View style={styles.action}>
                        <FontAwesome name="globe" size={24} color="gray" />
                        <TextInput
                            placeholder='Country'
                            placeholderTextColor="gray"
                            style={styles.textInput}
                            autoCorrect={false}
                            value={userData ? userData.country : ''}
                            onChangeText={(txt) => setUserData({ ...userData, country: txt })}
                        />
                    </View>
                    <View style={styles.action}>
                        <FontAwesome name="map-marker" size={24} color="gray" />
                        <TextInput
                            placeholder='City'
                            placeholderTextColor="gray"
                            style={styles.textInput}
                            autoCorrect={false}
                            value={userData ? userData.city : ''}
                            onChangeText={(txt) => setUserData({ ...userData, city: txt })}
                        />
                    </View>
                   
                    <TouchableOpacity className="bg-yellow-500 mb-12" style={styles.commandButton} onPress={handleUpdate}>
                        <Text style={styles.panelButtonTitle}>Confirm modification</Text>
                    </TouchableOpacity>
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
        marginTop: 20,
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
        marginTop: 15,
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
        paddingTop:2,
        paddingBottom:2
    },
    userImg: {
        height: 150,
        width: 150,
        borderRadius: 75,
    },

})

export default EditProfile