import { StyleSheet, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { Button, Input } from '@rneui/themed'
import { Ionicons } from '@expo/vector-icons';
import { db } from '../firebase';

const AddChat = ({ navigation }) => {
  
  const [isChat, setChat] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
        title: 'Add new chat',
    })
  },[navigation])

  const createChat = async () => {
    await db
        .collection('chats')
        .add({
            chatName: isChat
        })
        .then(() => {
            navigation.goBack();
        })
        .catch(error => alert(error));
  }

  return (
    <View style={styles.container}>
      <StatusBar style='light' />
      <Input 
        placeholder='Enter a chat name'
        value={isChat}
        onChangeText={value => setChat(value)}
        leftIcon={
            <Ionicons name="chatbubbles-sharp" size={24} color="#2C6BED" />
        }
      />
        <View style={styles.btn}>
            <Button 
                title='Create new Chat' 
                color='#2C6BED' 
                onPress={createChat}
                />
        </View>
    </View>
  )
}

export default AddChat

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
        height: '100%'

    },
    
    btn: {
        width: 200
    }
})