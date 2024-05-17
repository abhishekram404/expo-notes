import Pill from "@/components/Pill";
import PillsGroup from "@/components/PillsGroup";
import { Colors } from "@/constants/Colors";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  ToastAndroid,
  View,
} from "react-native";

const inputConfigs: TextInputProps = {
  placeholderTextColor: Colors.dark.text,
  selectionColor: Colors.dark.primary,
  multiline: true,
  cursorColor: Colors.dark.primary,
};
const create = () => {
  const router = useRouter();

  const goBack = () => router.back();
  const saveNote = () => {
    ToastAndroid.show("Note saved", ToastAndroid.SHORT);
    router.push("/");
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={goBack}>
          <View style={[styles.headerButton]}>
            <Ionicons
              style={styles.headerButtonIcon}
              name="chevron-back"
              size={20}
              color={Colors.dark.icon}
            />
          </View>
        </Pressable>
        <Text style={styles.headerTitle}>Create Note</Text>

        <Pressable onPress={saveNote}>
          <View style={[styles.headerButton]}>
            <MaterialCommunityIcons
              style={styles.headerButtonIcon}
              name="check"
              size={20}
              color={Colors.dark.primary}
            />
          </View>
        </Pressable>
      </View>
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.dark.text,
  },
  headerButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: Colors.dark.secondary,
    justifyContent: "center",
    alignItems: "center",
  },
  headerButtonIcon: {},
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
