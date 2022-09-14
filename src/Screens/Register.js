import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { Button, Input, Text } from '@rneui/base';
import { auth } from '../firebase';

const Register = () => {
    const [isName, setName] = useState('');
    const [isEmail, setEmail] = useState('');
    const [isPassword, setPassword] = useState('');
    const [isImage, setImage] = useState('');

    const register = () => {
        auth
            .createUserWithEmailAndPassword(isEmail, isPassword)
            .then((authUser) => {
                authUser.user.updateProfile({
                    displayName: isName,
                    photoURL: isImage || 'https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Image.png'
                })
            }).catch(error => alert(error.message))
    }

  return (
    <View style={styles.container}>
      <StatusBar style='light'/> 

      {/* h3 is possible to Text as Text component is from react native elements */}
      <Text h3 style={styles.title}> 
        Create a Signal account
      </Text>

    <View style={styles.input}>
      <Input
        placeholder='Full Name'
        autoFocus
        type='text'
        value={isName}
        onChangeText={value => setName(value)}
      />
      <Input
        placeholder='Email' 
        type='text'
        value={isEmail}
        onChangeText={value => setEmail(value)}
      />
      <Input
        placeholder='Password' 
        type='password'
        secureTextEntry
        value={isPassword}
        onChangeText={value => setPassword(value)}
      />
      <Input
        placeholder='Profile picture (optional)' 
        type='text'
        value={isImage}
        onChangeText={value => setImage(value)}
        onSubmitEditing={register}
      />
    </View>

    <Button containerStyle={styles.button} title={'Register'} onPress={register} raised/>
    </View>
  )
}

export default Register

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    input: {
        width: 300,
        marginTop: 30
    },

    button: {
        width: 150
    }

})