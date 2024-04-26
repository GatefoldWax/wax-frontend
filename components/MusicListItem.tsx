import { router } from "expo-router";
import { Pressable, View, Image, Text } from "react-native";
import { Music } from "../types/front-end";

const MusicListItem = ({ track }: { track: Music }) => {
  return (
    <Pressable
      key={track.music_id}
      onPress={() => router.push(`/(auth)/music/${track.music_id}`)}
      className="w-1/2 h-auto"
    >
      <View
        key={track.music_id}
        className=" p-4 pink-50  rounded-lg items-center justify-center"
      >
        <Image
          source={{ uri: track.album_img }}
          className="w-40 h-40   rounded-lg"
        />
        <Text className="text-center py-1 mt-2">{track.artist_names}</Text>
        <Text className="text-center">{track.name}</Text>
      </View>
    </Pressable>
  );
};

export default MusicListItem;
