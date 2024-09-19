import { StyleSheet, View, Text, TouchableOpacity, TextInput, ImageBackground, Alert } from "react-native"
import { getAuth, signInAnonymously } from "firebase/auth";
import { useState } from "react"

const backgroundColors = ['#090C08', '#474056', '#8A95A5', '#B9C6AE']

const Start = ({ navigation }) => {
  const [name, setName] = useState("")
  const [backgroundColor, setBackgroundColor] = useState('#ffffff')

  const auth = getAuth();

  // Creating function for anonymous sing in according to firestore doc
  const signInUser = () => {
    signInAnonymously(auth)
      .then(result => {
        // sending the props/parameters to the Chat component
        navigation.navigate("Chat", 
          { userID: result.user.uid, backgroundColor: backgroundColor, name: name });
        Alert.alert("Signed in Successfully!");
      })
      .catch((error) => {
        Alert.alert("Unable to sign in, try later again.");
      });
  }

  return (
    <ImageBackground
      source={require('../assets/Background-Image.png')}
      style={styles.container}
    >
      <Text style={styles.title}>Welcome to MyChat App!</Text>
      <View style={styles.box}>
        <TextInput
          style={styles.textInput}
          value={name}
          onChangeText={setName}
          placeholder="Your Name"
        />
        <Text style={{ fontSize: 16, fontWeight: 300, color: '#757083', opacity: 1, marginTop: 20 }}> Choose Background Color:</Text>
        <View style={styles.colorPaletteContainer}>
          {/* Map through backgroundColors array to implement TouchableOpacity component according to the given colors  */}
          {backgroundColors.map(color =>
            <TouchableOpacity
              accessible={true}
              accessibilityLabel='Change background color of chat'
              accessbilityHint='There are four color options to customize the look of the chat'
              key={color}
              style={[styles.colorPalette, { backgroundColor: color }, styles.colorBorder, backgroundColor == color && styles.clickedCircle]}
              onPress={() => setBackgroundColor(prevState =>
                prevState === color ? prevState = '#ffffff' : color
              )}
            />
          )}
        </View>
        <TouchableOpacity
          style={styles.touchable}
          title="Start Chatting"
          onPress={signInUser}
          accessible={true}
          accessibilityLabel='Enter the chat'
          accessibilityHint='Leaves the home screen for the Chat screen'
          accessibilityRole='Button'
        >
          <Text style={[styles.touchInnerText, styles.touchable]}>Start Chatting </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
  textInput: {
    width: 300,
    padding: 15,
    borderWidth: 1,
    marginBottom: 15,
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    textAlign: "left",
    opacity: 0.5
  },
  clickedCircle: {
    borderWidth: 3,
    borderColor: '#abdbe3'
  },
  title: {
    fontSize: 45,
    fontWeight: "600",
    color: "#FFFFFF",
    textAlign: "center",
    paddingHorizontal: 20

  },
  touchable: {
    width: 300,
    alignItems: "center",
    backgroundColor: "#757083",
    padding: 10,
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center"
  },
  box: {
    backgroundColor: '#ffffff',
    padding: 16
  },
  touchInnerText: {
    color: '#ffffff',
  },
  colorPalette: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginTop: 10,
    marginBottom: 40
  },
  colorPaletteContainer: {
    flexDirection: 'row',
    gap: 16,
  }
})

export default Start
