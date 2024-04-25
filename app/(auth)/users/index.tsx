import { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from "react-native";
import { UserContext } from "../../../contexts/UserContent";
import { supabase } from "../../../lib/supabase";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getReviewsByUsername } from "../../../utils/api";
import ReviewHistory from "../../../components/ReviewHistory";
import UserList from "../../../components/UserList";

const CurrentUser = () => {
  const [loading, setLoading] = useState(true);
  const { user, setUser } = useContext(UserContext);
  const [activity, setActivity] = useState([]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    await AsyncStorage.removeItem("username");
    setUser({ username: "", following: [] });
    router.replace(`/`);
  };

  useEffect(() => {
    !user.username && router.push(`/`);

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

        <Pressable
          onPress={handleSignOut}
          className="bg-black w-auto m-4 p-2 flex-row rounded-xl border-x border-b border-stone-500"
        >
          <Text className="text-white text-lg w-auto m-auto">Sign Out</Text>
        </Pressable>
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
