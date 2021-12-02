import urlAxios from "../../apis/axiosApi";
import { ActionTypes } from "../contants/action-types";
import { AsyncStorage } from "react-native";

const Store = async (value) => {
  try {
    await AsyncStorage.setItem("token", value);
  } catch (error) {
    // Error saving data
  }
};

export const loginusers = (email, password, navigation) => {
  return async function (dispatch) {
    try {
      const userdata1 = new FormData();
      userdata1.append("email", email);
      userdata1.append("password", password);
      const response = await urlAxios.post("/user/login", userdata1);
      const userdata = response.data;
      if (userdata.success) {
        Store(userdata.access_token);
        dispatch({ type: ActionTypes.LOGINUSERS, payload: userdata.data });
      }
      if (!userdata.data.user_info) {
        navigation.navigate("AddUserInfo");
      } else {
        navigation.navigate("Restaurants");
     
      }
    } catch (err) {
      alert("Wrong Email or Password");
    }
  };
};
// AsyncStorage.getAllKeys((err, keys) => {
//   AsyncStorage.multiGet(keys, (error, stores) => {
//     stores.map((result, i, store) => {
//       console.log({ [store[i][0]]: store[i][1] });
//       return true;
//     });
//   });
// });

export const registerusers = (name, email, password, navigation) => {
  return async function (dispatch) {
    try {
      const registerdata = new FormData();
      registerdata.append("name", name);
      registerdata.append("email", email);
      registerdata.append("password", password);
      const response = await urlAxios.post("/user/register", registerdata, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const registerData = response.data;
      if (registerData.success) {
        navigation.navigate("Login");
        dispatch({
          type: ActionTypes.REGISTERUSERS,
          payload: registerData.data,
        });
        alert("Successfully Registered");
      }
    } catch (err) {
      if (err.response && err.response.status === 422) {
        alert(err.response.data.errors.email[0]);
      }
    }
  };
};

export const logoutUser = async (navigation) => {
  try {
    await AsyncStorage.removeItem("token");
    navigation.navigate("Login");
  } catch (err) {
    console.log(err);
  }
};

// export const updateUser = (name, email, navigation, user_id) => {
//   return async function (dispatch) {
//     console.log("tttttttttttt", user_id);
//     try {
//       const updateuser1 = new FormData();

//       if (name) {
//         updateuser1.append("name", name);
//       }
//       if (email) {
//         updateuser1.append("email", email);
//       }

//       const response = await urlAxios.post(
//         `/update/${user_id}?_method=put`,
//         updateuser1,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Accept: "application/json",
//           },
//         }
//       );

//       const userData = response.data;
//       if (userData.success) {
//         navigation.navigate("Profile");

//         dispatch({
//           type: ActionTypes.UPDATE_USERINFO,
//           payload: userData.data,
//         });
//         alert("Successfully Updated");
//       }
//     } catch (err) {
//       if (err.response) {
//         console.log(err.response.message);
//       }
//     }
//   };
// };
