import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "./features/users/usersSlice";
import filtersSlice from "./features/filters/filtersSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      users: usersSlice,
      filters: filtersSlice,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
