import { ScrollView } from "react-native";
import MusicContent from "../../../../components/MusicContent";
import { Reviews } from "../../../../components/Reviews";

export default () => {
  return (
    <ScrollView className="bg-[#faf6ff]">
      <MusicContent />
      <Reviews />
    </ScrollView>
  );
};
