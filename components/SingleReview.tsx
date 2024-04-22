import { Pressable, Text, View } from "react-native";
import UserItem from "./UserItem";
import { Ionicons } from "@expo/vector-icons";
import { Review } from "../types/front-end";
import { UserContext } from "../contexts/UserContent";
import { useContext, useState } from "react";
import { deleteReview } from "../utils/api";

const SingleReview = ({ review, setIsReviewable }: { review: Review,setIsReviewable: Function }) => {
  const { user } = useContext(UserContext);
  

  const handleDelete = async (review_id: number) => {
    setIsReviewable((current: Boolean)=>!current)
    await deleteReview(review_id);
  };

  return (
    <View key={review.review_id} className="my-2 mx-3 bg-slate-50 p-2">
      <View className="flex-row">
        <UserItem username={review.username} textModifier="" />
        <Text className="py-1 font-semibold align-middle">
          : Rating: {review.rating}
        </Text>
      </View>
      {user.username === review.username ? (
        <Pressable
          onPress={() => handleDelete(review.review_id as number)}
          className="ml-[92%] justify-items-end"
        >
          <Ionicons name="trash-outline" size={25} color="black" />
        </Pressable>
      ) : (
        ""
      )}
      <Text className="italic py-1">{review.review_title}</Text>
      <Text className="mb-2">{review.review_body}</Text>
      <Text className="text-xs">
        Posted On: {review.created_at?.substring(0, 10)}
      </Text>
    </View>
  );
};

export default SingleReview;
