import { Text, View, Image, Pressable } from "react-native";
import { Music, Track } from "../types/front-end";
import React, { EffectCallback, useEffect, useState } from "react";
import { Navigator, useGlobalSearchParams } from "expo-router";
import { getMusic, getSpotifyTrackList } from "../utils/api";
import { Audio } from "expo-av";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import { router } from "expo-router";

const AlbumPage = () => {
  const { music_id } = useGlobalSearchParams();
  const [musicContent, setMusicContent] = useState<Music>();
  const [ratingColor, setRatingColor] = useState("text-green-800");
  const [isPlaying, setIsPlaying] = useState(false);
  const [playableMedia, setPlayableMedia] = useState<Audio.Sound | undefined>();
  const [isAlbumFlipped, setIsAlbumFlipped] = useState(false);
  const [tracks, setTracks] = useState<Track[] | []>([]);

  useEffect(() => {
    (async () => {
      const musicData = await getMusic(music_id as string, "true");

      setMusicContent(musicData);

      if (!musicData?.tracks?.length) {
        const trackData = await getSpotifyTrackList(music_id as string);
        setTracks(trackData || []);
      } else {
        setTracks(musicData.tracks);
      }

      let score = parseInt(musicData?.avg_rating);
      if (score < 7 && score > 4) {
        setRatingColor("text-yellow-600");
      } else if (score <= 4) {
        setRatingColor("text-red-700");
      }
    })();
  }, []);

  useEffect((): any => {
    return async () => {
      await playableMedia?.unloadAsync();
    };
  }, [playableMedia]);

  const handlePlay = async () => {
    await playPreview(!isPlaying);
  };

  const playPreview = async (bool: boolean) => {
    if (typeof musicContent?.preview === "string" && bool) {
      const { sound } = await Audio.Sound.createAsync(
        {
          uri: musicContent.preview,
        },
        { shouldPlay: true }
      );
      setPlayableMedia(sound);

      playableMedia && (await playableMedia.playAsync());
    } else if (
      typeof musicContent?.preview === "string" &&
      !bool &&
      playableMedia
    ) {
      await playableMedia.unloadAsync();
    }
    setIsPlaying((current) => {
      return !current;
    });
  };

  const goToArtistSearch = (artistName: string) => {
    router.push({ pathname: `/(auth)/music`, params: { artistName } });
  };

  return (
    <View className="bg-[#faf6ff] flex justify-center items-center">
      <Text className="text-center  text-xl font-bold my-3 ">
        {musicContent?.name}
      </Text>
      <Text>by</Text>
      <View className="mb-3">
        {musicContent?.artist_names.map((artistName) => {
          return (
            <Pressable
              key={artistName}
              onPress={() => {
                goToArtistSearch(artistName);
              }}
            >
              <Text className="text-center m-50 text-xl m-1 underline-offset-3 underline">
                {artistName}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {isAlbumFlipped ? (
        <ScrollView className="h-[350] w-[350] rounded-md">
          {tracks && tracks?.length
            ? tracks.map((track) => {
                return (
                  <Text
                    key={track.id}
                    className="py-2"
                  >{`${track.track_number}: ${track.name}`}</Text>
                );
              })
            : null}
        </ScrollView>
      ) : (
        <Image
          source={{ uri: musicContent?.album_img }}
          className="h-[350] w-[350] rounded-md"
        />
      )}

      {!musicContent?.avg_rating && (
        <Text className="font-bold text-lg">no reviews yet...</Text>
      )}
      <View className="flex flex-row justify-center w-full">
        {musicContent?.avg_rating && (
          <Text className={`${ratingColor} font-bold text-lg m-2 p-2`}>
            Rating: {musicContent?.avg_rating}
          </Text>
        )}
        {musicContent?.preview && (
          <Pressable
            onPress={handlePlay}
            className="flex justify-center align-middle"
          >
            {!isPlaying && <Ionicons name="play" size={40} color={"black"} />}
            {isPlaying && <Ionicons name="pause" size={40} color={"black"} />}
          </Pressable>
        )}
        {tracks.length ? (
          <Pressable
            onPress={() => {
              setIsAlbumFlipped(!isAlbumFlipped);
            }}
            className="flex justify-center align-middle"
          >
            <Ionicons
              name="play-skip-forward-outline"
              size={30}
              color={"black"}
            />
          </Pressable>
        ) : null}
      </View>

      <Pressable
        className="bg-[#1ed760] p-4 rounded-full my-2"
        onPress={() =>
          router.replace(
            `https://open.spotify.com/${tracks.length ? "album" : "track"}/${
              musicContent?.music_id
            }`
          )
        }
      >
        <Text className="font-|bold">Open in Spotify</Text>
      </Pressable>
    </View>
  );
};

export default AlbumPage;
