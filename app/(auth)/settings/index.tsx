import { SafeAreaView, ScrollView, Text } from "react-native";
import AccountDeleteButton from "../../../components/AccountDeleteButton";
import SignOutButton from "../../../components/reusable-components/SignOutButton";

const SettingsPage = () => {
  return (
    <SafeAreaView className="h-[100%] flex flex-col justify-between">
      <ScrollView>
        <Text className="p-4 mb-4 font-bold text-3xl text-center">
          Account Settings
        </Text>

        <SignOutButton />
      </ScrollView>

      <AccountDeleteButton />
    </SafeAreaView>
  );
};

export default SettingsPage;
