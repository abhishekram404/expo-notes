import "react-native-gesture-handler";

import { Colors } from "@/constants/Colors";
import useSession from "@/hooks/useSession";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Platform, StyleSheet, View } from "react-native";
export const unstable_settings = {
  initialRouteName: "index",
};

export default function StackLayout() {
  const session = useSession();
  const isAuthenticated = session?.user;

  return (
    <View style={styles.container}>
      {Platform.OS === "android" ? (
        <StatusBar translucent style="auto" />
      ) : null}
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
        {!isAuthenticated ? (
          <Stack.Screen
            name="auth"
            options={{
              title: "Authentication",
              headerBackButtonMenuEnabled: true,
            }}
          />
        ) : (
          <Stack.Screen name="index" />
        )}
        <Stack.Screen
          name="create"
          options={{
            title: "Create Note ",
            headerBackButtonMenuEnabled: true,
          }}
        />
      </Stack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
});
