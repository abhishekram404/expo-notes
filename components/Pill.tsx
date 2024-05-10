import { Colors } from "@/constants/Colors";
import React from "react";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "./ThemedText";

export default function Pill({
  label,
  isActive,
}: {
  label: string;
  isActive?: boolean;
}) {
  return (
    <View style={{ ...styles.container, ...(isActive ? styles.active : {}) }}>
      <ThemedText
        darkColor={isActive ? Colors.dark.background : Colors.dark.text}
      >
        {label}
      </ThemedText>
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
  active: {
    backgroundColor: Colors.dark.heading,
  },
});
