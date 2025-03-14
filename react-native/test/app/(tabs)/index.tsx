import { router } from "expo-router";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

export default function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-gray-900 p-10">
      <Text className="text-white text-6xl font-bold mb-4">Hey 👋</Text>
      <Text className="text-gray-300 text-lg text-center px-6">
        Welcome to our awesome app! Get ready for an amazing experience.
      </Text>

      <TouchableOpacity
        onPress={() => router.push("/explore")}
        className="mt-6 bg-blue-500 px-6 py-3 rounded-2xl shadow-lg"
      >
        <Text className="text-white text-lg font-semibold">Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}
