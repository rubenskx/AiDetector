import { Text } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
SplashScreen.preventAutoHideAsync();

function TextUI({ children, style, isBold }) {
  const [fontsLoaded, fontError] = useFonts({
    "Poppins": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }
  let font = {
    fontFamily: "Poppins",
  };

  if (isBold) {
    font = {
      fontFamily: "Poppins-Bold",
    };
  }
  let newStyle = { ...style, ...font };
  //   if(style !== undefined){
  //     style.push(font)
  //   }
  return (
    <Text onLayout={onLayoutRootView} style={newStyle}>
      {children}
    </Text>
  );
}

export default TextUI;
