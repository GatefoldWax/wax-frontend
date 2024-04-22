import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  router,
  useGlobalSearchParams,
} from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { getMusic, getSpotifyMusic } from "../../../utils/api";
import { Music } from "../../../types/front-end";
import SearchDropDown from "../../../components/SearchDropDown";
import { Ionicons } from "@expo/vector-icons";
import SearchFilterBar from "../../../components/SearchFilterBar";

const Albums = () => {
  const [music, setMusic] = useState<Music[]>([]);
  const [dropDVis, setDropDVis] = useState(false);
  const [isSpotifySearched, setIsSpotifySearched] = useState(false);
  const [searchedUpMusic, setSearchedUpMusic] = useState<Music[]>([]);
  const [searchText, setSearchText] = useState(" ");
  const [isLoading, setIsLoading] = useState(true);
  const [buttonColor, setButtonColor] = useState({slot1: '',slot2: ''});
  const [isRefreshing, setIsRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    setTimeout(async () => {
      const musicData = await getMusic();
      setMusic(musicData);
      setIsRefreshing(false);
    }, 2000);
  }, []);

  const params = useGlobalSearchParams();

  useEffect(() => {
    (async () => {
      if (params.artistName) {
        handleSearchSubmit(params.artistName as string);
      }
      else{
      const musicData = await getMusic();
      setMusic(musicData);
      setIsLoading(false);}
    })();
  }, [params]);

  const handleSearchSubmit = async (artistName: string) => {
    setIsLoading(true);
      try {
        const spotifyMusic = await getSpotifyMusic('album', artistName);
        setSearchText(artistName)
        setDropDVis(false);
        setIsLoading(false);
        setIsSpotifySearched(true);
        setSearchedUpMusic(spotifyMusic);
      } catch (err) {
        router.setParams({})
        console.log("🚀 ~ handleSearchSubmit ~ err:", err);
      } finally {
        setIsLoading(false);
        
      }
    
  };

  return (
    <SafeAreaView className="h-[100%]">
      <TouchableWithoutFeedback
        onPress={() => {
          setDropDVis(false);
        }}
      >
        <View className="w-full h-24 flex-row items-center justify-around bg-[#B56DE4] ">
          <Pressable
            className={`items-center mx-6 p-2 ${buttonColor.slot1} rounded-md`}
            onPressIn={() => {
              setButtonColor({...buttonColor,slot1:"bg-[#9058B5]"});
              setDropDVis(!dropDVis);
              setIsSpotifySearched(false);
              setSearchText("");
            }}
            onPressOut={() => {
              setButtonColor({...buttonColor,slot1:""});
            }}
          >
            <Ionicons
              name="search-outline"
              size={30}
              color="black"
              className="m-4"
            />
          </Pressable>
          <Image
            source={require("../../../assets/images/Wax-logo-transparent.png")}
            className="h-full w-[50%]"
            resizeMode="center"
          />
          <Pressable
            onPressIn={()=>{setButtonColor({...buttonColor,slot2:"bg-[#9058B5]"})}}
            onPressOut={() => {
              setButtonColor({...buttonColor,slot2:""})
              router.push(`/(auth)/users`)}}
            className={`items-center mx-6 p-2 ${buttonColor.slot2} rounded-md`}
          >
            <Ionicons
              name="person-outline"
              size={30}
              color="black"
              className="m-4"
            />
          </Pressable>
        </View>
      </TouchableWithoutFeedback>
      {dropDVis && (
        <SearchDropDown
          searchText={searchText}
          setSearchText={setSearchText}
          setSearchedUpMusic={setSearchedUpMusic}
          dropDVis={dropDVis}
          setDropDVis={setDropDVis}
          setIsSpotifySearched={setIsSpotifySearched}
          isSpotifySearched={isSpotifySearched}
        />
      )}
      {isSpotifySearched && (
        <SearchFilterBar
          searchText={searchText}
          setIsSpotifySearched={setIsSpotifySearched}
        />
      )}

      {isLoading ? (
        <View className="mt-[100%]">
          <ActivityIndicator
            size="large"
            style={{ transform: [{ scaleX: 2 }, { scaleY: 2 }] }}
            color="#B56DE4"
          />
        </View>
      ) : isSpotifySearched && Array.isArray(searchedUpMusic) ? (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
          }
        >
          <View className="flex flex-row flex-wrap justify-between bg-pink-50 mb-20 mt-2 h-[85%]">
            {searchedUpMusic.map((track) => (
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
                  <Text className="text-center py-1 mt-2">
                    {track.artist_names}
                  </Text>
                  <Text className="text-center">{track.name}</Text>
                </View>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
          }
        >
          <View className="flex flex-row flex-wrap justify-between bg-white min-h-fit pt-2">
            {music.map((track) => (
              <Pressable
                key={track.music_id}
                onPress={() => router.push(`/(auth)/music/${track.music_id}`)}
                className="w-1/2 h-auto"
              >
                <View
                  key={track.music_id}
                  className=" p-4 bg-white rounded-lg items-center justify-center"
                >
                  <Image
                    source={{ uri: track.album_img }}
                    className="w-40 h-40  rounded-lg"
                  />
                  <Text className="text-center py-1">{track.artist_names}</Text>
                  <Text className="text-center">{track.name}</Text>
                </View>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Albums;
