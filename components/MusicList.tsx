import { View } from "react-native";
import MusicListItem from "./MusicListItem";
import { Music } from "../types/front-end";

const MusicList = ({ music }: { music: Music[] }) => {
  return (
    <View className="flex flex-row flex-wrap justify-between bg-white min-h-fit pt-2">
      {music.map((track) => (
        <MusicListItem key={track.music_id} track={track} />
      ))}
    </View>
  );
};

export default MusicList;
