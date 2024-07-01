import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  session: null,
  token: ""
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
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