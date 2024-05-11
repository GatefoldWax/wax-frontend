import { Pressable, SafeAreaView, Text } from "react-native";
import AccountDeleteButton from "../../../components/AccountDeleteButton";

const SettingsPage = () => {
  return (
    <SafeAreaView className="h-[100%]">
      <Pressable>
        <Text className="p-4 my-auto font-bold text-3xl text-center">
          Account Settings
        </Text>
      </Pressable>

      <AccountDeleteButton />
    </SafeAreaView>
  );
};

export default SettingsPage;
