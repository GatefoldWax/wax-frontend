import { router } from "expo-router";
import { useContext } from "react";
import { Pressable, Text } from "react-native";
import { UserContext } from "../contexts/UserContent";

const UserItem = ({
  username,
  textModifier,
}: {
  username: string;
  textModifier?: string;
}) => {
  const { user } = useContext(UserContext);

  return (
    <Pressable
      onPress={() => {
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
