import Fab from "@/components/Fab";
import Pill from "@/components/Pill";
import PillsGroup from "@/components/PillsGroup";
import Spacer from "@/components/Spacer";
import { Colors } from "@/constants/Colors";
import { supabase } from "@/lib/supabase";
import { determineCardsGroup } from "@/utils/determineCardsGroup";
import { renderCard } from "@/utils/renderCard";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

const fetchNotes = async () =>
  supabase.from("notes").select().order("updated_at", {
    ascending: false,
  });

export default function index() {
  const { data: notes = [] } = useQuery({
    queryKey: ["all-notes"],
    queryFn: fetchNotes,
    select(data: any) {
      return data?.data;
    },
  });

  const { left, right } = determineCardsGroup(notes);

  return (
    <View style={styles.container}>
      <PillsGroup>
        <Pill label="All" isActive />
        <Pill label="To-Do list" />
        <Pill label="Work" />
        <Pill label="Journal" />
      </PillsGroup>
      <Spacer size={10} />
      <ScrollView>
        <View style={styles.cardsSectionsContainer}>
          <View style={[styles.card, styles.cardsLeft]}>
            {left.map(renderCard)}
          </View>
          <View style={[styles.card, styles.cardsRight]}>
            {right.map(renderCard)}
          </View>
        </View>
      </ScrollView>
      <Fab onPress={() => router.push("/create")}>
        <MaterialCommunityIcons
          name="plus"
          size={28}
          color={Colors.dark.heading}
        />
      </Fab>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    paddingHorizontal: 10,
    color: Colors.dark.heading,
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
