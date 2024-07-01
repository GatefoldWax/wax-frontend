import { router, useGlobalSearchParams } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { Pressable, SafeAreaView, Text, View } from "react-native";
import ReviewHistory from "../../../../components/ReviewHistory";
import UserList from "../../../../components/UserList";
import LoadingSpinner from "../../../../components/reusable-components/LoadingSpinner";
import { UserContext } from "../../../../contexts/UserContent";
import {
  getFollows,
  getReviewsByUsername,
  patchFollows,
} from "../../../../utils/api";

const UserPage = () => {
  const { user, setUser } = useContext(UserContext);
  const { username }: { username: string } = useGlobalSearchParams();
  const [loading, setLoading] = useState(true);
  const [connections, setConnections] = useState([]);
  const [activity, setActivity] = useState([]);

  const handleFollow = () => {
    setUser(({ ...current }) => {
      current.following.push(username);
      return current;
    });

    patchFollows(user.username, username, true);
  };

  const handleUnfollow = () => {
    setUser(({ ...current }) => {
      const newArray = current.following.filter((user: string) => {
        return user !== username;
      });
      current.following = newArray;
      return current;
    });
    patchFollows(user.username, username, false);
  };

  useEffect(() => {
    !username && router.push(`/`);

    (async () => {
      try {
        const { following } = await getFollows(username);
        const userReviews = await getReviewsByUsername(username);

        setConnections(following);
        setActivity(userReviews);
        setLoading(false);
      } catch (error) {
        console.log("🚀 ~ error:", error);
      }
    })();
  }, [username, user]);

  return loading ? (
    <LoadingSpinner size="large" isColour={true} />
  ) : (
    <SafeAreaView className="h-[100%] bg-[#faf6ff]">
      <View className="flex flex-row justify-between">
        <Text className="p-4 my-auto font-bold text-lg">
          {username}'s activity:
        </Text>
        <Pressable
          onPress={() => {
            user.following.includes(username)
              ? handleUnfollow()
              : handleFollow();
          }}
          className="bg-black w-auto m-4 p-2 flex-row rounded-xl border-x border-b border-stone-500"
        >
          <Text className="text-white text-lg w-auto m-auto">
            {user.following.includes(username) ? "Unfollow" : "Follow"}
          </Text>
        </Pressable>
      </View>

      <ReviewHistory activity={activity} />

      <UserList connections={connections} username={username} />
    </SafeAreaView>
  );
};

export default UserPage;
