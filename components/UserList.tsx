import { Pressable, ScrollView, Text, View, TextInput } from "react-native";
import UserItem from "./UserItem";
import { searchUsers } from "../utils/api";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";

const UserList = ({
  connections,
  username,
}: {
  connections: string[];
  username?: string;
}) => {
  const [searching, setSearching] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchBoxVisibility, setSearchBoxVisibility] =
    useState<boolean>(false);
  const [iconColour,setIconColour]= useState<string>('black')

  const getSearchResults = async (query: string) => {
    return await searchUsers(query);
  };

  useEffect(() => {
    (async () => {
      //* HACK: demo of functionality of getSearchResults
      // console.log((await getSearchResults("s")).users);
      //* will log an array of usernames that match the query

      try {
        const results = await getSearchResults(searchInput);
        setSearchResults(results);
      } catch (error) {
        console.log("🚀 ~ getSearchResults ~ error:", error);
      }
    })();
  }, [searching]);

  return (
    <>
      <View className="flex flex-row items-center justify-items-center">
        {searchBoxVisibility ? (
          <TextInput
            enterKeyHint="search"
            enablesReturnKeyAutomatically={true}
            className="border-2 m-5 p-2 focus:border-[#B56DE4] rounded w-[75%]"
            placeholder={`search a user`}
            placeholderTextColor="#0008"
            value={searchInput}
            onChangeText={(e) => {
              if (e.length) {
                setSearchInput(e);
                setSearching(true);
              } else if (!e.length) {
                setSearchInput(e);
                setSearching(false);
              }
            }}
          />
        ) : (
          <Text className="ml-2 p-4 font-bold text-lg inline-block">
            {username ? `${username} is Following` : "You are following"}
          </Text>
        )}
        <Pressable
          className="ml-auto mr-6"
          onPress={() => {
            setSearchBoxVisibility((current: boolean) => !current);
            setIconColour(searchBoxVisibility?'#B56DE4':'black')
          }}
        >
          <Ionicons name="search-outline" size={30} color={iconColour} />
        </Pressable>
      </View>

      <ScrollView className="px-4 mb-4 mx-4 bg-white rounded-lg">
        {connections.map((user) => (
          <UserItem key={user} username={user} textModifier="text-lg" />
        ))}
      </ScrollView>
    </>
  );
};

export default UserList;
