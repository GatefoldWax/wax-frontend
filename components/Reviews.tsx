import { useEffect, useState, useContext } from "react";
import { Text, View } from "react-native";
import { getReviews } from "../utils/api";
import { router, useGlobalSearchParams } from "expo-router";
import { Review } from "../types/front-end";
import ReviewModal from "./ReviewModal";
import { UserContext } from "../contexts/UserContent";

import ReviewItem from "./ReviewItem";
import SignOutButton from "./reusable-components/SignOutButton";
import { FormButton } from "./reusable-components/FormButton";

export const Reviews = () => {
  const { music_id } = useGlobalSearchParams();
  const [reviews, setReviews] = useState<{
    userReview: Review | null;
    globalReviews: Review[];
  }>();
  const { user } = useContext(UserContext);
  const [isReviewable, setIsReviewable] = useState(false);

  useEffect(() => {
    console.log(user.username);
    (async () => {
      const reviewData = await getReviews(
        music_id as string,
        user.username || "guest"
      );
      setReviews(reviewData);
    })();
  }, [isReviewable]);

  return (
    <>
      {reviews?.userReview ? (
        <View>
          <Text className="mt-10 text-center font-bold text-lg">My Review</Text>
          <ReviewItem
            review={reviews?.userReview}
            setIsReviewable={setIsReviewable}
          />
        </View>
      ) : user.username !== "" ? (
        <ReviewModal
          setReviews={setReviews}
          setIsReviewable={setIsReviewable}
        />
      ) : (
        <View className="mx-auto my-2">
          <FormButton
            text="Sign in to review"
            onPress={() => router.push("/")}
            disabled={false}
          />
        </View>
      )}
      <View className="bg-[#faf6ff]">
        <Text className="mt-2 text-center font-bold text-lg">REVIEWS</Text>
        {reviews?.globalReviews.length ? (
          reviews?.globalReviews.map((review: Review) => {
            return (
              <ReviewItem
                key={review.review_id}
                review={review}
                setIsReviewable={setIsReviewable}
              />
            );
          })
        ) : (
          <Text className="mx-auto mt-4 mb-10">
            Nothing to see here yet... be the first to have your say!
          </Text>
        )}
      </View>
    </>
  );
};
