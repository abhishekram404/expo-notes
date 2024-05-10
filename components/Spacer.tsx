import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function Spacer({ size }: { size: number }) {
  return <View style={{ marginVertical: size }}></View>;
}
