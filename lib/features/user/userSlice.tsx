import { createSlice } from "@reduxjs/toolkit";

type currentUser = {
  _id: string;
  username: string;
  email: string;
  password: string;
  profilePicture: string;
  isAdmin: boolean;
};
interface InitialState {
  currentUser: currentUser | null;
  error: string | null;
  loading: boolean;
}
const initialState: InitialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signEnd: (state) => {
      state.loading = false;
      state.error = null;
    },
    signSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signOutSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    updateStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateEnd: (state) => {
      state.loading = false;
      state.error = null;
    },
    updateSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Delete User
    deleteUserStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteUserEnd: (state) => {
      state.loading = false;
      state.error = null;
    },
    deleteUserSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    deleteUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
export const {
  signStart,
  signEnd,
  signSuccess,
  signFailure,
  signOutSuccess,
  updateStart,
  updateEnd,
  updateSuccess,
  updateFailure,
  deleteUserStart,
  deleteUserEnd,
  deleteUserSuccess,
  deleteUserFailure,
} = userSlice.actions;

export default userSlice.reducer;
