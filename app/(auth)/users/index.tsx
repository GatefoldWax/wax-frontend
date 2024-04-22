import { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import UserItem from "../../../components/UserItem";
import { UserContext } from "../../../contexts/UserContent";
import { supabase } from "../../../lib/supabase";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getReviewsByUsername } from "../../../utils/api";
import ReviewHistory from "../../../components/ReviewHistory";

const CurrentUser = () => {
  const [loading, setLoading] = useState(true);
  const { user, setUser } = useContext(UserContext);
  const [activity, setActivity] = useState([]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    await AsyncStorage.removeItem("username");
    setUser({ username: "", following: [] });
    router.replace(`/(auth)/`);
  };

  useEffect(() => {
    !user.username && router.push(`/(auth)/`);

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
    <View>
      <View className="flex flex-row justify-between">
        <Text className="p-4 my-auto font-bold text-lg">
          Hello {user.username}!
        </Text>
        <Pressable
          onPress={handleSignOut}
          className="bg-black w-auto min-w-[30%]  m-4 p-2 flex-row rounded-xl border-x border-b border-stone-500"
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
      <Text className="p-4 font-bold text-lg">You are following:</Text>
      <ScrollView className="px-4 mb-4 h-[33vh] mx-4 bg-white rounded-lg">
        {user.following.map((user) => (
          <UserItem key={user} username={user} textModifier="text-lg" />
        ))}
      </ScrollView>
    </View>
  );
};

export default CurrentUser;
