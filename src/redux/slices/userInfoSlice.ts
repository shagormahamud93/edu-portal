import { createSlice } from "@reduxjs/toolkit";
import IUser from "@/src/types";
import { RootState } from "../store";


type TStateProps = {
  userInfo: IUser | null ;
}

const initialState: TStateProps = {
  userInfo: null,
};

const userSlice = createSlice({
  name: "userInfo",
  initialState: initialState,
  reducers: {
    getLoginUserInfo: (state, action) => {
      const userdata = action.payload;
      state.userInfo = userdata;
    },
  },
});

export const { getLoginUserInfo } = userSlice.actions;
export default userSlice.reducer;
export const currentUserInfo = (state: RootState) => state.userInfo.userInfo;