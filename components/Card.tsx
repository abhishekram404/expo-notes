import { Colors } from "@/constants/Colors";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import dayjs from "dayjs";
import RelativeTime from "dayjs/plugin/relativeTime";
import React, { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ThemedText } from "./ThemedText";

dayjs.extend(RelativeTime);

export type CardBodyType = "text" | "custom";
export type CardProps = {
  isPrimary?: boolean;
  title: string;
  bodyType?: CardBodyType;
  body?: ReactNode;
  bodyText?: string;
  date: string;
  isPinned?: boolean;
};
export default function Card(props: CardProps) {
  const { isPrimary, title, body, bodyText, bodyType, date, isPinned } = props;
  return (
    <View style={[styles.container, isPrimary && styles.primary]}>
      <View style={styles.header}>
        <ThemedText
          darkColor={Colors.dark.heading}
          style={styles.title}
          numberOfLines={1}
        >
          {title}
        </ThemedText>
        <MaterialIcons
          name="more-horiz"
          size={20}
          color={Colors.dark.secondaryText}
        />
      </View>
      <View style={styles.body}>
        {bodyType === "text" && (
          <Text style={[styles.bodyText, isPrimary && styles.bodyTextPrimary]}>
            {bodyText}{" "}
          </Text>
        )}
        {bodyType === "custom" && body}
      </View>
      <View style={styles.footer}>
        <Text style={[styles.date, isPrimary && styles.primaryFooter]}>
          {dayjs(date).fromNow()}
        </Text>
        <MaterialCommunityIcons
          name={isPinned ? "pin" : "pin-outline"}
          size={16}
          color={isPinned ? Colors.dark.heading : Colors.dark.secondaryText}
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
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 10,
  },
  title: {
    flex: 0.95,
    fontSize: 16,
    fontWeight: 500,
    color: Colors.dark.heading,
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
