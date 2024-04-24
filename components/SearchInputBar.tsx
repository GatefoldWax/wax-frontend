import {
  ActivityIndicator,
  Alert,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Dispatch, SetStateAction } from "react";
import { getSpotifyMusic } from "../utils/api";
import { useState } from "react";
import { Music } from "../types/front-end";

const SearchInputBar = ({
  setIsSearchVis,
  typeOfSearch,
  setSearchedUpMusic,
  searchText,
  setSearchText,
}: {
  setIsSearchVis: Dispatch<SetStateAction<boolean>>;
  typeOfSearch: string;
  setSearchedUpMusic: Dispatch<SetStateAction<Music[]>>;
  searchText: string;
  setSearchText: Dispatch<SetStateAction<string>>;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSearchSubmit = async () => {
    if (searchText) {
      setIsLoading(true);
      try {
        const spotifyMusic = await getSpotifyMusic(typeOfSearch, searchText);
        setIsLoading(false);
        setSearchedUpMusic(spotifyMusic);
      } catch (err) {
        console.log("🚀 ~ handleSearchSubmit ~ err:", err);
      } finally {
      }
    } else {
      Alert.alert("Incomplete Search", "Please add in text before searching", [
        { text: "OK", onPress: () => console.log("close") },
      ]);
    }
  };

  return (
    <Pressable
      onPress={() => {
        setIsSearchVis((current: boolean) => !current);
      }}
    >
      <View className=" bg-white flex flex-row items-center justify-items-center">
        <TextInput
          enterKeyHint="search"
          enablesReturnKeyAutomatically={true}
          onSubmitEditing={handleSearchSubmit}
          className="border-2 m-5 p-3 focus:border-[#B56DE4] rounded w-[75%]"
          placeholder={`search ${typeOfSearch} by artist or album name`}
          placeholderTextColor="#0008"
          value={searchText}
          onChangeText={(e) => setSearchText(e)}
        />
        <Pressable
          className="bg-black border-2 border-black p-3 rounded"
          onPress={handleSearchSubmit}
        >
          <Text>
            {isLoading ? (
              <ActivityIndicator size="small" color="#ffffff" />
            ) : (
              <Ionicons name="search-outline" size={24} color="white" />
            )}
          </Text>
        </Pressable>
      </View>
    </Pressable>
  );
};

export default SearchInputBar;
