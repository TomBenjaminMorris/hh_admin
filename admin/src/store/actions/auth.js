import axios from "axios";
import axios_bars from "../../axios-bars";
import * as actionTypes from "./actionTypes";
import keys from '../../keys';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("expirationDate");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const auth = (email, password) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + keys.WEB_API_KEY;

    axios
      .post(url, authData)
      .then((response) => {
        const expirationDate = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        );
        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("userId", response.data.localId);
        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(checkAuthTimeout(response.data.expiresIn));
      })
      .catch((err) => {
        dispatch(authFail(err.response.data.error));
      });
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        const userId = localStorage.getItem("userId");
        dispatch(authSuccess(token, userId));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};

export const updatePlaceId = (placeId, isAdmin) => {
  return {
    type: actionTypes.UPDATE_PLACE_ID,
    placeId: placeId,
    admin: isAdmin,
  };
};

export const queryPlaceId = (token, userId) => {
  return (dispatch) => {
    const queryParams =
      "?auth=" + token + '&orderBy="userId"&equalTo="' + userId + '"';
    axios
      .get("https://hapihour-admin.firebaseio.com/users.json" + queryParams)
      .then((res) => {
        const fetchedUsers = [];
        for (let key in res.data) {
          fetchedUsers.push({
            ...res.data[key],
            id: key,
          });
        }
        const placeId = fetchedUsers[0].placeId;
        const isAdmin = fetchedUsers[0].admin;
        dispatch(updatePlaceId(placeId, isAdmin));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const setLocation = (locationData) => {
  return {
    type: actionTypes.UPDATE_LOCATION,
    locationData: locationData,
  };
};

export const fetchLocation = (placeId) => {
  return dispatch => {
    axios_bars
    .get("/bar", { params: { place_id: placeId } })
    .then((response) => {
      dispatch(setLocation(response.data));
    })
    .catch((error) => {
      console.log("Index error: " + error);
    });
  }
}

export const resetPasswordAction = () => {
  return {
    type: actionTypes.PASSWORD_RESET,
  };
};

export const resetPassword = (email) => {
  return dispatch => {
    
    const authData = {
      requestType: "PASSWORD_RESET",
      email: email,
    };
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=" + keys.WEB_API_KEY;

    axios
      .post(url, authData)
      .then((response) => {
        dispatch(resetPasswordAction());
      })
      .catch((err) => {
        console.log(err);
      });
  }
}