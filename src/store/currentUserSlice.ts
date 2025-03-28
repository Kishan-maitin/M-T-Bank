import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CurrentUserState {
  username: string;
  nickname: string;
  email: string;
  avatar: string;
  profilePic?: string;
  bio?: string;
  interests: string[];
  privacyLevel: number;
  token: string;
  userId: string;
}

const initialState: CurrentUserState = {
  username: "",
  nickname: "",
  email: "",
  avatar: "",
  profilePic: "",
  bio: "",
  interests: [],
  privacyLevel: 0,
  token: "",
  userId: "",
};

const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    updateCurrentUser: (
      state,
      action: PayloadAction<Partial<CurrentUserState>>
    ) => {
      Object.assign(state, action.payload);
    },
    setPrivacyLevel: (state, action: PayloadAction<number>) => {
      state.privacyLevel = action.payload;
    },
    updateInterests: (state, action: PayloadAction<string[]>) => {
      state.interests = action.payload;
    },
    resetUser: () => initialState,
  },
});

export const {
  updateCurrentUser,
  setPrivacyLevel,
  updateInterests,
  resetUser,
} = currentUserSlice.actions;

export default currentUserSlice.reducer;
