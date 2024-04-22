import { useEffect, useState, useContext } from "react";
import { Text, View } from "react-native";
import { getReviews } from "../utils/api";
import { useGlobalSearchParams } from "expo-router";
import { Review } from "../types/front-end";
import ReviewModal from "./ReviewModal";
import { UserContext } from "../contexts/UserContent";

import SingleReview from "./SingleReview";

export const Reviews = () => {
  const { music_id } = useGlobalSearchParams();
  const [reviews, setReviews] = useState<{
    userReview: Review | null;
    globalReviews: Review[];
  }>();
  const { user } = useContext(UserContext);
  const [isReviewable, setIsReviewable] = useState(false);

  useEffect(() => {
    (async () => {
      const reviewData = await getReviews(music_id as string, user.username || "guest");
      setReviews(reviewData);
    })();
  }, [ isReviewable]);

  return (
    <>
      {reviews?.userReview ? (
        <View>
          <Text className="mt-10 text-center font-bold text-lg">My Review</Text>
          <SingleReview
            review={reviews?.userReview}
            setIsReviewable={setIsReviewable}
          />
        </View>
      ) : (
        <ReviewModal
          setReviews={setReviews}
          setIsReviewable={setIsReviewable}
        />
      )}
      <View className="bg-[#faf6ff]">
        <Text className="mt-2 text-center font-bold text-lg">REVIEWS</Text>
        {reviews?.globalReviews.length ? (
          reviews?.globalReviews.map((review: Review) => {
            return (
              <SingleReview
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
