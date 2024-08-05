import { StyleSheet, View, Pressable, Text, Image } from "react-native";
import TextUI from "./TextUI";

function ImageContainer({ initalText, onPress, image }) {
    console.log(image)
    let content = (
      <Pressable onPress={onPress}>
        <TextUI style={styles.textStyle}>{initalText}</TextUI>
      </Pressable>
    );
    if (image) {
      content = <Image source={{ uri: image }} style={styles.imageStyle} />;
    }
  return (
    <>
      <View style={styles.container}>{content}</View>
    </>
  );
}

export default ImageContainer;

const styles = StyleSheet.create({
  container: {
    height: 300,
    borderStyle: "dashed",
    borderWidth: 2,
    borderColor: "#fff",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 80,
    marginBottom: 40,
  },
  textStyle: {
    color: "#F1FAEE",
    textAlign: "center",
  },
  imageStyle: {
    flex: 1,
    width: "100%",
    borderRadius: 25,
  },
});
