import { Dispatch, SetStateAction } from "react";
import { Pressable, Text } from "react-native";
import { signOutUser } from "../../utils/auth";
import { router } from "expo-router";

const SignOutButton = ({
  setUser,
}: {
  setUser?: Dispatch<SetStateAction<{ username: string; following: string[] }>>;
}) => {
  return (
    <Pressable
      onPress={async () => {
        router.replace(`/`);
        setUser && (await signOutUser(setUser));
      }}
      className="bg-black w-auto m-4 p-2 flex-row rounded-xl border-x border-b border-stone-500"
    >
      <Text className="text-white text-lg w-auto m-auto">
        {setUser ? "Sign Out" : "Sign In"}
      </Text>
    </Pressable>
  );
};

export default SignOutButton;
