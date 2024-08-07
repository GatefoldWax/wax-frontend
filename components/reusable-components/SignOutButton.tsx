import { useContext } from "react";
import { Pressable, Text } from "react-native";
import { signOutUser } from "../../utils/auth";
import { router } from "expo-router";
import { UserContext } from "../../contexts/UserContent";

const SignOutButton = () => {
  const { user, setUser } = useContext(UserContext);

  return (
    <Pressable
      onPress={async () => {
        router.replace(`/`);
        user.username !== "" && (await signOutUser(setUser));
      }}
      className="bg-black w-auto py-2 px-3 mx-6 flex-row rounded-xl border-x border-b border-stone-500"
    >
      <Text className="text-white text-xl w-auto mx-auto">
        {user.username !== "" ? "Sign Out" : "Sign In"}
      </Text>
    </Pressable>
  );
};

export default SignOutButton;
