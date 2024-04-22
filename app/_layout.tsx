import { router, Slot } from "expo-router";
import { useEffect } from "react";

import { NativeWindStyleSheet } from "nativewind";
import { UserProvider } from "../contexts/UserContent";

NativeWindStyleSheet.setOutput({ default: "native" });

const InitialLayout = () => {
  useEffect(() => {
    router.replace(`/(auth)/`);
  }, []);

  return <Slot />;
};

const RootLayout = () => {
  return (
    <UserProvider>
      <InitialLayout  />
    </UserProvider>
  );
};

export default RootLayout;
