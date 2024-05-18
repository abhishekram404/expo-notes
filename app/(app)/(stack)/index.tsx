import Fab from "@/components/Fab";
import Pill from "@/components/Pill";
import PillsGroup from "@/components/PillsGroup";
import Spacer from "@/components/Spacer";
import { Colors } from "@/constants/Colors";
import { state$ } from "@/lib/state";
import { determineCardsGroup } from "@/utils/determineCardsGroup";
import { renderCard } from "@/utils/renderCard";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { observer } from "@legendapp/state/react";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { router, Stack, useNavigation } from "expo-router";
import React from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";

/**
 * FIXME: this is currently fetching all notes from all users.
 * This isn't secure.
 */

export default observer(function index() {
  const navigation = useNavigation<DrawerNavigationProp<{}>>();
  // const { data: notes = [] } = useQuery({
  //   queryKey: ["all-notes"],
  //   queryFn: fetchNotes,
  //   select(data: any) {
  //     return data?.data;
  //   },
  // });

  const notes = state$.notes.get();
  const cards = determineCardsGroup(notes);

  return (
    <>
      <Stack.Screen
        options={{
          headerLeft(props) {
            return (
              <Pressable onPress={() => navigation.openDrawer()}>
                <View style={[styles.headerButton]}>
                  <MaterialCommunityIcons
                    style={styles.headerButtonIcon}
                    name="menu"
                    size={28}
                    color={Colors.dark.heading}
                  />
                </View>
              </Pressable>
            );
          },
        }}
      />
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
              {cards?.left?.map(renderCard)}
            </View>
            <View style={[styles.card, styles.cardsRight]}>
              {cards?.right?.map(renderCard)}
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
    </>
  );
});

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
  headerButton: {
    padding: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  headerButtonIcon: {},
});
