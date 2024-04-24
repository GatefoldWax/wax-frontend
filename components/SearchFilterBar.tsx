import { View, Text, Pressable } from "react-native";
import { Dispatch, SetStateAction } from "react";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { Music } from "../types/front-end";

const SearchFilterBar = ({
  searchText,
  setSearchedUpMusic,
}: {
  searchText: string;
  setSearchedUpMusic: Dispatch<SetStateAction<Music[]>>;
}) => {
  return (
    <View className=" h-[4%] w-[100%] flex-row items-center">
      <Text className="ml-8 text-lg">Search results for {searchText}</Text>
      <Pressable
        onPress={() => {
          setSearchedUpMusic([]);
          router.setParams({ artistName: "" });
        }}
        className=" ml-auto mr-8"
      >
        <AntDesign name="close" size={30} color="black" />
      </Pressable>
    </View>
  );
};

export default SearchFilterBar;
