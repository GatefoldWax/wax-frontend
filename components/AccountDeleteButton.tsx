import { useState } from "react";
import { Modal, Pressable, ScrollView, Text, View } from "react-native";
import { FormButton } from "./reusable-components/FormButton";
import * as accountDeletion from "../constants/text/accountDeletion.json";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";

const AccountDeleteButton = () => {
  const [disabled, setDisabled] = useState(false);

  const handleDeleteAccount = async () => {
    setDisabled(true);
    // await supabase.rpc("delete_account")
    setDisabled(false);
    router.replace("/");
  };
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View className="p-4 mx-auto">
      <Text className="p-4 my-auto text-lg">{accountDeletion.notice}</Text>

      <View className="bg-[#B56DE4]">
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
                disabled={disabled}
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
          disabled={disabled}
        />
      </View>
    </View>
  );
};

export default AccountDeleteButton;
