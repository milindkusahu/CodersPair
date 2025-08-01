import { configureStore } from "@reduxjs/toolkit";
import useReducer from "./userSlice";
import feedReducer from "./feedSlice";
import connectionsReducer from "./connectionsSlice";

const appStore = configureStore({
  reducer: {
    user: useReducer,
    feed: feedReducer,
    connections: connectionsReducer,
  },
});

export default appStore;
