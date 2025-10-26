"use client";

import React, { createContext, useEffect } from "react";
import { AppContextType } from "../types/provider.types";
import { useAppDispatch } from "@/src/redux/hooks";
import { getLoginUserInfo } from "../redux/slices/userInfoSlice";

export const AppContext = createContext<AppContextType | undefined>(undefined);

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Load user data from localStorage on app start
    const storedUser = localStorage.getItem("userInfo");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      dispatch(getLoginUserInfo(parsedUser));
    }
  }, [dispatch]);

  const contextValue: AppContextType = {};

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export default AppProvider;
