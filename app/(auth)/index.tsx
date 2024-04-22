import React, { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import Auth from "../../components/Auth";

import "react-native-url-polyfill/auto";
import { Session } from "@supabase/supabase-js";
import { supabase } from "../../lib/supabase";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFollows } from "../../utils/api";
import { UserContext } from "../../contexts/UserContent";
import { ActivityIndicator } from "react-native";

const Welcome = () => {
  const [session, setSession] = useState<Session | null>(null);
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
          setSession(session);
          router.replace("/(auth)/music");
        } catch {
          setLoading(false);
        }
      }

      setSession(session);
    })();

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <SafeAreaView className="bg-[#B56DE4] h-full">
      {loading ? (
        <ActivityIndicator
          size="large"
          style={{ transform: [{ scaleX: 2 }, { scaleY: 2 }] }}
          color="#FFFFFF"
          className="m-auto"
        />
      ) : (
        <Auth session={session!} />
      )}
    </SafeAreaView>
  );
};

export default Welcome;
