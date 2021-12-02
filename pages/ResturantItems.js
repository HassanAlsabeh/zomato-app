import React, { useEffect, useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchItems } from "../redux/actions/restaurantActions";
import { getitems, removeItem } from "../redux/actions/itemsAction";
import { addtocard } from "../redux/actions/itemsAction";
import Loading from "../components/Loading";
import GestureRecognizer from "react-native-swipe-gestures";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";

import {
  StyledContainer,
  CheckoutButton,
  Popuprez,
  ViewCart,
} from "../styledComponent/style";
import { Feather as Icon, Ionicons } from "@expo/vector-icons";
// npm i react-native-elements
import { Icon as RNEIcon } from "react-native-elements";
import { useFonts } from "expo-font";
import { useDispatch } from "react-redux";
import InputSpinner from "react-native-input-spinner";
import ItemCard from "../components/ItemCard";
import { addCardReducer } from "../redux/reducers/itemReducer";
import { fetchCartItem, removeCartItem } from "../redux/actions/cartItemAction";
import { URL } from "../apis/config";
export default function ResturantItems({ navigation, route }) {
  const userId = useSelector((state) => state.userdata.users);
  const items = useSelector((state) => state.items.items);
  const cartItems = useSelector((state) => state.cartItem.cartItems);
  const dispatch = useDispatch();
  const [modelvisible, setModelvisible] = useState(false);
  const [cartvisible, setCartvisible] = useState(false);
  const [item, setItem] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [openViewCart, setOpenViewCart] = useState(false);
  useEffect(() => {
    dispatch(getitems(route.params.id));
    dispatch(fetchCartItem(userId.id, route.params.id));
    return () => {
      setOpenViewCart(false);
      //dispatch(removeCartItem());
      dispatch(removeItem());
    };
  }, []);
  useEffect(() => {
    if (cartItems && cartItems.length > 0) {
      setOpenViewCart(true);
    } else if (cartItems && cartItems.length == 0) {
      setOpenViewCart(false);
    }
  }, [cartItems]);

  function OpenViewCart() {
    setOpenViewCart(true);
  }

  function itemQuantity(e) {
    setQuantity(e);
  }

  function addcard(Itemid) {
    dispatch(addtocard(userId.id, route.params.id, Itemid, quantity));
    setQuantity(1);
  }

  function hasan(item) {
    setItem(item);
    setModelvisible(true);
  }
  const checkoutModelContent = (navigation) => {
    return (
      <Popuprez>
        <StyledContainer>
          <View style={{ position: "absolute", left: 0, right: 0 }}>
            <Image
              source={{ uri: `${URL}${item.photo}` }}
              style={{
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,

                height: 200,
              }}
            />
             <View style={{ alignItems: "center", marginTop: 30 }}>
                <Text style={styles.title}>Item Name : </Text>
                <Text style={styles.content}>{item.name}</Text>
                <Text style={styles.title}>Item Description : </Text>
                <Text style={styles.content}>{item.description}</Text>
                <Text style={styles.title}>Item Price : </Text>
                <Text style={styles.content}>{item.price}</Text>
              </View>
            
          </View>

          {/* <OrderItem /> */}
        </StyledContainer>
        <CheckoutButton
          onPress={() => {
            setModelvisible(false);
            setCartvisible(true);
            addcard(item.id);
            setOpenViewCart(true);
            //navigation.navigate("OrderCompleted");
          }}
        >
          <Text>Add to Cart</Text>
         
        </CheckoutButton>
      </Popuprez>
    );
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View
          style={{
            width: 40,
            height: 40,
          }}
        >
          <Ionicons
            name="cart"
            size={40}
            color="black"
            onPress={() =>
              navigation.navigate("CartItems", {
                restaurantId: route.params.id,
                userId: userId.id,
              })
            }
          />
        </View>
      ),
    });
  }, []);
  useEffect(() => {
    if (items) {
      setLoading(false);
    }
  }, [items]);
  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <ScrollView>
        <GestureRecognizer
          style={{ flex: 1 }}
          onSwipeDown={() => setModelvisible(false)}
        >
          <Modal
            animationType="slide"
            visible={modelvisible}
            transparent={true}
            onRequestClose={() => setModelvisible(false)}
          >
            <TouchableOpacity
              style={{
                height: 180,
              }}
              onPress={() => setModelvisible(false)}
            ></TouchableOpacity>
            {checkoutModelContent(navigation)}
          </Modal>
        </GestureRecognizer>

        {/* <Modal
        animationType="slide"
        visible={cartvisible}
        transparent={true}
        onRequestClose={() => setCartvisible(false)}
      >
        <Text>etthehhethtrhtrhethetheth</Text>
      </Modal> */}
        <View style={modelvisible ? styles.opacity : styles.container}>
          {items &&
            items.restaurant_category.map((itemCategory) => (
              <View key={itemCategory.id}>
                <Text
                  style={{
                    color: "#111",
                    marginRight: 8,

                    fontSize: 16,
                  }}
                >
                  {itemCategory.name}
                </Text>
                {itemCategory.items.map((item) => (
                  <ItemCard
                    key={item.id}
                    navigation={navigation}
                    item={item}
                    category={itemCategory}
                    hasan={hasan}
                    addcard={addcard}
                    itemQuantity={itemQuantity}
                    OpenViewCart={OpenViewCart}
                  />
                ))}
              </View>
            ))}
        </View>
      </ScrollView>
      {openViewCart ? (
        <View
          style={{
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <View
            style={{
              backgroundColor: "#DF0038",
              width: "90%",
              padding: 15,
              margin: "auto",
              borderRadius: 10,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setCartvisible(false);
                navigation.navigate("CartItems", {
                  restaurantId: route.params.id,
                  userId: userId.id,
                });
              }}
            >
              <Text
                style={{
                  color: "#f0f8ff",
                  fontSize: 15,
                  textAlign: "right",
                }}
              >
                View Cart
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <></>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "90%",
    alignSelf: "center",
  },
  opacity: {
    opacity: 0.2,
    backgroundColor: "black",
  },
  title: {
    // fontFamily: 'Verdana',
    fontSize: 22,
    margin: 6,
  },
  content: {
    color: "#DF0038",
    fontSize: 18,
  },
});
