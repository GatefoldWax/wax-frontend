import { ActivityIndicator, View } from "react-native";

interface LoadingSpinnerConfig {
  size: "small" | "large";
  isColour: boolean;
}

const LoadingSpinner = ({ size, isColour }: LoadingSpinnerConfig) => {
  return (
    <View className="my-[100%]">
      <ActivityIndicator
        size={size}
        style={{ transform: [{ scaleX: 2 }, { scaleY: 2 }] }}
        color={isColour ? "#B56DE4" : "#FFFFFF"}
        className="m-auto"
      />
    </View>
  );
};

export default LoadingSpinner;
