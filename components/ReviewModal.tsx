import Slider from "@react-native-community/slider";
import { useContext, useState } from "react";
import { Alert, Modal, Text, Pressable, View, TextInput } from "react-native";
import { postReview } from "../utils/api";
import { useGlobalSearchParams } from "expo-router";
import { Review } from "../types/front-end";
import { AntDesign } from "@expo/vector-icons";
import { UserContext } from "../contexts/UserContent";

interface Iprops {
  setReviews: Function;
}

const ReviewModal = ({
  setReviews,
  setIsReviewable,
}: {
  setReviews: Function;
  setIsReviewable: Function;
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [rating, setRating] = useState(0);
  const { music_id } = useGlobalSearchParams();
  const { user } = useContext(UserContext);

  const handleTitle = (input: string) => {
    setTitle(input);
  };
  const handleBody = (input: string) => {
    setBody(input);
  };

  const handleSubmit = async () => {
    if (rating) {
      try {
        await postReview(music_id as string, {
          username: user.username,
          rating: rating,
          review_title: title,
          review_body: body,
        });

        setModalVisible(!modalVisible);
        setRating(0);

        setReviews(
          (currentReviews: {
            userReview: Review | null;
            globalReviews: Review[];
          }) => {
            currentReviews["userReview"] = {
              username: user.username,
              rating: rating,
              review_title: title,
              review_body: body,
              created_at: new Date().toISOString(),
              music_id: music_id as string,
            };

            return currentReviews;
          }
        );

        setIsReviewable((current: Boolean) => !current);
      } catch (err) {
        console.log("🚀 ~ file: ReviewModal.tsx:33 ~ handleSubmit ~ err:", err);
      }
    } else {
      Alert.alert(
        "Incomplete Review",
        "Please rate the music before submitting a review.",
        [{ text: "OK", onPress: () => console.log("close") }]
      );
    }
  };

  return (
    <View className="bg-[#faf6ff]">
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View className="w-[90%] mx-[5%] h-[60%] bg-[#d8bbff] absolute inset-x-0 bottom-0 rounded-t-xl p-2 ">
          <View>
            <Pressable
              className="justify-self-end ml-[94%]"
              onPress={() => {
                setModalVisible(!modalVisible);
                setRating(0);
              }}
            >
              <AntDesign name="close" size={24} color="black" />
            </Pressable>

            <View className="justify-center">
              <Slider
                minimumValue={0}
                maximumValue={10}
                minimumTrackTintColor="#ffffffc0"
                maximumTrackTintColor="#000000"
                onValueChange={setRating}
                className="h-10 my-2"
                step={1}
                value={rating}
              />
              <Text className="mx-auto text-xl">{rating}</Text>
            </View>

            <TextInput
              className="bg-white p-2 m-3 h-10 rounded-md"
              placeholder="Enter a catchy title for your review"
              placeholderTextColor={"#0008"}
              value={title}
              onChangeText={handleTitle}
            />
            <TextInput
              className="bg-white p-2 m-3 rounded-md min-h-fit"
              placeholder="Share your thoughts about the music here"
              placeholderTextColor={"#0008"}
              value={body}
              numberOfLines={4}
              onChangeText={handleBody}
              multiline={true}
            />
            <Pressable
              onPress={handleSubmit}
              className="bg-[#ffffffc0] w-40 p-4 mt-3 rounded-md mx-auto"
            >
              <Text className="text-center">Submit Review</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        className="bg-[#bd91fcc0] mx-auto mt-5 p-3 rounded-md"
        onPress={() => setModalVisible(true)}
      >
        <Text className="text-center  ">Write a Review</Text>
      </Pressable>
    </View>
  );
};

export default ReviewModal;
