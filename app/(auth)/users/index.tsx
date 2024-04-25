import { useContext, useEffect, useState } from "react";
import { ActivityIndicator, SafeAreaView, Text, View } from "react-native";
import { UserContext } from "../../../contexts/UserContent";
import { getReviewsByUsername } from "../../../utils/api";
import ReviewHistory from "../../../components/ReviewHistory";
import UserList from "../../../components/UserList";
import SignOutButton from "../../../components/reusable-components/SignOutButton";

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
    <ActivityIndicator
      size="large"
      style={{ transform: [{ scaleX: 2 }, { scaleY: 2 }] }}
      color="#B56DE4"
      className="m-auto"
    />
  ) : (
    <SafeAreaView className="h-[100%]">
      <View className="flex flex-row justify-between">
        <Text className="p-4 my-auto font-bold text-lg">
          Hello {user.username}!
        </Text>

        <SignOutButton setUser={setUser} />
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
