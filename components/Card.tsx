import { Colors } from "@/constants/Colors";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ThemedText } from "./ThemedText";

export default function Card({ isPrimary }: { isPrimary?: boolean }) {
  return (
    <View style={[styles.container, isPrimary && styles.primary]}>
      <View style={styles.header}>
        <ThemedText darkColor={Colors.dark.heading} style={styles.title}>
          Today Work
        </ThemedText>
        <MaterialIcons
          name="more-horiz"
          size={20}
          color={Colors.dark.secondaryText}
        />
      </View>
      <View style={styles.body}>
        <Text style={[styles.bodyText, isPrimary && styles.bodyTextPrimary]}>
          UI/UX Design involves effective design principles.
        </Text>
      </View>
      <View style={styles.footer}>
        <Text style={[styles.date, isPrimary && styles.primaryFooter]}>
          Tue, 27 June 2023
        </Text>
        <MaterialCommunityIcons
          name="pin-outline"
          size={16}
          color={Colors.dark.secondaryText}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: Colors.dark.secondary,
    borderRadius: 20,
    gap: 10,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: 500,
  },

  body: {},
  bodyText: {
    color: Colors.dark.text,
    fontSize: 16,
    lineHeight: 24,
  },
  bodyTextPrimary: {
    color: Colors.dark.heading,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  date: {
    color: Colors.dark.secondaryText,
    fontSize: 13,
  },

  primary: {
    backgroundColor: Colors.dark.primary,
  },
  primaryFooter: {
    color: Colors.dark.heading,
  },
});
