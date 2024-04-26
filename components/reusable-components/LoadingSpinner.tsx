import { ActivityIndicator, View } from "react-native";

const LoadingSpinner = () => {
    return (
      <View className="my-[100%]">
        <ActivityIndicator
          size="large"
          style={{ transform: [{ scaleX: 2 }, { scaleY: 2 }] }}
          color="#B56DE4"
          className="m-auto"
        />
      </View>
    );
}
 
export default LoadingSpinner;