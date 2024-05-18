import { Colors } from "@/constants/Colors";
import { supabase } from "@/lib/supabase";
import { MaterialIcons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import Constants from "expo-constants";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const getUser = async () => supabase.auth.getUser();

export function DrawerContent() {
  const { data } = useQuery({
    queryKey: ["auth-user"],
    queryFn: getUser,
  });
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.headerImage}
          source="https://picsum.photos/seed/696/3000/2000"
          placeholder={{ blurhash }}
          contentFit="cover"
          transition={1000}
        />
        <Text style={styles.userName}>{data?.data?.user?.email}</Text>
      </View>
      <View style={styles.footer}>
        <View style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Logout</Text>
          <MaterialIcons name="logout" size={24} color={Colors.dark.heading} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginTop: Constants.statusBarHeight * 2,
    flex: 1,
    flexDirection: "column",
    gap: 15,
  },
  headerImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  userName: {
    color: Colors.dark.heading,
    fontSize: 18,
    fontWeight: "bold",
  },
  footer: {},
  logoutButton: {
    padding: 10,
    borderRadius: 6,
    backgroundColor: Colors.dark.secondary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  logoutButtonText: {
    color: Colors.dark.heading,
    fontSize: 16,
  },
});
