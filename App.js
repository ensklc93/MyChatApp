import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import Start from "./components/Start"
import Chat from "./components/Chat"

const Stack = createNativeStackNavigator();

const App = () => {

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

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat">
          {props => <Chat db={db} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App