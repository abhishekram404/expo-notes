import Pill from "@/components/Pill";
import PillsGroup from "@/components/PillsGroup";
import { Colors } from "@/constants/Colors";
import React from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TextInputProps,
    View,
} from "react-native";

const inputConfigs: TextInputProps = {
  placeholderTextColor: Colors.dark.text,
  selectionColor: Colors.dark.primary,
  multiline: true,
  cursorColor: Colors.dark.primary,
};
const create = () => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Title"
        style={styles.titleInput}
        maxLength={100}
        {...inputConfigs}
      />
      <Text style={styles.infoText}>Tue, 27 June 2023 . 120 Characters</Text>
      <PillsGroup>
        <Pill label="To-Do list" mini />
        <Pill label="Personal" mini />
        <Pill label="Work" mini />
        <Pill label="Journal" mini />
      </PillsGroup>
      <ScrollView automaticallyAdjustKeyboardInsets>
        <TextInput
          placeholder="Write your note here..."
          style={styles.contentInput}
          textAlignVertical="top"
          {...inputConfigs}
        />
      </ScrollView>
    </View>
  );
};

export default create;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    gap: 15,
  },
  header: {},
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
  titleInput: {
    fontSize: 28,
    borderRadius: 5,
    color: Colors.dark.heading,
  },
  infoText: {
    color: Colors.dark.text,
    fontSize: 14,
  },
  contentInput: {
    fontSize: 18,
    color: Colors.dark.heading,
    lineHeight: 26,
  },
});
