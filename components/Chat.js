import { StyleSheet, KeyboardAvoidingView, Platform, View } from "react-native"
import { useEffect, useState } from "react"
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import { onSnapshot, query, orderBy, collection, addDoc } from "firebase/firestore";


const Chat = ({ route, navigation, db }) => {
  const { name } = route.params
  const { backgroundColor } = route.params
  const { userID } = route.params;

  const [messages, setMessages] = useState([]);

  // Add the first item, which is the first message to the firestore database 'messages' collection
  const onSend = (newMessages) => {
    addDoc(collection(db, "messages"), newMessages[0])
  }


  useEffect(() => {
    navigation.setOptions({ title: name });

    // query the 'messages' collection in firestore database and order it by creation time as descending
    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
    
    const unsubMessages = onSnapshot(q, (docs) => {
      let newMessages = [];
      docs.forEach(doc => {
      // Add the new message that was sent by user to the newMessages array 
        newMessages.push({
          id: doc.id,
          ...doc.data(),
          createdAt: new Date(doc.data().createdAt.toMillis())
        })
      })
      setMessages(newMessages);
    })
    
    //clean up code
    return () => {
      if (unsubMessages) unsubMessages();
    }
   }, []);

   // Message Bubble customization with props according to GiftedChat
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
   
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <GiftedChat
        renderBubble={renderBubble}
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: userID,
          name: name
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
