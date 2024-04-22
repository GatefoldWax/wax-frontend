import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";

export const FormButton = ({
  onPress,
  text,
  disabled
}: {
  onPress: Function;
  disabled: boolean;
  text: string;
}) => {
  return (
    <Pressable
      disabled={disabled}
      onPress={() => {
        onPress();
      }}
      className="bg-black w-auto min-w-[30%]  p-2 flex-row rounded-xl border-x border-b border-stone-500"
    >
      <Text className="text-white text-2xl w-auto mx-auto">{text}</Text>
    </Pressable>
  );
};
