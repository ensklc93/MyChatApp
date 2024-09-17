# The MyChatApp
MyChatApp is a real-time messaging platform developed with **React Native**, **Firebase**, and **Expo**. It enables users to exchange messages, share images, and send their live location. The app also features displaying offline messages.

## Features

- **Real-time Messaging**: Users can send and receive messages instantly.
- **Image Sharing**: Users can share images from their device's library or take new photos.
- **Location Sharing**: Users can share their current location.
- **Offline Support**: Messages are cached locally, and users can continue to access them while offline.
- **Anonymous Login**: Users can sign in anonymously and start chatting without creating an account.

## Prerequisites

Before setting up the app, make sure you have the following prerequisites installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Android Studio](https://developer.android.com/studio)
- [Xcode](https://developer.apple.com/xcode/) (For iOS development - macOS only)
- [Firebase](https://console.firebase.google.com) project set up with Firestore and Firebase Storage

## Development Environment
### 1. Expo
This app is developed with **Expo**, a framework and platform for universal React applications. Ensure that Expo CLI is installed globally by running:
```bash
npm install -g expo-cli
```
### 2. Android Studio
To run the app on an Android emulator:

- Install [Android Studio](https://developer.android.com/studio).
- Setup the Android Virtual Device (AVD) by following the [official guide](https://developer.android.com/studio).

### 3. Xcode (For iOS)

To run the app on an iOS simulator:

- Install [Xcode](https://developer.apple.com/xcode/) (macOS only).
- Open Xcode and ensure the Command Line Tools are installed. This can be done through the **Preferences > Locations** section in Xcode.
- Launch the iOS Simulator via **Xcode > Open Developer Tool > Simulator**.
- Alternatively, let Expo open the iOS simulator automatically when running the project.

### 4. Firebase
Make sure your Firebase project is correctly configured by:

- Enabling **Firestore Database** in the Firebase console.
- Setting up **Firebase Storage** for file handling.


## Project Setup

Follow these steps to set up the development environment and get the app running locally:

### 1. Clone the repository

```
git clone https://github.com/ensklc93/MyChatApp.git
cd your-repo
```

### 2. Install dependencies
Run the following command to install the required dependencies:
```
npm install
```
This will install all necessary packages, including:

- react-native-gifted-chat
- @react-navigation/native
- @react-navigation/native-stack
- @react-native-community/netinfo
- firebase
- expo-image-picker
- expo-location
- react-native-maps
- @react-native-async-storage/async-storage
  
### 3. Setup Firebase
1. Create a new project in [Firebase Console](https://console.firebase.google.com).
2. Enable **Firestore** and **Firebase Storage** for your project.
3. Copy the Firebase configuration from your project and replace the values in the ```firebaseConfig``` object inside ```App.js```.

Your ```firebaseConfig``` will look something like this:

```js
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### 4.1. Run the App on an Android Emulator
To run the app on Android, follow these steps:
- Ensure that Android Studio is installed and an Android emulator is set up.
- Start the Android emulator.
- Run the app using the following command:
```bash
npx expo start --android
```
This will open the app on the Android emulator.

### 4.2. Run the App on an iOS Simulator (macOS Only)
To run the app on an iOS simulator, follow these steps:
- Ensure Xcode is installed, and the Command Line Tools are set up.
- Open the iOS simulator from Xcode, or let Expo open it for you.
- Run the app using the following command:
```bash
expo start --ios
```
This will open the app on the iOS simulator.

### 4.3. Run the App on a Physical Device
To run the app on a physical device, install the Expo Go app:
- Android: Expo Go on [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent&pcampaignid=web_share)
- iOS: Expo Go on the [App Store](https://apps.apple.com/us/app/expo-go/id982107779)
Once installed, scan the QR code displayed after running:
```bash
npx expo start
```
You can then open the app directly on your device through Expo Go.

## App Structure
- **App.js**: Main entry point of the app, sets up Firebase, network monitoring, and navigation between the **Start** and **Chat** screens.
- **components/Start.js**: Handles user input (name and background color) and anonymous sign-in with Firebase. Navigates to the **Chat** screen.
- **components/Chat.js**: Main chat interface using ```GiftedChat``` for messaging, supporting real-time message syncing with Firestore, offline message storage, and additional features like location and image sharing.
- **components/CustomActions.js**: Implements custom actions (image picker, camera, location sharing) for chat input.
```mathematica
.
├── assets/
│   └── Background-Image.png
├── components/
│   ├── Start.js
│   ├── Chat.js
│   └── CustomActions.js
├── App.js
├── README.md
└── package.json
```


## Key Functionality
1. **Anonymous Sign-In**: Users sign in anonymously using Firebase Authentication via the ```signInAnonymously``` function.
2. **Firestore Messaging**: Messages are saved in Firebase Firestore, ordered by creation time, and retrieved in real-time.
3. **Offline Support**: Messages are cached locally using AsyncStorage when offline and loaded when internet is unavailable.
4. **Image & Location Sharing**: Users can share images (from the gallery or camera) and their current location via custom actions in the chat interface.

