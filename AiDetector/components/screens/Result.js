import { StyleSheet, Text, View } from "react-native";
import BaseContainer from "../../ui/BaseContainer";
import ImageContainer from "../../ui/ImageContainer";
import TextUI from "../../ui/TextUI";
import Capitalize from "../util/Capitalize";
function Result({ route }) {
  const { prediction, percentage, image } = route.params;
  console.log(route);
  return (
    <BaseContainer>
      <ImageContainer image={image} initalText="Uploaded Image" />
      <View style={styles.viewStyle}>
        <TextUI style={styles.textStyle} isBold={true}>
          {Capitalize(prediction)} Image
        </TextUI>
        <TextUI style={styles.subTextStyle}>
          The image is predicted to be {prediction} with a probability of{" "}
          <TextUI isBold={true}>{percentage * 100}%</TextUI>.
        </TextUI>
      </View>
    </BaseContainer>
  );
}
export default Result;

const styles = StyleSheet.create({
  viewStyle: {
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
    marginHorizontal: 15,
    padding: 10,
  },
  textStyle: {
    color: "#edf2f4",
    fontSize: 35,
  },
  subTextStyle: {
    marginTop: 5,
    color: "#edf2f4",
    fontSize: 20,
  },
});
