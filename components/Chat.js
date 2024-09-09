import { StyleSheet, KeyboardAvoidingView, Platform, View } from "react-native"
import { useEffect, useState } from "react"
import { GiftedChat, Bubble } from "react-native-gifted-chat";


const Chat = ({ route, navigation }) => {
  const { name } = route.params
  const {backgroundColor} = route.params
  const [messages, setMessages] = useState([]);

  const onSend = (newMessages) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages))
  }

  const renderBubble = (props) => {
    return <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: "#3ec2e2"
        },
        left: {
          backgroundColor: "#d0cbcb"
        }
      }}
    />
  }
 

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
        _id: 2,
        text: 'This is a system message',
        createdAt: new Date(),
        system: true,
      },
    ]);
  }, []);


  useEffect(() => {
    navigation.setOptions({ title: name })
  }, []);

  return (
    <View style={[styles.container, {backgroundColor}]}>
      <GiftedChat
        renderBubble={renderBubble}
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1
        }}
      />
      {/* Added keyboard overlap fix for older Android versions */}
      {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  }
})

export default Chat
