import { Colors } from "@/constants/Colors";
import useSession from "@/hooks/useSession";
import { supabase } from "@/lib/supabase";
import { showOnAndroid } from "@/utils/showOnAndroid";
import { MaterialIcons } from "@expo/vector-icons";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { DrawerActions } from "@react-navigation/native";
import { useMutation } from "@tanstack/react-query";
import Constants from "expo-constants";
import { Image } from "expo-image";
import { useNavigation, useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, ToastAndroid, View } from "react-native";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const logout = async () => supabase.auth.signOut();

export function DrawerContent() {
  const session = useSession();
  const router = useRouter();
  const navigation = useNavigation<DrawerNavigationProp<{}>>();

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess() {
      navigation.dispatch(DrawerActions.closeDrawer());
      showOnAndroid(() => ToastAndroid.show("Logged out", ToastAndroid.SHORT));
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {session?.user && (
          <>
            <Image
              style={styles.headerImage}
              source="https://picsum.photos/seed/696/3000/2000"
              placeholder={{ blurhash }}
              contentFit="cover"
              transition={1000}
            />
            <Text style={styles.userName}>{session?.user?.email}</Text>
          </>
        )}
      </View>
      <View style={styles.footer}>
        {session?.user ? (
          <Pressable onPress={() => logoutMutation.mutate()}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Logout</Text>
              <MaterialIcons
                name="logout"
                size={24}
                color={Colors.dark.heading}
              />
            </View>
          </Pressable>
        ) : (
          <Pressable onPress={() => router.push("auth")}>
            <View style={[styles.button, styles.loginButton]}>
              <Text style={[styles.buttonText, styles.loginButtonText]}>
                Login
              </Text>
              <MaterialIcons
                name="logout"
                size={24}
                color={Colors.dark.primary}
              />
            </View>
          </Pressable>
        )}
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
  button: {
    padding: 10,
    borderRadius: 6,
    backgroundColor: Colors.dark.secondary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  buttonText: {
    color: Colors.dark.heading,
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: Colors.dark.primary,
  },
  loginButtonText: {},
});
