import { View, Text, Image } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
export default function OrderItem() {
  const item = useSelector((state) => state.item);
  

  return (
    <View
      style={{
        padding: 20,
        marginTop: 180,
      }}
    >
      <Text style={{ fontWeight: "600", fontSize: 26 }}>{item.name}</Text>
      <Text style={{ opacity: 0.7, fontSize: 16 }}>
        discription:{item.description}
      </Text>
    </View>
  );
}
