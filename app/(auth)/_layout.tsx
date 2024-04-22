import { Stack } from "expo-router";

export default () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Gatefold",
          statusBarStyle: "dark",
          statusBarColor: "#B56DE4",
        }}
      />
      <Stack.Screen
        name="music"
        options={{
          headerShown: false,
          title: "MainFeed",
          statusBarStyle: "dark",
        }}
      />
      <Stack.Screen
        name="users"
        options={{ headerShown: false, title: "User" }}
      />
    </Stack>
  );
};
