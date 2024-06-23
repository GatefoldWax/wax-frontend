import { Ionicons } from "@expo/vector-icons";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { searchUsers } from "../utils/api";
import UserItem from "./UserItem";

const UserList = ({
  connections,
  username,
  setKeyboardVisibility,
}: {
  connections: string[];
  username?: string;
  setKeyboardVisibility?: Dispatch<SetStateAction<boolean>>;
}) => {
  const [searching, setSearching] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchBoxVisibility, setSearchBoxVisibility] =
    useState<boolean>(false);
  const [iconColour, setIconColour] = useState<string>("black");

  const getSearchResults = async (query: string) => {
    return await searchUsers(query);
  };

  const isCurrentUserPage = username === undefined

  useEffect(() => {
    (async () => {
      try {
        if (searchInput.length) {
          const results = await getSearchResults(searchInput);
          setSearchResults(results.users);
        } else {
          setSearchResults([]);
        }
      } catch (error) {
        console.log("🚀 ~ getSearchResults ~ error:", error);
      }
    })();
  }, [searching]);

  const followingHeaderText = username
    ? `${username} is Following`
    : "You are following";

  return (
    <>
      <View className="flex flex-row items-center justify-items-center">
        {searchBoxVisibility ? (
          <TextInput
            enterKeyHint="search"
            enablesReturnKeyAutomatically={true}
            className="border-2 mx-5 p-2 my-[10px] focus:border-[#B56DE4] rounded w-[75%]"
            placeholder={`search a user`}
            placeholderTextColor="#0008"
            value={searchInput}
            onChangeText={(e) => {
              setSearchInput(e);
              setSearching((current: boolean) => !current);
            }}
            autoFocus={true}
            onFocus={() => setKeyboardVisibility && setKeyboardVisibility(true)}
          />
        ) : (
          <Text className="ml-2 p-4 font-bold text-lg inline-block">
            {followingHeaderText}
          </Text>
        )}
        {isCurrentUserPage && (
          <Pressable
            className="ml-auto mr-6"
            onPress={() => {
              setSearchBoxVisibility((current: boolean) => !current);
              setKeyboardVisibility && setKeyboardVisibility(false);
              setIconColour(searchBoxVisibility ? "black" : "#B56DE4");
            }}
          >
            <Ionicons
              name={searchBoxVisibility ? "close" : "search-outline"}
              size={30}
              color={iconColour}
            />
          </Pressable>
        )}
      </View>

      <ScrollView className="h-[20vh] px-4 mb-4 mx-4 bg-white rounded-lg">
        {searchBoxVisibility === false
          ? connections.map((user) => (
              <UserItem
                key={`users.${user}`}
                username={user}
                textModifier="text-lg"
              />
            ))
          : searchResults.map((user) => (
              <UserItem
                key={`searchedUsers.${user}`}
                username={user}
                textModifier="text-lg"
                pressModifier={() =>
                  setKeyboardVisibility && setKeyboardVisibility(false)
                }
              />
            ))}
      </ScrollView>
    </>
  );
};

export default UserList;
