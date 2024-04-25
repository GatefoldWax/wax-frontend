import { Stack } from "expo-router";

import { NativeWindStyleSheet } from "nativewind";
import { UserProvider } from "../contexts/UserContent";

NativeWindStyleSheet.setOutput({ default: "native" });

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)/music" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)/users" options={{ headerShown: false }} />
    </Stack>
  );
};

export default () => {
  return (
    <UserProvider>
      <RootLayout />
    </UserProvider>
  );
};
