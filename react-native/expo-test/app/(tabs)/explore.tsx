import { Link, router } from "expo-router";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Pressable,
} from "react-native";
export default function TabTwoScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-gray-900 p-10">
      <Text
        style={{ fontFamily: "Outfit" }}
        className="text-white text-4xl font-bold mb-4"
      >
        Explore 🌟
      </Text>
      <Text
        style={{ fontFamily: "Outfit" }}
        className="text-gray-300 text-lg text-center px-6"
      >
        Welcome to our awesome app! Get ready for an amazing experience.
      </Text>
      <Link asChild href="/">
        <TouchableOpacity className="mt-6 bg-blue-500 px-6 py-3 rounded-2xl shadow-lg">
          <Text
            style={{ fontFamily: "Outfit" }}
            className="text-white text-lg font-semibold"
          >
            Click Me
          </Text>
        </TouchableOpacity>
      </Link>

      <TouchableOpacity
        onPress={() => {
          router.push("/");
          alert("clicked");
        }}
        className="mt-6 bg-red-400 px-6 py-3 rounded-2xl shadow-lg"
      >
        <Text
          style={{ fontFamily: "Outfit" }}
          className="text-white text-lg font-semibold"
        >
          Click Me With router method
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
