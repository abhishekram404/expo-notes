import { Colors } from "@/constants/Colors";
import React from "react";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "./ThemedText";

export default function Pill({ label }: { label: string, isActive?: boolean }) {
  return (
    <View style={styles.container}>
      <ThemedText>{label}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dark.secondary,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 50,
  },
});
