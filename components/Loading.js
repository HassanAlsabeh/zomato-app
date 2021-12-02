import AnimatedLottieView from "lottie-react-native";
import React from "react";
import { View, Text } from "react-native";

export default function loading() {
  return (
    <View
      style={{
        backgroundColor: "black",
        opacity: 0.6,
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
      }}
    >
      <AnimatedLottieView
        style={{ height: 100 }}
        source={require("../assets/animations/scanner.json")}
        autoPlay
        speed={4}
      />
    </View>
  );
}
