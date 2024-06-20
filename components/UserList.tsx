import { ScrollView, Text } from "react-native";
import UserItem from "./UserItem";
import { searchUsers } from "../utils/api";
import { useEffect, useState } from "react";

const UserList = ({
  connections,
  username,
}: {
  connections: string[];
  username?: string;
}) => {
  const [searching, setSearching] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<string[]>([]);

  const getSearchResults = async (query: string) => {
    return await searchUsers(query);
  };

  useEffect(() => {
    (async () => {
      //* HACK: demo of functionality of getSearchResults
      console.log((await getSearchResults("ar")).users);
      //* will log an array of usernames that match the query
    })();
  }, [searching]);

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
