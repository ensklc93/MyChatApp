import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useNetInfo } from '@react-native-community/netinfo';
import { initializeApp } from "firebase/app";
import { getFirestore, disableNetwork, enableNetwork} from "firebase/firestore";
import { useEffect } from "react";
import { Alert } from 'react-native';

import Start from "./components/Start"
import Chat from "./components/Chat"




const App = () => {
  const Stack = createNativeStackNavigator();
  const connectionStatus = useNetInfo();

  const firebaseConfig = {
    apiKey: "AIzaSyAo2BHghED3p_qZwXDpnIq6KAfpIFRqTbs",
    authDomain: "mychat-app-91381.firebaseapp.com",
    projectId: "mychat-app-91381",
    storageBucket: "mychat-app-91381.appspot.com",
    messagingSenderId: "293446472915",
    appId: "1:293446472915:web:ba015f2766a20e82aa7026"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection Lost!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat">
          {props => <Chat db={db} isConnected={connectionStatus.isConnected} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App