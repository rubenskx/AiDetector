# AiDetector

AiDetector is a simple mobile app created using React-Native that detects whether an image is AI generated or not.


# Working

AiDetector is a light-weight mobile application that works on both Android and iOS (created using Expo). It uses a pre-trained VGG-11 model that is deployed using Flask API.  

To use this application on your local machine, run Flask API using -
```bash
python test.py
```
For mobile app, run the following command and scan the QR code to view the app on your local device.
```bash
npx expo start
```
| Home Screen | Uploading Image | Result Screen |
| :-------- |  :--------------| :---------------|
| ![App Screenshot](https://github.com/rubenskx/AiDetector/blob/main/Screenshot_1722867972.png) | ![App Screenshot](https://github.com/rubenskx/AiDetector/blob/main/Screenshot_1722868198.png) | ![App Screenshot](https://github.com/rubenskx/AiDetector/blob/main/Screenshot_1722868313.png) |
