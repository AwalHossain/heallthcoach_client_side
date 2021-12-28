import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// signup user
export const signUpUser = createAsyncThunk("users/signup", async (body) => {
  try {
    const res = await axios.post(
      "http://localhost:5000/api/auth/register",
      body
    );
    console.log(res.data);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
});

// Sign in user

export const signIn = createAsyncThunk("users/sginin", async (body) => {
  try {
    const res = await axios.post("http://localhost:5000/api/auth/login", body);
    console.log(res.data);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
});

export const userSlice = createSlice({
  name: "user",
  initialState: {
    token: "",
    userId: "",
    loading: false,
    displayName: "",
    mail: "",
    error: "",
  },
  reducers: {
    logOut: (state, action) => {
      state.mail = undefined;
      state.token = undefined;
      state.userId = undefined;
      state.displayName = undefined;
      localStorage.removeItem("persist:root");
    },
  },
  extraReducers: {
    [signUpUser.fulfilled]: (state, action) => {
      state.loading = false;
      if (action.payload.error) {
        state.error = action.payload.error;
      } else {
        state.mail = action.payload.email;
        state.displayName = action.payload.username;
        state.userId = action.payload._id;
        state.token = action.payload.accessToken;
        state.error = " ";
      }

      return state;
    },
    [signUpUser.rejected]: (state) => {
      state.loading = false;

      return state;
    },
    [signUpUser.pending]: (state) => {
      state.loading = true;
      return state;
    },
    [signIn.fulfilled]: (state, action) => {
      state.loading = false;
      if (action.payload.error) {
        state.error = action.payload.error;
      } else {
        state.mail = action.payload.email;
        state.displayName = action.payload.username;
        state.userId = action.payload._id;
        state.token = action.payload.accessToken;
        state.error = " ";
      }
      return state;
    },
    [signIn.rejected]: (state, action) => {
      state.loading = false;
      return state;
    },
    [signIn.pending]: (state, action) => {
      state.loading = true;
      return state;
    },
  },
});

export const { logOut } = userSlice.actions;
export default userSlice.reducer;
