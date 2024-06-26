import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, Modal, Pressable, ScrollView, Text, View } from "react-native";
import * as accountDeletion from "../constants/text/accountDeletion.json";
import { supabase } from "../lib/supabase";
import { FormButton } from "./reusable-components/FormButton";
import LoadingSpinner from "./reusable-components/LoadingSpinner";

const AccountDeleteButton = () => {
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handleDeleteAccount = async () => {
    setLoading(true);
    const { error } = await supabase.rpc("delete_account");
    if (error) {
      Alert.alert(error.message);
    } else {
      router.replace("/");
    }
    setLoading(false);
  };

  return loading ? (
    <LoadingSpinner size="small" isColour={true} />
  ) : (
    <View className="p-4 mx-auto">
      <Text className="p-4 my-auto text-lg">{accountDeletion.notice}</Text>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View className="w-[90%] mx-[5%] h-[90%] bg-[#d8bbff] absolute inset-x-0 bottom-0 rounded-t-xl p-2 ">
          <View>
            <Pressable
              className="justify-self-end ml-[94%]"
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <AntDesign name="close" size={24} color="black" />
            </Pressable>

            <ScrollView
              contentInsetAdjustmentBehavior="scrollableAxes"
              className="h-[80%] mx-3"
            >
              <Text className="text-lg my-auto">
                {accountDeletion.confirmation}
              </Text>
            </ScrollView>

            <Pressable
              onPress={handleDeleteAccount}
              disabled={loading}
              className="bg-[#ffffffc0] w-40 p-4 mt-3 rounded-md mx-auto"
            >
              <Text className="text-center">Accept and continue</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <FormButton
        text="Delete Account"
        onPress={() => setModalVisible(!modalVisible)}
        disabled={loading}
      />
    </View>
  );
};

export default AccountDeleteButton;
