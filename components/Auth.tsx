import { Colors } from "@/constants/Colors";
import { supabase } from "@/lib/supabase";
import { useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  Alert,
  AppState,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
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

const validateCreds = (creds: Credentials) => {
  if (!creds?.email?.trim()) {
    Alert.alert("Invalid credentials", "An email is required.");
    return false;
  }

  if (!creds?.password?.trim()) {
    Alert.alert("Invalid credentials", "A password is required.");
    return false;
  }

  return true;
};

export type Credentials = {
  email: string;
  password: string;
};

export default function Auth() {
  const queryClient = useQueryClient()
  const [isLoading, setLoading] = useState(false);
  const [creds, setCreds] = useState({
    email: "",
    password: "",
  });

  const handleChange = (name: "email" | "password") => (text: string) => {
    setCreds((prev) => ({ ...prev, [name]: text }));
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      const isCredentialsValid = validateCreds(creds);
      if (!isCredentialsValid) return;

      const { error } = await supabase.auth.signInWithPassword(creds);
      if (error) return Alert.alert("Login failed", error.message);

      queryClient.invalidateQueries({
        queryKey: ['auth-user']
      })
      ToastAndroid.show("Login successful", ToastAndroid.SHORT);
    } catch (error) {
      Alert.alert("Login failed", "Something went wrong while logging you in.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    try {
      setLoading(true);
      const isCredentialsValid = validateCreds(creds);
      if (!isCredentialsValid) return;

      const { data, error } = await supabase.auth.signUp(creds);
      if (error) return Alert.alert("Registration failed", error.message);

      if (!data.session)
        Alert.alert(
          "Registration successful",
          "Please check your inbox for email verification!"
        );
    } catch (error) {
      Alert.alert(
        "Registration failed",
        "Something went wrong while signing you up."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Login</Text>
        <Spacer size={6} />
        <View style={styles.inputLabelGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. abc@xyz.com"
            placeholderTextColor={Colors.dark.secondaryText}
            cursorColor={Colors.dark.primary}
            selectionColor={Colors.dark.primary}
            value={creds.email}
            onChangeText={handleChange("email")}
          />
        </View>
        <Spacer size={4} />
        <View style={styles.inputLabelGroup}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            value={creds.password}
            placeholder="e.g. NF*4WXf9RU"
            placeholderTextColor={Colors.dark.secondaryText}
            cursorColor={Colors.dark.primary}
            selectionColor={Colors.dark.primary}
            secureTextEntry
            onChangeText={handleChange("password")}
          />
        </View>
        <Spacer size={10} />
        <Pressable onPress={handleLogin} disabled={isLoading}>
          <View style={[styles.button, styles.buttonPrimary]}>
            <Text style={[styles.buttonText, styles.buttonPrimaryText]}>
              Login
            </Text>
          </View>
        </Pressable>
        <Spacer size={4} />
        <Pressable onPress={handleRegister} disabled={isLoading}>
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
