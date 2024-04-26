import { Dispatch, SetStateAction } from "react";
import { supabase } from "../lib/supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

export const signOutUser = async (
  setUser: Dispatch<SetStateAction<{ username: string; following: string[] }>>
) => {
  await supabase.auth.signOut();
  await AsyncStorage.removeItem("username");
  setUser({ username: "", following: [] });
  router.replace(`/`);
};
