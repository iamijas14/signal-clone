import React, { useEffect, useLayoutEffect, useState } from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import CustomListItem from '../Components/CustomListItem'
import { View, TouchableOpacity } from 'react-native'
import { Avatar } from '@rneui/base'
import { auth, db } from '../firebase'
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons'

const Home = ({ navigation }) => {

  const [isChat, setChat] = useState([])

  useEffect(() => {
    const unsubscribe = db.collection('chats').onSnapshot(snapshot => (
      setChat(snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })))
    ))

    return unsubscribe;
  }, [])

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Signal',
      headerStyle: {backgroundColor: '#fff'},
      headerTitleStyle: {color: '#000'},
      headerTintColor: '#000', 

      headerLeft: () => (
        <View style={{marginLeft: 20}} >
          <TouchableOpacity onPress={signOut}>
            <Avatar rounded source={{uri: auth?.currentUser?.photoURL }} />
          </TouchableOpacity>
        </View>
      ),

      headerRight: () => (
        <View style={styles.headerRgiht}>
          <TouchableOpacity>
            <SimpleLineIcons name='camera' size={23} color='#000'/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('AddChat')}>
            <AntDesign name='plus' size={23} color='#000'/>
          </TouchableOpacity>
        </View>
      )

    })
  }, [navigation])

  const signOut = () => {
    auth.signOut().then(() => {
      navigation.replace('Login');
    })
  }

  const enterChat = (id, chatName) => {
    navigation.navigate('Chat', {
      id,
      chatName
    })
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar style='dark' />
      {isChat.map(( {id, data: {chatName}} ) =>(
        <CustomListItem 
          id={id} 
          chatName={chatName} 
          enterChat={enterChat} />
      ))}
    </ScrollView>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    height: '100%'
  },

  headerRgiht: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 60,
    marginRight: 20
  }
})