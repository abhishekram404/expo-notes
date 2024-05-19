import Pill from "@/components/Pill";
import PillsGroup from "@/components/PillsGroup";
import { Colors } from "@/constants/Colors";
import { state$ } from "@/lib/state";
import { Note } from "@/lib/types/Note.type";
import { PostNotePayload } from "@/lib/types/PostNotePayload.type";
import { generateRandomString } from "@/utils/generateRandomString";
import { showOnAndroid } from "@/utils/showOnAndroid";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import dayjs from "dayjs";
import { Stack, useRouter } from "expo-router";
import React, { useState } from "react";
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

const Create = () => {
  const router = useRouter();
  const [newPost, setNewPost] = useState<PostNotePayload>({
    title: "",
    bodyText: "",
  });

  const handleChange = (name: "title" | "bodyText") => (text: string) => {
    setNewPost((prev) => ({ ...prev, [name]: text }));
  };

  const addNote = (data: Pick<Note, "title" | "bodyText">) => {
    const note: Note = {
      title: data.title,
      bodyText: data.bodyText,
      isPrimary: false,
      isPinned: false,
      local_inserted_at: new Date(),
      local_updated_at: new Date(),
      local_id: generateRandomString(),
    };
    state$.notes.set((prev) => [note, ...prev]);
    router.dismiss();
  };

  const saveNote = async () => {
    if (!newPost.title.trim() && !newPost.bodyText.trim()) {
      showOnAndroid(() =>
        ToastAndroid.show("Note is empty", ToastAndroid.SHORT)
      );
      return;
    }
    addNote(newPost);
  };

  const today = dayjs().format("ddd, DD MMM YYYY");

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerRight: () => (
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
          ),
        }}
      />
      <TextInput
        placeholder="Title"
        style={styles.titleInput}
        maxLength={100}
        value={newPost.title}
        onChangeText={handleChange("title")}
        {...inputConfigs}
      />
      <Text style={styles.infoText}>
        {today}
        {newPost.bodyText && <>. {newPost.bodyText.length} characters</>}
      </Text>
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
          value={newPost.bodyText}
          onChangeText={handleChange("bodyText")}
          {...inputConfigs}
        />
      </ScrollView>
    </View>
  );
};

export default Create;

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
