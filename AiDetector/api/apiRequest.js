import axios from "axios";
export const getPrediction = async (data) => {
  let resObj = {};
  try {
    const response = await axios.post(`http://10.0.2.2:5000/upload`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response.data);
    if (response.data.message === "Real image!") {
      resObj["prediction"] = "real";
    } else {
      resObj["prediction"] = "fake";
    }
    resObj["percentage"] = response.data.percentage;
  } catch (error) {
    resObj["error"] = error;
  }
  return resObj;
};
