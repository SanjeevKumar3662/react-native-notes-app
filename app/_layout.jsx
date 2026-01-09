import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#ff8c00",
        },
        headerTintColor: "white",
        headerTitleStyle: {
          fontSize: 20,
          fontWeight: "bold",
        },
        contentStyle: {
          paddingHorizontal: 10,
          paddingTop: 10,
          backgroundColor: "white",
        },
      }}
    >
      <Stack.Screen name="index" options={{ title: "Home" }} />{" "}
      <Stack.Screen name="notes" options={{ headerTitle: "Notes" }} />{" "}
    </Stack>
  );
}
