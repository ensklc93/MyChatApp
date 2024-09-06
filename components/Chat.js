import { StyleSheet, View, Text } from "react-native"
import { useEffect } from "react"

const Chat = ({ route, navigation}) => {
  const { name } = route.params
  const {backgroundColor} = route.params

  useEffect(() => {
    navigation.setOptions({ title: name })
  }, [])

  return (
    <View style={[styles.container, {backgroundColor}]}>
      <Text style={{color: '#ffffff', fontSize: 16,fontWeight: 600}}>Let's start chatting {name}!</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
})

export default Chat
