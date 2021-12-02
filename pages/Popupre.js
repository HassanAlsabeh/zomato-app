import React, { useState, useEffect } from "react";
import { View, Text, Modal, Image, TouchableOpacity } from "react-native";
import OrderItem from "./OrderItem";
import {
  StyledContainer,
  CheckoutButton,
  Popuprez,
} from "../styledComponent/style";
import { useNavigation } from "@react-navigation/native";
import AnimatedLottieView from "lottie-react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchItem, fetchItems } from "../redux/actions/restaurantActions";

export default function Popupre({ navigation, route }) {
  const { id } = route.params;
  const [modelvisible, setModelvisible] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchItem());
    dispatch(fetchItems());
  }, []);
  const item = useSelector((state) => state.item);

  const [loading, setLoading] = useState(false);

  const checkoutModelContent = (navigation) => {
    // const navigation = useNavigation();
    return (
      <Popuprez>
        <StyledContainer>
          <View style={{ position: "absolute", left: 0, right: 0 }}>
            <Image
              source={{
                uri: "https://www.nogarlicnoonions.com/images/article_images/2019-01/burger-bros2019-01-10-06-10-35.jpg",
              }}
              style={{
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,

                height: 200,
              }}
            />
          </View>

          <OrderItem />
        </StyledContainer>
        <CheckoutButton
          onPress={() => {
            setModelvisible(false);
            setTimeout(() => {}, 2500);
            navigation.navigate("OrderCompleted");
          }}
        >
          <Text>checkout 100$</Text>
        </CheckoutButton>
      </Popuprez>
    );
  };


  return (
    <View>
      <Modal
        animationType="slide"
        visible={modelvisible}
        transparent={true}
        onRequestClose={() => setModelvisible(false)}
      >
        {checkoutModelContent(navigation)}
      </Modal>
      <TouchableOpacity
        style={{
          marginTop: 20,
          borderStartColor: "black",
          flexDirection: "row",
          justifyContent: "flex-end",
          padding: 15,
          borderRadius: 30,
          width: 300,
          position: "relative",
        }}
      >
        <Text
          onPress={() => {
            setModelvisible(true);
          }}
        >
          View Cart
        </Text>
      </TouchableOpacity>
      {/* {loading ? (
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
      ) : (
        <></>
      )} */}
    </View>
  );
}
