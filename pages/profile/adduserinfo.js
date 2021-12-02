import React, { useState } from "react";
import { adduserinfo } from "../../redux/actions/userInfoActions";

// import * as ImagePicker from "expo-image-picker";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { URL } from "../../apis/config";
import { ScrollView } from "react-native-gesture-handler";

export default function AddUserInfo({ navigation }) {
  //   const addImage = async () => {
  //     let image = await ImagePicker.launchImageLibraryAsync({
  //       mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //       allowsEditing: true,
  //       aspect: [1, 1],
  //       quality: 1,

  //     });
  //      setPhoto(image)
  //   };

  const users = useSelector((state) => state.userdata.users);
  const dispatch = useDispatch();
   
  const [address1, setAddress1] = useState();
  const [address2, setAddress2] = useState();
  const [phone, setPhone] = useState();
  //   const [photo, setPhoto] = useState();

//   console.log("addresssssssssssssssssssssss", users.user_info.id);
  return (
    <View style={styles.container}>
      <View style={styles.headerContent}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <KeyboardAvoidingView enabled>
            {/* <View style={styles.container1}>
              {
                <Image
                  source={{
                    uri: `${URL}${users.user_info.photo}`,
                  }}
                  style={{ width: 200, height: 200 }}
                />
              }
              <View style={styles.uploadBtnContainer}>
                <TouchableOpacity onPress={addImage} style={styles.uploadBtn}>
                  <Text>{photo ? "Edit" : "Upload"} Image</Text>
                  <AntDesign name="camera" size={20} color="black" />
                </TouchableOpacity>
              </View>
            </View> */}

            <TextInput
              placeholder="Address one"
              style={styles.textInputStyle}
              underlineColorAndroid="transparent"
              onChangeText={(address1) => setAddress1(address1)}
            />

            <TextInput
              placeholder="Address two"
              style={styles.textInputStyle}
              underlineColorAndroid="transparent"
              onChangeText={(address2) => setAddress2(address2)}
            />

            <TextInput
              placeholder="Phone Number"
              style={styles.textInputStyle}
              keyboardType="numeric"
              underlineColorAndroid="transparent"
              onChangeText={(phone) => setPhone(phone)}
            />
            <TouchableOpacity
              style={styles.submitButton}
              onPress={() =>
                dispatch(
                  adduserinfo(
                    address1,
                    address2,
                    phone,
                    users.id,
                    // photo,
                    navigation
                  )
                )
              }
            >
              <Text style={styles.submitButtonText}> Add </Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  container1: {
    elevation: 2,
    height: 200,
    width: 200,
    backgroundColor: "#efefef",
    position: "relative",
    borderRadius: 999,
    overflow: "hidden",
    marginLeft: 50,
  },
  uploadBtnContainer: {
    opacity: 0.7,
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: "grey",
    width: "100%",
    height: "25%",
  },
  uploadBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  MainContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
  },

  textInputStyle: {
    height: 40,
    width: 300,
    textAlign: "center",
    borderWidth: 2,
    borderColor: "#DF0038",
    borderRadius: 30,
    marginTop: 20,
    fontSize: 18,
  },
  headerContent: {
    padding: 30,
    alignItems: "center",
  },
  avatar: {
    marginLeft: 150,
    width: 160,
    height: 160,
    borderRadius: 90,
    borderWidth: 3,
    borderColor: "#DF0038",
    marginBottom: 10,
    marginLeft: 75,
  },
  input: {
    margin: 10,
    height: 40,
    borderColor: "#DF0038",
    borderWidth: 1,
    borderRadius: 20,
    textAlign: "center",
    fontSize: 20,
  },
  submitButton: {
    backgroundColor: "#DF0038",
    padding: 10,
    marginRight: 65,
    marginTop: 20,
    marginLeft: 65,

    height: 45,

    borderRadius: 20,
  },
  submitButtonText: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },
});
