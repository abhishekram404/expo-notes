import Auth from "@/components/Auth";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { supabase } from "@/lib/supabase";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { Session } from "@supabase/supabase-js";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import "react-native-reanimated";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  initialRouteName: "index",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={DarkTheme}>
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
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
});
