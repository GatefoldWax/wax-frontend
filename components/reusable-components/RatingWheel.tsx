import { useEffect, useState } from "react";
import AnimatedProgressWheel from "react-native-progress-wheel";

const RatingWheel = ({ rating }: { rating: number }) => {
  const [ratingColor, setRatingColor] = useState("#9ce37d");

  useEffect(() => {
    if (rating < 7 && rating > 4) {
      setRatingColor("#ffc145");
    } else if (rating <= 4) {
      setRatingColor("#ff6b6c");
    }
  }, []);

  return (
    <AnimatedProgressWheel
      size={45}
      width={7}
      color={ratingColor}
      progress={rating}
      max={10}
      showProgressLabel={true}
      rotation={"-90deg"}
      duration={750}
      labelStyle={{
        color: "black",
        fontSize: 15,
        fontWeight: "bold",
      }}
      backgroundColor={"#b56de4"}
    />
  );
};

export default RatingWheel;
