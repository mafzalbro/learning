import { useState } from "react";
import {
  FlatList,
  Pressable,
  ScrollView,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
export default function WorkScreen() {
  const [counter, setCounter] = useState(0);
  const [current, setCurrent] = useState("");
  const handleCount = () => {
    setCounter((prevCount) => prevCount + 1);
  };
  const handleSetCurrent = (key: any) => {
    console.log(key);
    setCurrent(key);
  };

  return (
    <ScrollView className="h-screen flex justify-center items-center">
      <Text className="text-white text-center mb-4">WORK</Text>
      <Text className="text-white text-5xl text-center mb-4">{counter}</Text>
      <TouchableOpacity
        onPress={handleCount}
        className="bg-blue-500 rounded-2xl py-4 px-8"
      >
        Count
      </TouchableOpacity>

      <Text className="text-white mt-2 text-5xl">Our Features</Text>
      <FlatList
        className="ml-3 mt-1"
        data={[
          { title: "Title Text", key: "item1" },
          { title: "Title Text 2", key: "item2" },
          { title: "Title Text 3", key: "item3" },
          { title: "Title Text 4", key: "item4" },
        ]}
        renderItem={({ item }) => {
          return (
            <View className="text-xs font-thin text-white border-b border-gray-800 mt-2">
              <TouchableOpacity
                onPress={() => handleSetCurrent(item.key)}
                className={`p-2 ${
                  current === item.key ? "bg-gray-800 rounded-2xl" : ""
                }`}
              >
                {current === item.key ? `🔘 ${item.title}` : `🔴 ${item.title}`}
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </ScrollView>
  );
}
