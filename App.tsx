import React, { useEffect } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RNBootSplash from "react-native-bootsplash";
import Introduction from "./src/Introduction";
import FaceUpload from "./src/FaceUpload";
import Success from "./src/Success";


const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Introduction}  options={{headerShown: false}} />
      <Stack.Screen name="FaceUpload" component={FaceUpload} options={{headerShown: false}}  />
      <Stack.Screen name="Success" component={Success} options={{headerShown: false}}  />
    </Stack.Navigator>
  );
}

export default function App() {
  useEffect(() => {
    const init = async () => {
      await new Promise(resolve => setTimeout(resolve, 1500)); 
      RNBootSplash.hide({ fade: true });
    };

    init();
  }, []);

  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
