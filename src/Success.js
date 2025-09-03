import React, { useState, useEffect } from "react";
import { Image, StyleSheet, Text, View } from 'react-native';
import * as Progress from 'react-native-progress';
import { SafeAreaView } from "react-native-safe-area-context";

const Success = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 1) {
          clearInterval(interval); 
          return 1;
        }
        return prev + 0.02; 
      });
    }, 100); 

    return () => clearInterval(interval); 
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Image source={require('../assets/success.png')} style={styles.upload} />
      <Text style={styles.message}>
        {"Selfie Captured Perfectly!\nLets build your own fashion avatar."}
      </Text>
      <View style={{ marginTop: '10%' }}>
        <Progress.Bar progress={progress} width={300} color="black" />
      </View>
    </SafeAreaView>
  );
};

export default Success;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  upload: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  message: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    color:'#000000'

  },
});
