"use client";
import { PersistGate } from 'redux-persist/integration/react'
import React, { useEffect, useState } from "react";
import { persistor, store } from "./store";
import { Provider } from "react-redux";

const ReduxProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(loadingTimeout);
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        {isLoading ? (
          <>
            {/* <Preloader /> */}
          </>
        ) : (
          <>{children}</>
        )}
      </PersistGate>
    </Provider>
  );
};

export default ReduxProvider;
