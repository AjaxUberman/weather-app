import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  api: "",
  url: sessionStorage.getItem("url"),
  key: sessionStorage.getItem("api"),
  items: [],
  datas2: "",
};

export const apiSlice = createSlice({
  name: "api",
  initialState,
  reducers: {
    setApi: (state, action) => {
      state.api = action.payload;
    },
    setUrl: (state, action) => {
      state.url = action.payload;
    },
    setKey: (state, action) => {
      state.key = action.payload;
    },
    setItems: (state, action) => {
      state.items = action.payload;
    },
    setDatas2: (state, action) => {
      state.datas2 = action.payload;
    },
  },
});

export const { setApi, setUrl, setKey, setItems, setDatas2 } = apiSlice.actions;

export default apiSlice.reducer;
