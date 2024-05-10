import { View, Text, StyleSheet } from "react-native";
import React, { PropsWithChildren } from "react";

export default function PillsGroup({ children }: PropsWithChildren) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
});
