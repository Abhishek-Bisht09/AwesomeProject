import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View, PermissionsAndroid, Platform, Alert } from 'react-native';
import {
  useNavigation,
} from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';

import { request, PERMISSIONS, RESULTS } from "react-native-permissions";
import { SafeAreaView } from "react-native-safe-area-context";

const FaceUpload = () => {
   const navigation = useNavigation();
   const [photo, setPhoto] = useState(null);

   const requestCameraPermission = async () => {
  if (Platform.OS === "android") {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: "Camera Permission",
        message: "This app needs camera access to take photos",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK",
      }
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } else {
    const result = await request(PERMISSIONS.IOS.CAMERA);
    return result === RESULTS.GRANTED;
  }
};

const requestGalleryPermission = async () => {
  if (Platform.OS === "android") {
    if (Platform.Version >= 33) {
      // For Android 13+
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
        {
          title: "Gallery Permission",
          message: "This app needs access to your gallery to select photos",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } else {
      //For Older Android
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: "Gallery Permission",
          message: "This app needs access to your gallery to select photos",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
  } else {
    // iOS
    const result = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
    return result === RESULTS.GRANTED;
  }
};

const takePhoto = async () => {
  const hasPermission = await requestCameraPermission();
  if (!hasPermission) {
    Alert.alert("Permission Denied", "Camera permission is required to take photos.");
    return;
  }

  ImagePicker.openCamera({
    width: 300,
    height: 400,
    cropping: true,
  }).then(image => {
    setPhoto(image.path);
  });
};

 const pickFromGallery = async () => {
  const hasPermission = await requestGalleryPermission();
  if (!hasPermission) {
    Alert.alert("Permission Denied", "Gallery permission is required to pick photos.");
    return;
  }

  ImagePicker.openPicker({
    width: 300,
    height: 400,
    cropping: true,
  }).then(image => {
    setPhoto(image.path);
  });
};

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor:'white' }}>
       {photo ? (
  <>
    <Text style={[styles.header, { color: '#000000' }]}> FACIAL ATTRIBUTES</Text>
    <Text style={[styles.subheader, { color:'#000000',}]}> {"  Let's add a Photo"}</Text>
  </>
) : (
  <>
    <Text style={[styles.header, { color:'#D3D3D3'}]}> FACIAL ATTRIBUTES</Text>
    <Text style={[styles.subheader, { color:'#D3D3D3', borderColor:'#D3D3D3'}]}> {"  Let's add a Photo"}</Text>
  </>
)}

        
    <View style={{justifyContent:'center', alignItems:'center', marginTop:'15%'}}>
        {photo ? <Image source={{ uri: photo }} style={styles.image} />: 
        <><View style={styles.Logo}>
        <Image
        style={styles.add}
        source={require('../assets/add.png')}
        />
        <Text style={styles.addimage}>{"  Add an Image"}</Text>
      </View></>}
    </View>

             {photo ? (
  <TouchableOpacity 
    style={styles.uploadBtn} 
     onPress={() => navigation.navigate('Success')}
  >
    <Text style={styles.uploadText}>{"Upload"}</Text>
  </TouchableOpacity>
) : (
  <View style={{ flexDirection:'row', justifyContent:'space-around', marginTop:'10%'}}>
    <TouchableOpacity style={{flexDirection:'column', alignItems:'center'}}
      onPress={pickFromGallery}>
      <Image source={require('../assets/photo.png')} style={styles.upload} />
      <Text style={{fontWeight:'bold', fontSize:20, color:'#000000'}}>{"From Gallery"}</Text>
    </TouchableOpacity>

    <TouchableOpacity style={{flexDirection:'column', alignItems:'center'}}
      onPress={takePhoto}>
      <Image source={require('../assets/camera.png')} style={styles.upload} />
      <Text style={{fontWeight:'bold', fontSize:20, color:'#000000'}}>{"Take a selfie"}</Text>
    </TouchableOpacity>
  </View>
)}

       </SafeAreaView>
    
  );
};

export default FaceUpload;


  const styles = StyleSheet.create({
  header: {
    marginLeft:'4%',
    marginTop:'6%',
    fontSize:14,
   
  },
  subheader:{
    fontSize:26,
    marginTop:'2%',
    borderBottomWidth:1,
    paddingBottom:8,
    fontWeight:'bold',
   
  },
  oval: {
    width: 100,
    height: 200,
    backgroundColor: '#FF5722',
    borderRadius: 150, 
    marginTop: 50, 
  },
    Logo: {
    width: '40%',
    height: '50%',
    backgroundColor:'#F5F5F5',
    justifyContent:'center',
    alignItems:'center',
    marginTop:'5%',
    borderRadius:70,
    borderWidth:1,
    borderColor:'#D3D3D3',
    borderStyle:'dashed'
  },
  image: { width: 220, height: 220, marginTop: '15%', borderRadius:150, borderWidth:1, borderColor:'green'},
  upload:{
  width: 50,
  height: 50,
  },
  uploadBtn: {
  position: 'absolute',
  bottom: 20,
  left: '5%',
  right: '5%',
  backgroundColor: 'black',
  height: 60,
  justifyContent: 'center',
  alignItems: 'center',
},
uploadText: {
  fontWeight: 'bold',
  fontSize: 20,
  color: 'white',
},
add:{
  height:'35%',
  width:'35%'
},
addimage:{
  color:'#808080',
  fontWeight:'bold'
}

})
