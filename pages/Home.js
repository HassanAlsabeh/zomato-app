import React, { useEffect, useRef } from "react";
import {
  Animated,
  ImageBackground,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector, connect } from "react-redux";
import AnimatedHeader from "../components/animatedHeader";
import RestaurantCard from "../components/restaurantCard";
import { fetchRestaurants } from "../redux/actions/restaurantActions";
import { URL } from "../apis/config";
import { ProfileButton } from "../styledComponent/styles/ProfileButton";
import { Ionicons } from "@expo/vector-icons";

import {
  AnimatedText,
  Circle,
} from "../styledComponent/styles/animatedHeaderStyle";

const Home = ({ navigation, route, fetchRestaurants }) => {
  const { width, height } = useWindowDimensions();
  const users = useSelector((state) => state.userdata.users);
  const restaurants = useSelector((state) => state.data.restaurants);

  let header = useRef(new Animated.Value(0)).current;
  const HEADER_MAIN_HEIGHT = 150;
  const HEADER_COLLAPSED_HEIGHT = 50;
  const BIG_IMG =
    "https://media.cntraveler.com/photos/5b22bfdff04a775484b99dfc/5:4/w_2810,h_2248,c_limit/Alo-Restaurant__2018_Raffi-Photo-2.jpg";

  const headerTitleOpacity = header.interpolate({
    inputRange: [0, 4, HEADER_MAIN_HEIGHT - HEADER_COLLAPSED_HEIGHT],
    outputRange: [0, 1, 1],
    extrapolate: "clamp",
  });

  const heroTitleOpacity = header.interpolate({
    inputRange: [0, 4, HEADER_MAIN_HEIGHT - HEADER_COLLAPSED_HEIGHT],
    outputRange: [1, 0, 0],
    extrapolate: "clamp",
  });

  const bottomPositionIcon = header.interpolate({
    inputRange: [0, HEADER_MAIN_HEIGHT - HEADER_COLLAPSED_HEIGHT],
    outputRange: [5, HEADER_MAIN_HEIGHT - 60],
    extrapolate: "clamp",
  });

  const topPositionIcon = header.interpolate({
    inputRange: [0, HEADER_MAIN_HEIGHT - HEADER_COLLAPSED_HEIGHT],
    outputRange: [HEADER_MAIN_HEIGHT - 60, 5],
    extrapolate: "clamp",
  });

  useEffect(() => {
    fetchRestaurants();
  }, []);

  return (
    <>
      <AnimatedHeader
        header={header}
        headerMainHeight={HEADER_MAIN_HEIGHT}
        headerCollapsedHeight={HEADER_COLLAPSED_HEIGHT}
      >
        {/* <Image
          style={styles.cardImg}
          source={{
            uri: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8YnVyZ2VyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80",
          }}
        /> */}
        <ProfileButton onPress={() => navigation.navigate("Profile")}>
          <ImageBackground
            style={{ width: "100%", height: "100%" }}
            source={
              users && users.user_info && users.user_info.photo
                ? { uri: `${URL + users.user_info.photo}` }
                : require("./profile.jpeg")
            }
          />
        </ProfileButton>

        <Circle style={{ transform: [{ rotate: "180deg" }] }} right top />
        <Circle left bottom />
        <View>
          <Ionicons />
        </View>

        <Animated.View
          style={{ width: 150, height: 120, opacity: heroTitleOpacity }}
        >
          <Image
            style={{ width: "100%", height: "100%" }}
            source={require("./register/yummy.png")}
          />
        </Animated.View>

        <AnimatedText
          center
          style={{
            fontFamily: "Inter-Black",
            opacity: headerTitleOpacity,
            fontSize: 25,
          }}
        >
          {route.name}
        </AnimatedText>
      </AnimatedHeader>

      <SafeAreaView
        style={{ height, paddingBottom: 28, backgroundColor: "#fff" }}
      >
        <Animated.FlatList
          data={restaurants}
          renderItem={({ item, index }) => (
            <RestaurantCard
              onPress={() => navigation.navigate("Item", { id: item.id })}
              data={item}
            />
          )}
          extraData={restaurants}
          contentContainerStyle={{ paddingTop: HEADER_MAIN_HEIGHT }}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: header } } }],
            { useNativeDriver: false }
          )}
        />
      </SafeAreaView>
    </>
  );
};
export default connect(null, { fetchRestaurants })(Home);
