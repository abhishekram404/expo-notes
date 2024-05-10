import Pill from "@/components/Pill";
import PillsGroup from "@/components/PillsGroup";
import Spacer from "@/components/Spacer";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function index() {
  return (
    <View style={styles.container}>
      <ThemedText
        type="title"
        darkColor={Colors.dark.heading}
        style={styles.title}
      >
        My Notes
      </ThemedText>
      <Spacer size={6} />
      <PillsGroup>
        <Pill label="All" isActive />
        <Pill label="To-Do list" />
        <Pill label="Work" />
        <Pill label="Journal" />
      </PillsGroup>
      <Spacer size={6} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    paddingHorizontal: 10,
  },
  pillsBar: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    paddingHorizontal: 10,
    gap: 15,
  },
});
