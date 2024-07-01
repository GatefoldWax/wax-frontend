import { router } from "expo-router";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import RatingWheel from "./reusable-components/RatingWheel";
import LoadingSpinner from "./reusable-components/LoadingSpinner";

const ReviewHistory = ({ activity }: { activity: any }) => {
  return (
    <ScrollView className="h-[50vh] mx-4 bg-white rounded-lg">
      {!Array.isArray(activity) && (
        <LoadingSpinner size="large" isColour={true} />
      )}
      {Array.isArray(activity) && activity.length ? (
        activity.map(
          (trackReview: {
            music_id: string;
            review_id: string;
            review_body: string;
            album_img: string;
            artist_names: string[];
            name: string;
            created_at: string;
            rating: number;
          }) => (
            <Pressable
              key={trackReview.music_id}
              onPress={() =>
                router.push(`/(auth)/music/${trackReview.music_id}`)
              }
              className="mx-auto w-[90vw]"
            >
              <View
                key={trackReview.review_id}
                className="h-max p-4 flex flex-row justify-between border-violet-800 border-b"
              >
                <View>
                  <Image
                    source={{ uri: trackReview.album_img }}
                    className="h-24 w-24  rounded-md"
                  />

                  <View className="mx-auto mt-4">
                    <RatingWheel rating={trackReview.rating} />
                  </View>
                </View>

                <View className="w-[66%]">
                  <Text className="text-sm font-bold text-center">
                    {trackReview.name}
                  </Text>
                  <Text className="text-xs font-bold text-center m-1">
                    {trackReview.artist_names[0]}
                  </Text>
                  <Text className="text-md text-center my-1">
                    {trackReview.review_body}
                  </Text>
                  <Text className="text-xs text-slate-500 text-center">
                    Reviewed: {trackReview.created_at?.substring(0, 10)}
                  </Text>
                </View>
              </View>
            </Pressable>
          )
        )
      ) : (
        <Text className="text-center my-16 font-semibold text-m text-purple-900">
          No reviews yet
        </Text>
      )}
    </ScrollView>
  );
};

export default ReviewHistory;
