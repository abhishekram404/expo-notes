import { Colors } from "@/constants/Colors";
import React from "react";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "./ThemedText";

export default function Pill({
  label,
  isActive,
  mini,
}: {
  label: string;
  isActive?: boolean;
  mini?: boolean;
}) {
  return (
    <View
      style={[styles.container, isActive && styles.active, mini && styles.mini]}
    >
      <ThemedText
        darkColor={isActive ? Colors.dark.background : Colors.dark.text}
        style={[styles.text, mini && styles.textMini]}
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
  text: {
    fontSize: 14,
  },
  active: {
    backgroundColor: Colors.dark.heading,
  },
  mini: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  textMini: {
    fontSize: 12,
  },
});
