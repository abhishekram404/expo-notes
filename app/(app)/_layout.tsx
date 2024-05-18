import "react-native-gesture-handler";

import { Drawer } from "expo-router/drawer";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
export const unstable_settings = {
  initialRouteName: "index",
};

export default function AppLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer>
        <Drawer.Screen name="(stack)" options={{ headerShown: false }} />
      </Drawer>
    </GestureHandlerRootView>
  );
}
