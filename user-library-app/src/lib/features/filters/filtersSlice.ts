import { FilterParameterOptions } from "@/app/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface filtersState {
  email: string;
  name: string;
  id: string;
  location: string;
}

const initialState: filtersState = {
  email: "",
  name: "",
  id: "",
  location: "",
};

export const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilter: (
      state,
      action: PayloadAction<{
        filterParameter: FilterParameterOptions;
        input: string;
      }>
    ) => {
      state[action.payload.filterParameter] = action.payload.input;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setFilter } = filtersSlice.actions;

export default filtersSlice.reducer;
