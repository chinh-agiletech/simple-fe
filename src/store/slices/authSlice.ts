import { createSlice } from "@reduxjs/toolkit";

interface ClusterState {
  topClusterLink: string;
  bottomClusterLink: string;
  savedLinks: {
    topClusterLink?: string;
    bottomClusterLink?: string;
  };
}

const initialState: ClusterState = {
  topClusterLink: "",
  bottomClusterLink: "",
  savedLinks: {},
};

const clusterSlice = createSlice({
  name: "cluster",
  initialState,
  reducers: {
    setClusterLinks: (state, action) => {
      const { topClusterLink, bottomClusterLink } = action.payload;
      state.savedLinks = { topClusterLink, bottomClusterLink };
    },
  },
});

export const { setClusterLinks } = clusterSlice.actions;
export default clusterSlice.reducer;
