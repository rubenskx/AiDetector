import { Pressable, StyleSheet, Text, View } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import TextUI from "./TextUI";

function Button({ children, onPress, style }) {
  return (
    <View style={styles.container}>
      <Pressable onPress={onPress}>
        <View style={styles.button}>
          <TextUI style={styles.buttonText} isBold={true}>{children}</TextUI>
          <FontAwesome5 name="magic" size={24} color="#2b2d42" />
        </View>
      </Pressable>
    </View>
  );
}

export default Button;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    borderRadius: 25,
    padding: 12,
    width: 380,
    height: 60,
    backgroundColor: "#edf2f4",
    flexDirection: "row",
    justifyContent: "center",
    shadowColor: "#edf2f4",
    elevation: 12,
    overflow: "hidden",
  },
  buttonText: {
    color: "#2b2d42",
    textAlign: "center",
    fontSize: 25,
  },
  flatText: {
    color: "black",
  },
});
