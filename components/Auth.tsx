import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useContext, useState } from "react";
import {
  Alert,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Input } from "react-native-elements";
import { UserContext } from "../contexts/UserContent";
import { supabase } from "../lib/supabase";
import { getFollows } from "../utils/api";
import PrivacyPolicy from "./PrivacyPolicy";
import { FormButton } from "./reusable-components/FormButton";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSigningUp, setIsSingingUp] = useState(false);

  const { setUser } = useContext(UserContext);

  async function signInWithEmail() {
    setLoading(true);
    const { error, data } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      Alert.alert(error.message);
      setLoading(false);
    } else {
      const username = data.user.user_metadata.username;
      const { following } = await getFollows(username as string);
      setUser({ username, following });
      AsyncStorage.setItem("username", username as string);
      router.replace("/(auth)/music");
      setLoading(false);
    }
  }

  async function signUpWithEmail(privacy_version: number) {
    setLoading(true);

    if (userName === "" || email === "" || password === "") {
      setLoading(false);
      Alert.alert("Please fill in all fields");
      return undefined;
    }

    if (/^[a-z0-9_]*$/.test(userName)) {
      setLoading(false);
      Alert.alert("Usernames may only consist of lower case letters, numbers, and underscores");
      return undefined;
    }

    const { data } = await supabase
      .from("users")
      .select("username")
      .eq("username", userName.toLowerCase());

    if (data?.length) {
      setLoading(false);
      Alert.alert("username already exists");
      return undefined;
    }

    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: { data: { username: userName.toLowerCase() } },
    });

    if (error) {
      Alert.alert(error.message);
      setLoading(false);
    }
    if (!session && !error) {
      Alert.alert("Please check your inbox for email verification!");
      setLoading(false);
    }

    if (session && !error) {
      await supabase.from("users").insert({
        username: userName.toLowerCase(),
        privacy_version,
        uuid: session.user.id,
      });
      setIsSingingUp(false);
      setLoading(false);
    }
  }

  const handleGuestLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInAnonymously();

    if (error) {
      Alert.alert(error.message);
      setLoading(false);
    } else {
      router.replace("/(auth)/music");
      setLoading(false);
    }
  };

  return (
    <View className="h-full">
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <>
          <View className="w-full h-1/4 justify-center items-center mt-14 mb-8">
            <Image
              source={require("../assets/images/icon.png")}
              resizeMode="center"
            />
          </View>
          <View className="mx-[2%]">
            <Input
              label="Email"
              labelStyle={{ color: "black" }}
              inputContainerStyle={{ borderColor: "black" }}
              leftIcon={{ type: "font-awesome", name: "envelope" }}
              onChangeText={(text) => setEmail(text)}
              value={email}
              placeholder="email@address.com"
              placeholderTextColor={"black"}
              autoCapitalize={"none"}
              keyboardType="email-address"
            />
          </View>

          {isSigningUp && (
            <View className="mx-[2%]">
              <Input
                label="username"
                labelStyle={{ color: "black" }}
                inputContainerStyle={{ borderColor: "black" }}
                leftIcon={{ type: "font-awesome", name: "user" }}
                onChangeText={(text) => setUserName(text)}
                value={userName}
                placeholder="myName123"
                placeholderTextColor={"black"}
                autoCapitalize={"none"}
              />
            </View>
          )}

          <View className="mx-[2%]">
            <Input
              inputContainerStyle={{ borderColor: "black" }}
              label="Password"
              labelStyle={{ color: "black" }}
              leftIcon={{ type: "font-awesome", name: "lock" }}
              onChangeText={(text) => setPassword(text)}
              value={password}
              secureTextEntry={true}
              placeholder="Password"
              placeholderTextColor={"black"}
              autoCapitalize={"none"}
            />
          </View>
        </>
      </TouchableWithoutFeedback>

      {!isSigningUp && (
        <>
          <View className="mx-auto my-4">
            <FormButton
              text="Sign in"
              disabled={loading}
              onPress={() => signInWithEmail()}
            />
          </View>

          <View className="h-1/3 flex flex-col justify-between">
            <View className="mx-auto my-4">
              <FormButton
                text="Sign up"
                disabled={loading}
                onPress={() => setIsSingingUp(!isSigningUp)}
              />
            </View>

            <View className="mx-auto my-16">
              <FormButton
                text="Continue as Guest"
                disabled={loading}
                onPress={() => handleGuestLogin()}
              />
            </View>
          </View>
        </>
      )}

      {isSigningUp && (
        <>
          <PrivacyPolicy loading={loading} signUpWithEmail={signUpWithEmail} />

          <View className="m-auto mt-4">
            <FormButton
              text="Go Back"
              disabled={loading}
              onPress={() => setIsSingingUp(false)}
            />
          </View>
        </>
      )}
    </View>
  );
}
