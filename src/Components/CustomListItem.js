import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { ListItem,  Avatar } from '@rneui/base'
import { db } from '../firebase';

const CustomListItem = ({id, chatName, enterChat}) => {
  
  const [isChatMessage, setChatMessage] = useState([]);

  useEffect(() => {
    const unsubscribe = db
        .collection('chats')
        .doc(id)
        .collection('message')
        .orderBy('timestamp', 'desc')
        .onSnapshot((snapshot) => setChatMessage(snapshot.docs.map(doc => doc.data()))
        );
    
    return unsubscribe
  })
  return (
   <ListItem 
        onPress={() => enterChat(id, chatName)} 
        key={id} 
        bottomDivider
    >
    <Avatar
        rounded
        source={{
            uri: isChatMessage?.[0]?.photoURL || 'https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Image.png'
        }} 
    />
    <ListItem.Content>
        <ListItem.Title style={{ fontWeight: '800'}}>
            {chatName}
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode='tail'>
          {isChatMessage?.[0]?.message ?  ((isChatMessage?.[0]?.displayName) +': '+(isChatMessage?.[0]?.message)) : 'no message' }
        </ListItem.Subtitle>
    </ListItem.Content>
   </ListItem>
  )
}

export default CustomListItem

const styles = StyleSheet.create({})