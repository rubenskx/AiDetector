import { ActivityIndicator, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import Button from "../../ui/Button";
import { getPrediction } from "../../api/apiRequest";
import { useNavigation } from "@react-navigation/native";
import mime from "mime";
import ImageContainer from "../../ui/ImageContainer";

function UploadImage() {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  async function imageGalleryHandler() {
    try{
    let result = await ImagePicker.launchImageLibraryAsync({
      quality: 0.1,
    });
    setImage(result.assets[0].uri);
  }catch(error){
    setImage(null);
  }
  }

  async function predictionHandler() {
    setLoading(true);
    let formData = new FormData();
    formData.append("file", {
      uri: image,
      type: mime.getType(image),
      name: image.split("/").pop(),
    });
    const response = await getPrediction(formData);
    if (response.error) {
      Alert.alert(
        "Network Error",
        "There is an issue with your network. Please check your network and try again!"
      );
    } else {
      navigation.navigate("result", {
        ...response,
        image: image,
      });
    }
    setLoading(false);
    setImage(null);
  }
  return (
    <>
      <ImageContainer
        image={image}
        onPress={imageGalleryHandler}
        initalText="Please upload an image to get started!"
      />
      {image && !loading && (
        <Button onPress={predictionHandler}> Predict </Button>
      )}
      {loading && <ActivityIndicator size="large" color="#E63946" />}
    </>
  );
}

export default UploadImage;
