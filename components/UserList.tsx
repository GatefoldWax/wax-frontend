import { ScrollView, Text } from "react-native";
import UserItem from "./UserItem";

const UserList = ({
  connections,
  username,
}: {
  connections: string[];
  username?: string;
}) => {
  return (
    <>
      <Text className="p-4 font-bold text-lg">
        {username ? `${username} is Following:` : "You are following:"}
      </Text>

      <ScrollView className="px-4 mb-4 mx-4 bg-white rounded-lg">
        {connections.map((user) => (
          <UserItem key={user} username={user} textModifier="text-lg" />
        ))}
      </ScrollView>
    </>
  );
};

export default UserList;
