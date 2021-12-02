import urlAxios from "../../apis/axiosApi";
import { ActionTypes } from "../contants/action-types";

export const updateUserInfo = (
  name,
  email,
  address1,
  address2,
  phone,
  user_id,
  photo,
  navigation
) => {
  return async function (dispatch) {
    try {
      const updateduserinfo1 = new FormData();
      if (address1) {
        updateduserinfo1.append("address1", address1);
      }
      if (address2) {
        updateduserinfo1.append("address2", address2);
      }
      if (phone) {
        updateduserinfo1.append("phone", phone);
      }
      if (name) {
        updateduserinfo1.append("name", name);
      }
      if (email) {
        updateduserinfo1.append("email", email);
      }
      if (photo) {
        updateduserinfo1.append("photo", photo);
      }
      const response = await urlAxios.post(
        `/update_userinfo/${user_id}?_method=put`,
        updateduserinfo1,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      const updateduserInfo = response.data;
      if (updateduserInfo.success) {
        navigation.navigate("Profile");
        dispatch({
          type: ActionTypes.UPDATE_USERINFO,
          payload: updateduserInfo.data,
        });
        alert("Successfully Updated");
      }
    } catch (err) {
      if (err.response) {
        console.log(err.response.message);
      }
    }
  };
};

export const adduserinfo = (address1, address2, phone, user_id, navigation) => {
  return async function (dispatch) {
    try {
      const registerdata = new FormData();
      registerdata.append("address1", address1);
      registerdata.append("address2", address2);
      registerdata.append("phone", phone);
      // registerdata.append("photo", photo);
      registerdata.append("user_id", user_id);
      console.log("registerdataaaaaaaaaaaaaa", registerdata);
      const response = await urlAxios.post("/adduserinfo", registerdata, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const registerData = response.data;
      if (registerData.success) {
        navigation.navigate("Restaurants");
        dispatch({
          type: ActionTypes.ADDUSERINFO,
          payload: registerData.data,
        });
        alert("Added Successfully");
      }
    } catch (err) {
      if (err.response && err.response.status === 422) {
        alert(err.response.data.errors.email[0]);
      }
    }
  };
};
