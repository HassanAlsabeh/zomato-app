import React, { useEffect, useState } from "react";

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import {
  MaterialIcons,
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  checkout,
  deleteCartItem,
  fetchCartItem,
  removeCartItem,
} from "../../redux/actions/cartItemAction";

import Loading from "../../components/Loading";
import { URL } from "../../apis/config";

export default function CartItems({ navigation, route }) {
  const dispatch = useDispatch();
  const [selectAll, setSelectAll] = useState(false);
  const [cartItemsIsLoading, setCartItemsIsLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [newCart, setNewCart] = useState([]);
  const users = useSelector((state) => state.userdata.users);
  const cartItems = useSelector((state) => state.cartItem.cartItems);

  const deleteHandler = (index) => {
    Alert.alert(
      "Are you sure you want to delete this item from your cart?",
      "",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            dispatch(deleteCartItem(index));
            dispatch(
              fetchCartItem(route.params.userId, route.params.restaurantId)
            );
          },
        },
      ],
      { cancelable: false }
    );
  };

  const quantityHandler = (id, action) => {
    const arr = cartItems.filter((cart) => {
      if (cart.id === id) {
 
        if (action == "more") {
          cart.quantity = cart.quantity + 1;
        } else if (action == "less") {
          cart.quantity = cart.quantity > 1 ? cart.quantity - 1 : 1;
        }
      }
      return cart;
    });
    console.log("ipdated array", arr);
    setNewCart(arr);
  };

  const subtotalPrice = () => {
    if (newCart) {
      return newCart.reduce(
        (sum, item) => sum + item.quantity * item.item.price,
        0
      );
    }
    return 0;
  };

  const styles = StyleSheet.create({
    centerElement: { justifyContent: "center", alignItems: "center" },
  });

  useEffect(() => {
    dispatch(fetchCartItem(route.params.userId, route.params.restaurantId));
    () => {
      dispatch(removeCartItem());
    };
  }, []);

  useEffect(() => {
    setNewCart(cartItems);
  }, [cartItems]);

  useEffect(() => {
    if (newCart) {
      setLoading(false);
    }
  }, [newCart]);
  if (loading) {
    return <Loading />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#f6f6f6" }}>
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#fff",
          marginBottom: 10,
        }}
      >
        <View style={[styles.centerElement, { width: 50, height: 50 }]}>
          <Ionicons name="ios-cart" size={25} color="#000" />
        </View>
        <View style={[styles.centerElement, { height: 50 }]}>
          <Text style={{ fontSize: 18, color: "#000" }}>Shopping Cart</Text>
        </View>
      </View>

      {cartItemsIsLoading ? (
        <View style={[styles.centerElement, { height: 300 }]}>
          <ActivityIndicator size="large" color="#ef5739" />
        </View>
      ) : (
        <ScrollView>
          {newCart &&
            newCart.map((item, i) => (
              <View
                key={i}
                style={{
                  flexDirection: "row",
                  backgroundColor: "#fff",
                  marginBottom: 2,
                  height: 120,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    flexGrow: 1,
                    flexShrink: 1,
                    alignSelf: "center",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      /*this.props.navigation.navigate('ProductDetails', {productDetails: item})*/
                    }}
                    style={{ paddingRight: 10 }}
                  >
                    <Image
                      source={
                        item.item.photo
                          ? { uri:URL+ item.item.photo }
                          : {
                              uri: "https://p.kindpng.com/picc/s/79-798754_hoteles-y-centros-vacacionales-dish-placeholder-hd-png.png",
                            }
                      }
                      style={[
                        styles.centerElement,
                        { height: 60, width: 60, backgroundColor: "#eeeeee" },
                      ]}
                    />
                  </TouchableOpacity>
                  <View
                    style={{
                      flexGrow: 1,
                      flexShrink: 1,
                      alignSelf: "center",
                    }}
                  >
                    <Text numberOfLines={1} style={{ fontSize: 15 }}>
                      {item.item.name}
                    </Text>

                    <Text
                      numberOfLines={1}
                      style={{ color: "#333333", marginBottom: 10 }}
                    >
                      LBP {item.quantity * item.item.price}
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                      <TouchableOpacity
                        onPress={() => quantityHandler(item.id, "less")}
                        style={{ borderWidth: 1, borderColor: "#ff6b81" }}
                      >
                        <MaterialIcons
                          name="remove"
                          size={22}
                          color="#ff6b81"
                        />
                      </TouchableOpacity>
                      <Text
                        style={{
                          borderTopWidth: 1,
                          borderBottomWidth: 1,
                          borderColor: "#ff6b81",
                          paddingHorizontal: 7,
                          paddingTop: 3,
                          color: "#ff6b81",
                          fontSize: 13,
                        }}
                      >
                        {item.quantity}
                      </Text>
                      <TouchableOpacity
                        onPress={() => quantityHandler(item.id, "more")}
                        style={{ borderWidth: 1, borderColor: "#ff6b81" }}
                      >
                        <MaterialIcons name="add" size={22} color="#ff6b81" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                <View style={[styles.centerElement, { width: 60 }]}>
                  <TouchableOpacity
                    style={[styles.centerElement, { width: 32, height: 32 }]}
                    onPress={() => deleteHandler(item.id)}
                  >
                    <Ionicons name="md-trash" size={25} color="#ee4d2d" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
        </ScrollView>
      )}

      {!cartItemsIsLoading && (
        <View
          style={{
            backgroundColor: "#fff",
            borderTopWidth: 2,
            borderColor: "#f6f6f6",
            paddingVertical: 5,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              flexGrow: 1,
              flexShrink: 1,
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text>Select All</Text>
            <View
              style={{
                flexDirection: "row",
                paddingRight: 20,
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#8f8f8f" }}>SubTotal: </Text>
              <Text>LBP {subtotalPrice().toFixed(2)}</Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              height: 32,
              paddingRight: 20,
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={[
                styles.centerElement,
                {
                  backgroundColor: "#0faf9a",
                  width: 100,
                  height: 25,
                  borderRadius: 5,
                },
              ]}
              onPress={() =>
                dispatch(
                  checkout(
                    newCart,
                    route.params.restaurantId,
                    route.params.userId,
                    subtotalPrice().toFixed(2),
                    users.user_info.address1,
                    route.params.userId,

                    navigation
                  )
                )
              }
            >
              <Text style={{ color: "#ffffff" }}>Checkout</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}
