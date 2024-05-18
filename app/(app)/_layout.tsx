import Auth from "@/components/Auth";
import { Colors } from "@/constants/Colors";
import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

export const unstable_settings = {
    initialRouteName: "index",
  };
  

export default function AppLayout() {
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
      {session ? (
        <Stack
          initialRouteName="index"
          screenOptions={{
            title: "Expo Notes",
            statusBarStyle: "auto",
            statusBarTranslucent: true,
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
