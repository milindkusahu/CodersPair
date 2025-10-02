import { createSlice } from "@reduxjs/toolkit";

const connectionsSlice = createSlice({
  name: "connections",
  initialState: null,
  reducers: {
    addConnections: (_state, action) => {
      return action.payload;
    },
    removeConnections: () => {
      return null;
    },
  },
});

export const { addConnections, removeConnections } = connectionsSlice.actions;

export default connectionsSlice.reducer;
