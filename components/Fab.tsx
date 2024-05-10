import { Colors } from "@/constants/Colors";
import React, { ReactNode } from "react";
import { Pressable, StyleSheet, View } from "react-native";

export default function Fab({
  children,
  onPress,
}: {
  children: ReactNode;
  onPress?: VoidFunction;
}) {
  return (
    <View style={styles.fab}>
      <Pressable
        onPress={onPress}
        android_ripple={{
          borderless: true,
          color: Colors.dark.ripple,
          foreground: false,
        }}
      >
        <View style={styles.innerView}>{children}</View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: Colors.dark.primary,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  innerView: {
    padding: 15,
  },
});
