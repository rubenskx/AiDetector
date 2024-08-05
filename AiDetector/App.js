import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import UploadImage from "./components/screens/UploadImage";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Result from "./components/screens/Result";
import BaseContainer from "./ui/BaseContainer";
import TextUI from "./ui/TextUI";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="home"
          component={Home}
          options={{
            headerTitle: () => {
              return (
                <TextUI
                  isBold={true}
                  style={{ fontSize: 30, color: "#1D3557" }}
                >
                  AiDetector
                </TextUI>
              );
            },
            headerStyle: {
              backgroundColor: "#457B9D",
            },
          }}
        />
        <Stack.Screen
          name="result"
          component={Result}
          options={{
            headerTitle: () => {
              return (
                <TextUI
                  isBold={true}
                  style={{ fontSize: 30, color: "#1D3557" }}
                >
                  Prediction
                </TextUI>
              );
            },
            headerStyle: {
              backgroundColor: "#457B9D",
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function Home() {
  return (
    <>
      <StatusBar style="light" />
      <BaseContainer>
        <UploadImage />
      </BaseContainer>
    </>
  );
}
