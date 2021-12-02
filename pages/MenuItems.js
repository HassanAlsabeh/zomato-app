import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
// import { Divider } from "react-native-elements";

export default function MenuItems({ name, description, price }) {
  return (
    
      <View 
      style={style.menuItemStyle}
      >
        <FoodInfo name={name} description={description} price={price} />
        <FoodImage />
      </View>
   
  );
}

const style = StyleSheet.create({
  menuItemStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    margin: 20,
  },
  titleStyle: {
    fontSize: 19,
    fontWeight: "600",
  },
});
const FoodInfo = ({ name, description, price }) => {
  return (
    <View style={{ width: 200, justifyContent: "space-evenly" }}>
      <Text style={style.titleStyle}>title: {name}</Text>
      <Text>description: {description}</Text>
      <Text>{price}</Text>
    </View>
  );
};

const FoodImage = () => {
  return (
    <View>
      <Image
        source={{
          uri: "https://www.nogarlicnoonions.com/images/article_images/2019-01/burger-bros2019-01-10-06-10-35.jpg",
        }}
        style={{
          width: 100,
          height: 100,
          borderRadius: 8,
        }}
      />
    </View>
  );
};
