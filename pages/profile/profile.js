import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/actions/userAction";
import { URL } from "../../apis/config";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Dimensions,
} from "react-native";

export default function Profile({ navigation }) {
  const users = useSelector((state) => state.userdata.users);
  const dispatch = useDispatch();
  // console.log("hello", users.user_info.photo);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <>
          {/* {console.log("users", users)} */}
          <View>
            <Image style={styles.coverImage} source={require("./cover.png")} />
          </View>
          <View style={styles.profileContainer}>
            {/* Profile Details */}
            <View>
              {/* Profile Image */}
              <View style={styles.profileImageView}>
                <Image
                  style={styles.profileImage}
                  source={
                    users.user_info && users.user_info.photo
                      ? {
                          uri: `http://192.168.0.116:8000/${users.user_info.photo}`,
                        }
                      :require("../profile.jpeg")
                    }
                  />
              </View>
              {/* Profile Name and Bio */}
              <View style={styles.nameAndBioView}>
                <Text style={styles.userFullName}>{users.name}</Text>
                <Text style={styles.userBio}>{users.email}</Text>
              </View>

              {/* Interact Buttons View */}
              <View style={styles.interactButtonsView}>
                <TouchableOpacity
                  style={styles.interactButton}
                  onPress={() => navigation.navigate("EditUser")}
                >
                  <Text style={styles.interactButtonText}>Edit Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => logoutUser(navigation)}
                  style={{
                    ...styles.interactButton,
                    backgroundColor: "white",
                    borderWidth: 2,
                    borderColor: "#4b7bec",
                  }}
                >
                  <Text
                    style={{ ...styles.interactButtonText, color: "#4b7bec" }}
                  >
                    Logout
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{ alignItems: "center", marginTop: 30 }}>
                <Text style={styles.title}>First Address:</Text>
                <Text style={styles.content}>{users.user_info.address1}</Text>
                <Text style={styles.title}>Second Address:</Text>
                <Text style={styles.content}>{users.user_info.address2}</Text>
                <Text style={styles.title}>Phone Number:</Text>
                <Text style={styles.content}>{users.user_info.phone}</Text>
              </View>
            </View>
            <View>{/* <Text>Posts content</Text> */}</View>
          </View>
        </>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  coverImage: { height: 300, width: "100%" },
  profileContainer: {
    // height: 1000,
    backgroundColor: "#fff",
    marginTop: -100,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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
  profileImageView: { alignItems: "center", marginTop: -50 },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
    borderWidth: 6,
    borderColor: "#fff",
  },
  nameAndBioView: { alignItems: "center", marginTop: 10 },
  userFullName: { fontSize: 26 },
  userBio: {
    fontSize: 18,
    color: "#333",
    marginTop: 4,
  },
  countsView: { flexDirection: "row", marginTop: 20 },

  interactButtonsView: {
    flexDirection: "row",
    marginTop: 10,
    paddingHorizontal: 20,
  },
  interactButton: {
    flex: 1,
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "#4b7bec",
    margin: 5,
    borderRadius: 4,
  },
  interactButtonText: {
    color: "#fff",
    fontSize: 18,
    paddingVertical: 6,
  },
  profileContentButtonsView: {
    flexDirection: "row",
    borderTopWidth: 2,
    borderTopColor: "#f1f3f6",
  },
  showContentButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    borderBottomColor: "#000",
  },
  showContentButtonText: {
    fontSize: 18,
  },
});
