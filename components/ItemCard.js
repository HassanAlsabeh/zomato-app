import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  Button,
} from "react-native";

import { Icon as RNEIcon } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import InputSpinner from "react-native-input-spinner";
import {URL} from "../apis/config";
export default function ItemCard(props) {
  const dispatch = useDispatch();


  return (
    <>
      <TouchableOpacity
        style={{
          backgroundColor: "#fff",
          height: 300,
          marginTop: 10,
          borderBottomColor: "#dfe4ea",
          borderBottomWidth: 1,
        }}
        onPress={() => {
          props.hasan(props.item);
        }}
        id={props.item.id}
      >
        {/* Product Image View */}
        <View style={styles.cardImgWrapper}>
          <Image style={styles.cardImg} source={{uri:`${URL}${props.item.photo}`}} />
        </View>
        {/* Product Details View */}
        <View style={{ flex: 3 }}>
          {/* -- Ratings View */}
          <View>
            <Text >{props.item.name}</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  flexDirection: "row",
                  backgroundColor: "#fff200",
                  alignItems: "center",
                  paddingHorizontal: 4,
                  paddingVertical: 2,
                  borderRadius: 4,
                  marginTop: 4,
                }}
              >
                <Text
                  style={{
                    color: "#111",
                    marginRight: 8,
                    
                    fontSize: 16,
                  }}
                >
                  {props.category.name}
                </Text>
                <RNEIcon
                  name="star"
                  type="font-awesome"
                  size={12}
                  color={"#111"}
                />
              </View>
            </View>
            <View
              style={{
                paddingHorizontal: 8,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <RNEIcon name="tag" type="font-awesome" size={16} />
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 16,
                
                }}
              >
                {props.item.price + " LBP"}
              </Text>
            </View>
            {/* Specifications Wrap */}
            <View
              style={{
                marginTop: 4,
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  marginTop: 4,
                  marginBottom: 4,
                  marginLeft: 4,
                  marginRight: 4,
                  justifyContent: "flex-start",
                  alignItems: "center",
                  backgroundColor: "#f2f2f2",
                  alignSelf: "baseline",
                  paddingHorizontal: 6,
                  paddingVertical: 4,
                  borderRadius: 4,
                }}
              >
                {props.item.description}
              </Text>
              <View style={{ position: "absolute", right: 10, bottom: 27 }}>
                <InputSpinner
                  min={1}
                  step={1}
                  skin="clean"
                  onChange={(e) => props.itemQuantity(e)}
                />
              </View>
            </View>
            <Button
              style={{ color: "red", margin: 10 }}
              onPress={() => {
                props.addcard(props.item.id);
                props.OpenViewCart();
              }}
              title="Add to cart"
              color="#DF0038"
              key={props.item.id}
            />
          </View>
          {/* -- Price View */}
        </View>

        {/* Offer View */}
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 100,
    marginVertical: 10,
    flexDirection: "row",
    shadowColor: "#999",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  cardImgWrapper: {
    height: "50%",
    width: "100%",
    backgroundColor: "white",
  },
  cardImg: {
    height: "100%",
    width: "100%",
    resizeMode: "stretch",
    borderRadius: 8,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  cardInfo: {
    flex: 2,
    padding: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: "#fff",
  },
  cardTitle: {
    fontWeight: "bold",
  },
  cardDetails: {
    fontSize: 12,
    color: "#444",
  },
});
