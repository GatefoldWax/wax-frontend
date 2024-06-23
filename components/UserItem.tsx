import { router } from "expo-router";
import { useContext } from "react";
import { Pressable, Text } from "react-native";
import { UserContext } from "../contexts/UserContent";

const UserItem = ({
  username,
  textModifier,
  pressModifier,
}: {
  username: string;
  textModifier?: string;
  pressModifier?: () => void;
}) => {
  const { user } = useContext(UserContext);

  return (
    <Pressable
      onPress={() => {
        pressModifier && pressModifier();

        router.push(
          `/(auth)/users/${username == user.username ? `` : username}`
        );
      }}
    >
      <Text className={`py-1 font-semibold text-[#B56DE4] ${textModifier}`}>
        {username}
      </Text>
    </Pressable>
  );
};

export default UserItem;
