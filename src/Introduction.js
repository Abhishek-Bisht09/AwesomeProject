import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

const Introduction = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../assets/first_screen.png")}
      />

      <View style={styles.card}>
        <Text style={styles.text}>
          {`Hi, I am your fashion advisor. Let's\nget you started with creating your\nmix & match fashion avatar.`}
        </Text>

        <TouchableOpacity
          style={styles.arrowWrap}
          onPress={() => navigation.navigate("FaceUpload")}
        >
          <Image
            style={styles.arrow}
            source={require("../assets/arr_right.png")}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Introduction;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: width * 0.8,
    height: height * 0.6,
    marginLeft: width * 0.15,
    marginTop: height * 0.1,
    resizeMode: "contain",
  },
  card: {
    borderWidth: 1,
    borderColor: "black",
    height: height * 0.22,
    width: width * 0.8,
    justifyContent: "space-between",
    paddingVertical: height * 0.01,
    paddingHorizontal: width * 0.02,
  },
  text: {
    fontWeight: "400",
    fontSize: width * 0.05, // ~20px on standard width
    color:'#000000'
  },
  arrowWrap: {
    width: width * 0.2,
    alignItems: "center",
    alignSelf: "flex-end",
    height: height * 0.07
  },
  arrow: {
    height: height * 0.07,
    width: width * 0.2,
    resizeMode: "contain",
  },
});
