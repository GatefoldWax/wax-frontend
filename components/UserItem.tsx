import { router } from "expo-router";
import { Pressable, Text } from "react-native";

const UserItem = ({
  username,
  textModifier,
}: {
  username: string;
  textModifier?: string;
}) => {
  return (
    <Pressable onPress={() => router.push(`/(auth)/users/${username}`)}>
      <Text className={`py-1 font-semibold text-[#B56DE4] ${textModifier}`}>
        {username}
      </Text>
    </Pressable>
  );
};

export default UserItem;
