import { StyleSheet, KeyboardAvoidingView, Platform, View } from "react-native"
import { useEffect, useState } from "react"
import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";
import { onSnapshot, query, orderBy, collection, addDoc } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';


const Chat = ({ route, navigation, db, isConnected }) => {
  const { name } = route.params
  const { backgroundColor } = route.params
  const { userID } = route.params;

  const [messages, setMessages] = useState([]);

  // Add the first item, which is the first message to the firestore database 'messages' collection
  const onSend = (newMessages) => {
    addDoc(collection(db, "messages"), newMessages[0])
  }

  let unsubMessages;

  useEffect(() => {
    navigation.setOptions({ title: name });
    if (isConnected === true) {

      if (unsubMessages) unsubMessages();
      unsubMessages = null;


      // query the 'messages' collection in firestore database and order it by creation time as descending
      const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));

      unsubMessages = onSnapshot(q, (docs) => {
        let newMessages = [];
        docs.forEach(doc => {
          // Add the new message that was sent by user to the newMessages array 
          newMessages.push({
            id: doc.id,
            ...doc.data(),
            createdAt: new Date(doc.data().createdAt.toMillis())
          })
        })
        cacheMessages(newMessages);
        setMessages(newMessages);
      })
    } else loadCachedMessages();

    //clean up code
    return () => {
      if (unsubMessages) unsubMessages();
    }

  }, [isConnected]);


  const cacheMessages = async (listsToCache) => {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(listsToCache));
    } catch (error) {
      console.log(error.message);
    }
  }

  const loadCachedMessages = async () => {
    const cachedLists = await AsyncStorage.getItem("messages") || [];
    setMessages(JSON.parse(cachedLists));
  }



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

  const renderInputToolbar = (props) => {
    if (isConnected) return <InputToolbar {...props} />;
    else return null;
   }

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <GiftedChat
        renderBubble={renderBubble}
        messages={messages}
        renderInputToolbar={renderInputToolbar}
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
