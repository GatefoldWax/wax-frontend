import { ScrollView } from "react-native";
import MusicContent from "../../../../components/MusicContent";
import { Reviews } from "../../../../components/Reviews";
import { useState } from "react";
import LoadingSpinner from "../../../../components/reusable-components/LoadingSpinner";

export default () => {
  const [loading, setLoading] = useState(true);

  return (
    <ScrollView className="bg-[#faf6ff]">
      <MusicContent loading={loading} setLoading={setLoading} />
      {loading ? <LoadingSpinner size="large" isColour={true} /> : <Reviews />}
    </ScrollView>
  );
};
