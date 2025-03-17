import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import { Home, Send, AppWindow } from "lucide-react-native";
import { HapticTab } from "@/components/HapticTab";
// import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarInactiveTintColor: "#aaa",
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,

        tabBarStyle: {
          backgroundColor: colorScheme === "dark" ? "#111" : "#fff",
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          height: 60,
          paddingBottom: 10,
        },

        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
          textTransform: "uppercase",
        },
      }}
    >
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color }) => <Send size={28} color={color} />,
        }}
      />

      {/* Move Home tab slightly up */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <Home size={32} color={color} />,
          tabBarItemStyle: {
            position: "absolute",
            top: -30, // Moves the Home tab up
            left: "50%",
            transform: [{ translateX: "-50%" }],
            alignSelf: "center",
            backgroundColor: "#111",
            boxShadow: "1px 3px 5px rgba(0, 0, 0, 0.2)",
            padding: 10,
            borderRadius: 100,
          },
        }}
      />

      <Tabs.Screen
        name="work"
        options={{
          title: "Work",
          tabBarIcon: ({ color }) => <AppWindow size={28} color={color} />,
        }}
      />
    </Tabs>
  );
}
