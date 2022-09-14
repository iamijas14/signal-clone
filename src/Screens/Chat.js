import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, Modal, Alert } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import React, { useLayoutEffect, useState  } from 'react'
import { Avatar } from '@rneui/base'
import { AntDesign, Ionicons, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import { auth, db } from '../firebase'
import firebase from 'firebase/compat/app';

const Chat = ({ navigation, route }) => {

  const [isMessage, setMessage] = useState('');
  const [isDisplayMessage, setDisplayMessage] = useState([]);
  const [isDelete, setDelete] = useState(false)

  useLayoutEffect(() => {
    const lastMessaged = isDisplayMessage.slice(-1)
    
    navigation.setOptions({
      headerTitleAlign: 'left',

      headerTitle: () => (
        <View style={styles.headerTitle}>
          <Avatar 
            rounded 
            // source={{uri: isDisplayMessage?.[0]?.data.photoURL}}/>
            source={{uri: lastMessaged?.[0]?.data.photoURL || 'https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Image.png'}}/>
          <Text style={styles.chatName}>{route.params.chatName}</Text>
        </View>
      ),

      headerRight: () => (
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.arrow}>
          <AntDesign name="videocamera" size={23} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.arrow}>
          <Ionicons name="call-outline" size={23} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.arrow} onPress={() => setDelete(true)}>
          <Entypo name="dots-three-vertical"  size={23} color="#fff" />
          </TouchableOpacity>
        </View>
      )
    })
  }, [navigation, isDisplayMessage])

  useLayoutEffect(() => {
    const unsubscribe = db
      .collection('chats')
      .doc(route.params.id)
      .collection('message')
      .orderBy('timestamp', 'asc')
      .onSnapshot((snapshot) => setDisplayMessage(
        snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data()
        }))
      ));

      return unsubscribe;
  }, [route])

  const sendMessage = () => {
    db.collection('chats').doc(route.params.id).collection('message').add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: isMessage,
      displayName: auth.currentUser?.displayName,
      email: auth.currentUser?.email,
      photoURL: auth.currentUser?.photoURL
    })

    setMessage('')
  }

  const deleteChat = () => {
    db.collection('chats').doc(route.params.id).delete()
    setDelete(false);
    navigation.goBack();  
    Alert.alert('Success', 'Chat deleted')
  }

  // console.log(route.params.id)

  return (
      <View style={styles.container}>
        <StatusBar style='light' />
        
        <Modal 
          visible={isDelete}
          transparent
          onRequestClose={() => setDelete(false)}
        >
          <View style={styles.modalContainer}>
            <TouchableOpacity style={styles.modalBody} onPress={deleteChat}>
              <Text style={styles.modalText}>
                Delete Chat
              </Text>
            </TouchableOpacity > 
          </View>
        </Modal>

      <React.Fragment>
        <ScrollView contentContainerStyle={{paddingTop: 15}}>
          {isDisplayMessage.map(({id, data}) => 
            data.email === auth.currentUser.email ? (
              <View key={id} style={styles.reciever}>
                <Avatar 
                  rounded
                  position='absolute'
                  right={-5}
                  bottom={-13}
                  size={25}

                  //WEB
                  containerStyle={{
                    position:'absolute',
                    right:-5,
                    bottom:-13
                  }}

                  source={{
                  uri: data.photoURL
                }}/>
                <Text style={styles.recieverMessage}>{data.message}</Text>
              </View>
            ) : (
              <View key={id} style={styles.sender}>
                <Avatar 
                  rounded
                  position='absolute'
                  left={-5}
                  bottom={-15}
                  size={25}
                  //WEB
                  containerStyle={{
                    position:'absolute',
                    left:-5,
                    bottom:-13
                  }}
                  source={{
                  uri: data.photoURL
                }}
                />
                <Text style={styles.senderMessage}>{data.message}</Text>
                {/* <Text style={styles.senderName}>{data.displayName}</Text> */}
              </View>
            )
          )}
        </ScrollView>

        <View style={styles.footer}>
          <TextInput 
            style={styles.textInput}
            placeholder='Signal message'
            value={isMessage}
            onSubmitEditing={sendMessage}
            onChangeText={(value) => setMessage(value)}
          />

          <TouchableOpacity onPress={sendMessage}>
            <MaterialCommunityIcons name="send-circle" size={51} color="#2C6BED" />
          </TouchableOpacity>
        </View>

      </React.Fragment>
      </View>
  )
}

export default Chat

const styles = StyleSheet.create({
  //Header section
  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  chatName: {
    color: '#fff',
    fontSize: 20,
    marginLeft: 12
  },

  arrow: {
    marginRight: 12
  },

  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: 10
  },

  //Body
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },

  reciever: {
    padding: 15,
    backgroundColor: '#ECECEC',
    alignSelf: 'flex-end',
    borderRadius: 20,
    marginRight: 15,
    marginBottom: 20,
    maxWidth: '80%',
    position: 'relative'
  },

  sender: {
    padding: 15,
    backgroundColor: '#ECECEC',
    alignSelf: 'flex-start',
    borderRadius: 20,
    marginLeft: 15,
    marginBottom: 20,
    maxWidth: '80%',
    position: 'relative'
  },

  senderName: {
    fontSize: 10,
    paddingTop: 5
  },

  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 15
  },

  textInput: {
    bottom: 0,
    height: 44,
    flex: 1,
    marginRight: 13,
    backgroundColor: '#ECECEC',
    borderColor: 'transparent',
    borderRadius: 30,
    padding: 10,
    fontSize: 18
  },

  modalContainer: {
    flex: 1,
    position: 'relative'
  },

  modalBody: {
    position: 'absolute',
    right: 0,
    top: 60,
    marginRight: 30,
    padding: 10,
    borderRadius:10,
    backgroundColor: '#2C6BED'
  },

  modalText: {
    fontSize: 20,
    color: '#fff'
  }


})