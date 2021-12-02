import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AnimatedLottieView from "lottie-react-native";
import MenuItems from "./MenuItems";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderItem } from "../redux/actions/orderItemAction";
export default function OrderCompleted({ route }) {
  const [hassan, setHassan] = useState([]);
  const dispatch = useDispatch();
  const orderItem = useSelector((state) => state.orderItems.orderItems);


  useEffect(() => {
    dispatch(fetchOrderItem(route.params.userId));
  }, []);
  useEffect(() => {
 
    setHassan(orderItem.order_item);
  }, [orderItem]);

  return (
    <SafeAreaView
      style={{
        flex: 1,

        justifyContent: "space-between",
        backgroundColor: "#fff",
      }}
    >
      <View
        style={{
          alignItems: "center",
        }}
      >
        <AnimatedLottieView
          style={{ height: 100, alignSelf: "center", marginTop: 0 }}
          source={require("../assets/animations/check-mark.json")}
          autoPlay
          loop={false}
        />
        <Text>Order Completed</Text>

        
        <ScrollView showsVerticalScrollIndicator={false} style={{ height: 400 }}>
          {orderItem.order_item &&
            orderItem.order_item.map((val, index) => (
              <>
                {/* {val.order_item.map((all)=>(
            <>
            {console.log("abed",all.itemzz.name)}
            </>
          ))} */}

                <MenuItems
                  key={index}
                  name={val && val.itemzz && val.itemzz.name}
                  description={val && val.itemzz && val.itemzz.description}
                  price={val && val.price}
                />
              </>
            ))}
        </ScrollView>

        <AnimatedLottieView
          style={{ height: 100, alignSelf: "center" }}
          source={require("../assets/animations/cooking.json")}
          autoPlay
          loop={false}
        />
      </View>
    </SafeAreaView>
  );
}
