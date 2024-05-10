import { StyleSheet, Text, View } from "react-native";
import React, { Component } from "react";
import { Colors } from "@/constants/Colors";
import { ThemedText } from "./ThemedText";

export default function Pill({ label }: { label: string }) {
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
