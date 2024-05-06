import { AntDesign } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Modal, Pressable, ScrollView, Text, View } from "react-native";
import Markdown from "react-native-markdown-display";
import { getPrivacyPolicy } from "../utils/api";

const PrivacyPolicy = ({
  loading,
  signUpWithEmail,
}: {
  loading: boolean;
  signUpWithEmail: Function;
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [policyBody, setPolicyBody] = useState("");
  const [policyId, setPolicyId] = useState(0);

  useEffect(() => {
    (async () => {
      const { body, id } = await getPrivacyPolicy();
      setPolicyBody(body);
      setPolicyId(id);
    })();
  }, []);

  return (
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
              <Markdown>{policyBody}</Markdown>
            </ScrollView>

            <Pressable
              onPress={() =>
                signUpWithEmail(policyId) && setModalVisible(false)
              }
              disabled={loading}
              className="bg-[#ffffffc0] w-40 p-4 mt-3 rounded-md mx-auto"
            >
              <Text className="text-center">Accept and continue</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        className="bg-black mx-auto my-8 py-2 px-6 rounded-xl border-x border-b border-stone-500"
        onPress={() => setModalVisible(true)}
      >
        <Text className="text-center text-white text-2xl w-auto mx-auto">
          Submit
        </Text>
      </Pressable>
    </View>
  );
};

export default PrivacyPolicy;
