import "react-native-gesture-handler";

import Auth from "@/components/Auth";
import { Colors } from "@/constants/Colors";
import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Platform, StyleSheet, View } from "react-native";
export const unstable_settings = {
  initialRouteName: "index",
};

export default function StackLayout() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <View style={styles.container}>
      {Platform.OS === "android" ? (
        <StatusBar translucent style="auto" />
      ) : null}

      {session ? (
        <>
          <Stack
            initialRouteName="index"
            screenOptions={{
              title: "Expo Notes",
              headerTintColor: Colors.dark.heading,
              headerStyle: {
                backgroundColor: Colors.dark.background,
              },
            }}
          >
            <Stack.Screen
              name="create"
              options={{
                title: "Create Note ",
                headerBackButtonMenuEnabled: true,
              }}
            />
          </Stack>
        </>
      ) : (
        <Auth />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
});
