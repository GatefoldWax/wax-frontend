import { Slot, Stack } from "expo-router";
import { NativeWindStyleSheet } from "nativewind";
import { UserContext, UserProvider } from "../contexts/UserContent";
import { useContext, useEffect, useState } from "react";

NativeWindStyleSheet.setOutput({ default: "native" });

const RootLayout = () => {
  const { user } = useContext(UserContext);
  const [route, setRoute] = useState<any>();

  useEffect(() => {
    setRoute(
      user.username !== "" ? (
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)/music" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)/users" options={{ headerShown: false }} />
        </Stack>
      ) : (
        <Slot />
      )
    );
  }, [user]);

  return route;
};

export default () => {
  return (
    <UserProvider>
      <RootLayout />
    </UserProvider>
  );
};
