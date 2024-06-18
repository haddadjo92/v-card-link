import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  session: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      console.log("action: ", action);

      state.isAuthenticated = true;
      state.session = action?.payload?.session
    },
    logout(state) {
      return initialState
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;