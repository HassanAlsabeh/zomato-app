import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Item = ({navigation}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          width: 30,
          height: 30,
          position: "absolute",
          top: 10,
          right: 10,
          borderRadius: 50,
          backgroundColor: "white",
        }}
        onPress={() => navigation.navigate("Popupre")}
      >
        <Text>Item 1</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Item;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
