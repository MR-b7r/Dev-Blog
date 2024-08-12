import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  currentUser: null;
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
  },
});
export const { signStart, signEnd, signSuccess, signFailure, signOutSuccess } =
  userSlice.actions;

export default userSlice.reducer;
