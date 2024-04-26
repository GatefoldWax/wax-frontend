import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import "react-native-url-polyfill/auto";
import Auth from "../components/Auth";
import LoadingSpinner from "../components/reusable-components/LoadingSpinner";
import { UserContext } from "../contexts/UserContent";
import { supabase } from "../lib/supabase";
import { getFollows } from "../utils/api";

const Welcome = () => {
  const { setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2500);

    (async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const username = await AsyncStorage.getItem("username");

      if (session && username) {
        try {
          const { following } = await getFollows(username as string);
          setUser({ username, following });
          router.replace("/(auth)/music");
        } catch {
          setLoading(false);
        }
      }
    })();
  }, []);

  return (
    <SafeAreaView className="bg-[#B56DE4] h-full">
      {loading ? <LoadingSpinner size="large" isColour={false} /> : <Auth />}
    </SafeAreaView>
  );
};

export default Welcome;
