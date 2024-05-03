import { AntDesign } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Modal, Pressable, ScrollView, Text, View } from "react-native";
import Markdown from "react-native-markdown-display";
import { getPrivacyPolicy } from "../utils/api";

const PrivacyPolicy = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [policyBody, setPolicyBody] = useState("");

  useEffect(() => {
    (async () => {
      setPolicyBody(await getPrivacyPolicy());
    })();
  }, []);

  const handleAccept = () => {};

  return (
    <View className="bg-[#faf6ff]">
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
              <Markdown>{policyBody}</Markdown>
            </ScrollView>

            <Pressable
              onPress={handleAccept}
              className="bg-[#ffffffc0] w-40 p-4 mt-3 rounded-md mx-auto"
            >
              <Text className="text-center">Accept and continue</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        className="bg-[#bd91fcc0] mx-auto mt-5 p-3 rounded-md"
        onPress={() => setModalVisible(true)}
      >
        <Text className="text-center  ">View privacy policy</Text>
      </Pressable>
    </View>
  );
};

export default PrivacyPolicy;
