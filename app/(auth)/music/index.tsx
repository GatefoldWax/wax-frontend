import {
  ActivityIndicator,
  ScrollView,
  View,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useGlobalSearchParams } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { getMusic, getSpotifyMusic } from "../../../utils/api";
import { Music } from "../../../types/front-end";
import SearchOptions from "../../../components/SearchOptions";
import SearchFilterBar from "../../../components/SearchFilterBar";
import MusicList from "../../../components/MusicList";
import MusicHeader from "../../../components/MusicHeader";

const HomePage = () => {
  const [music, setMusic] = useState<Music[]>([]);
  const [dropdownVis, setDropdownVis] = useState(false);
  const [isSpotifySearched, setIsSpotifySearched] = useState(false);
  const [searchedUpMusic, setSearchedUpMusic] = useState<Music[]>([]);
  const [searchText, setSearchText] = useState(" ");
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const params = useGlobalSearchParams();

  useEffect(() => {
    (async () => {
      if (params.artistName) {
        handleSearchSubmit(params.artistName as string);
      } else {
        const musicData = await getMusic();
        setMusic(musicData);
        setIsLoading(false);
      }
    })();
  }, [params]);

  const scrollPosRef = useRef<any>();

  const scrollToTop = () => {
    scrollPosRef.current.scrollTo({
      x: 0,
      y: 0,
      animated: true,
    });
  };

  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    setTimeout(async () => {
      const musicData = await getMusic();
      setMusic(musicData);
      setIsRefreshing(false);
    }, 2000);
  }, []);

  const handleSearchSubmit = async (artistName: string) => {
    setIsLoading(true);
    try {
      const spotifyMusic = await getSpotifyMusic("album", artistName);
      setSearchText(artistName);
      setDropdownVis(false);
      setIsLoading(false);
      setSearchedUpMusic(spotifyMusic);
    } catch (err) {
      router.setParams({});
      console.log("🚀 ~ handleSearchSubmit ~ err:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="h-[100%]">
      <MusicHeader
        setDropdownVis={setDropdownVis}
        setSearchText={setSearchText}
      />

      {dropdownVis && (
        <SearchOptions
          searchText={searchText}
          setSearchText={setSearchText}
          setSearchedUpMusic={setSearchedUpMusic}
          setDropdownVis={setDropdownVis}
        />
      )}

      {searchedUpMusic.length > 0 && (
        <SearchFilterBar
          searchText={searchText}
          setSearchedUpMusic={setSearchedUpMusic}
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
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
          }
          ref={scrollPosRef}
          onContentSizeChange={scrollToTop}
        >
          <MusicList
            music={searchedUpMusic.length == 0 ? music : searchedUpMusic}
          />
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default HomePage;
