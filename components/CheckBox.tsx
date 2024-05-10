import { Colors } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const CheckBox = ({ label, checked }: { label: string; checked?: boolean }) => {
  return (
    <View style={styles.container}>
      <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
        {checked && (
          <MaterialIcons name="check" size={16} color={Colors.dark.heading} />
        )}
      </View>
      <Text
        style={[styles.text, checked && styles.textChecked]}
        numberOfLines={1}
      >
        {label}
      </Text>
    </View>
  );
};

export default CheckBox;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dark.heading,
    padding: 10,
    borderRadius: 100,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  checkbox: {
    width: 25,
    height: 25,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: Colors.dark.text,
  },
  checkboxChecked: {
    borderColor: Colors.dark.primary,
    backgroundColor: Colors.dark.primary,
  },
  text: {
    flex: 1,
    color: Colors.dark.background,
    fontSize: 16,
  },
  textChecked: {
    textDecorationLine: "line-through",
    color: Colors.dark.text,
  },
});
