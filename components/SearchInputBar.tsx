import { Ionicons } from "@expo/vector-icons";
import { Dispatch, SetStateAction, useState } from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";
import { Music } from "../types/front-end";
import { getSpotifyMusic } from "../utils/api";
import LoadingSpinner from "./reusable-components/LoadingSpinner";

const SearchInputBar = ({
  setIsSearchVis,
  typeOfSearch,
  setSearchedUpMusic,
  searchText,
  setSearchText,
  setDropdownVis,
}: {
  setIsSearchVis: Dispatch<SetStateAction<boolean>>;
  typeOfSearch: string;
  setSearchedUpMusic: Dispatch<SetStateAction<Music[]>>;
  searchText: string;
  setSearchText: Dispatch<SetStateAction<string>>;
  setDropdownVis: Dispatch<SetStateAction<boolean>>;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSearchSubmit = async () => {
    if (searchText) {
      setIsLoading(true);
      try {
        const spotifyMusic = await getSpotifyMusic(typeOfSearch, searchText);
        setIsLoading(false);
        setSearchedUpMusic(spotifyMusic);
        setDropdownVis((current) => !current);
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
              <LoadingSpinner size="small" isColour={false} />
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
