import { Colors } from "@/constants/Colors";
import { supabase } from "@/lib/supabase";
import React from "react";
import {
    AppState,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import Spacer from "./Spacer";

AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export default function Auth() {
  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Login</Text>
        <Spacer size={6} />
        <View style={styles.inputLabelGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput style={styles.input} />
        </View>
        <Spacer size={4} />
        <View style={styles.inputLabelGroup}>
          <Text style={styles.label}>Password</Text>
          <TextInput style={styles.input} />
        </View>
        <Spacer size={10} />
        <Pressable>
          <View style={[styles.button, styles.buttonPrimary]}>
            <Text style={[styles.buttonText, styles.buttonPrimaryText]}>
              Login
            </Text>
          </View>
        </Pressable>
        <Spacer size={4} />
        <Pressable>
          <View style={[styles.button, styles.buttonSecondary]}>
            <Text style={[styles.buttonText, styles.buttonSecondatyText]}>
              Register
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    padding: 10,
  },
  form: {
    flex: 1,
    backgroundColor: "#39393a",
    padding: 22,
    borderRadius: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.dark.heading,
  },
  inputLabelGroup: {
    gap: 4,
  },
  label: {
    color: Colors.dark.heading,
  },
  input: {
    backgroundColor: Colors.dark.heading,
    fontSize: 18,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 4,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 6,
    borderWidth: 2,
  },
  buttonText: {
    fontWeight: "500",
    fontSize: 16,
    letterSpacing: 1,
  },
  buttonPrimary: {
    borderColor: Colors.dark.primary,
    backgroundColor: Colors.dark.primary,
  },
  buttonPrimaryText: {
    color: Colors.dark.heading,
  },
  buttonSecondary: {
    borderColor: Colors.dark.primary,
  },
  buttonSecondatyText: {
    color: Colors.dark.heading,
  },
});
