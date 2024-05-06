import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import ReviewHistory from "../../../components/ReviewHistory";
import UserList from "../../../components/UserList";
import LoadingSpinner from "../../../components/reusable-components/LoadingSpinner";
import SignOutButton from "../../../components/reusable-components/SignOutButton";
import { UserContext } from "../../../contexts/UserContent";
import { getReviewsByUsername } from "../../../utils/api";

const CurrentUser = () => {
  const [loading, setLoading] = useState(true);
  const { user, setUser } = useContext(UserContext);
  const [activity, setActivity] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const userReviews = await getReviewsByUsername(user.username);
        setActivity(userReviews);
        setLoading(false);
      } catch (error) {
        console.log("🔎 ~ file: index.tsx:39 ~ error:", error);
      }
    })();
  }, []);

  return loading ? (
    <LoadingSpinner size="large" isColour={true} />
  ) : (
    <SafeAreaView className="h-[100%]">
      <View className="flex flex-row justify-between">
        <Text className="p-4 my-auto font-bold text-lg">
          Hello {user.username}!
        </Text>

        <View className="flex flex-row ">
          <View className="my-auto">
            <Ionicons
              name="settings"
              size={30}
              color={"black"}
              onPress={() => router.push("/(auth)/settings")}
            />
          </View>
          <SignOutButton setUser={setUser} />
        </View>
      </View>

      <View>
        <Text className="px-4 pb-4 my-auto font-bold text-lg">
          Recent Activity:
        </Text>
        <ReviewHistory activity={activity} />
      </View>

      <UserList connections={user.following} />
    </SafeAreaView>
  );
};

export default CurrentUser;
