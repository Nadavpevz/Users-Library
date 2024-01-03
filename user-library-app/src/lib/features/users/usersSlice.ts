import { getUsers } from "@/app/data";
import { IUser } from "@/app/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface usersState {
  value: IUser[];
}

export const fetchData = createAsyncThunk("data/fetchData", async () => {
  const response = await getUsers();
  return response;
});

const initialState: usersState = {
  value: [],
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      // Add any fetched data to the array
      state.value = action.payload;
    });
  },
  reducers: {
    addUser: (state, action: PayloadAction<IUser>) => {
      state.value.push(action.payload);
    },
    editUser: (state, action: PayloadAction<IUser>) => {
      const index = state.value.findIndex(
        (user) => user.id === action.payload.id
      );
      state.value[index] = action.payload;
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      state.value = state.value.filter((user) => user.id != action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addUser, editUser, deleteUser } = usersSlice.actions;
export type AppDispatch = typeof fetchData;

export default usersSlice.reducer;
