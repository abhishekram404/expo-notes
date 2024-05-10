import Card from "@/components/Card";
import Pill from "@/components/Pill";
import PillsGroup from "@/components/PillsGroup";
import Spacer from "@/components/Spacer";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { fakeTasks } from "@/data";
import { determineCardsGroup } from "@/utils/determineCardsGroup";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

export default function index() {
  const { left, right } = determineCardsGroup(fakeTasks);
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
      <ScrollView>
        <View style={styles.cardsSectionsContainer}>
          <View style={[styles.card, styles.cardsLeft]}>
            {left.map((card) => (
              <Card key={card.id} {...card} />
            ))}
          </View>
          <View style={[styles.card, styles.cardsRight]}>
            {right.map((card) => (
              <Card key={card.id} {...card} />
            ))}
          </View>
        </View>
      </ScrollView>
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
  cardsSectionsContainer: {
    flexDirection: "row",
    gap: 10,
  },
  card: {
    flexDirection: "column",
    gap: 10,
    flex: 1,
  },
  cardsLeft: {},
  cardsRight: {},
});
