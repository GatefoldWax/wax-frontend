import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState, Dispatch, SetStateAction } from "react";
import { TouchableWithoutFeedback, View, Pressable, Image } from "react-native";

const MusicHeader = ({
  setDropdownVis,
  setSearchText,
}: {
  setDropdownVis: Dispatch<SetStateAction<boolean>>;
  setSearchText: Dispatch<SetStateAction<string>>;
}) => {
  const [buttonColor, setButtonColor] = useState({ search: "", user: "" });

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setDropdownVis(false);
      }}
    >
      <View className="w-full h-24 flex-row items-center justify-around bg-[#B56DE4] ">
        <Pressable
          className={`items-center mx-6 p-2 ${buttonColor.search} rounded-md`}
          onPressIn={() => {
            setButtonColor({ ...buttonColor, search: "bg-[#9058B5]" });
            setDropdownVis((current) => !current);
            setSearchText("");
          }}
          onPressOut={() => {
            setButtonColor({ ...buttonColor, search: "" });
          }}
        >
          <Ionicons
            name="search-outline"
            size={30}
            color="black"
            className="m-4"
          />
        </Pressable>

        <Image
          source={require("../assets/images/Wax-logo-transparent.png")}
          className="h-full w-[50%]"
          resizeMode="center"
        />

        <Pressable
          onPressIn={() => {
            setButtonColor({ ...buttonColor, user: "bg-[#9058B5]" });
          }}
          onPressOut={() => {
            setButtonColor({ ...buttonColor, user: "" });
            router.push(`/(auth)/users`);
          }}
          className={`items-center mx-6 p-2 ${buttonColor.user} rounded-md`}
        >
          <Ionicons
            name="person-outline"
            size={30}
            color="black"
            className="m-4"
          />
        </Pressable>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default MusicHeader;
