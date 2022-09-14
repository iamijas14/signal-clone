import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { Button, Input, Image } from '@rneui/base'; //react native elements
import { auth } from '../firebase';


const Login = ({ navigation }) => {

  const [isEmail, setEmail] = useState('');
  const [isPassword, setPassword] = useState('');
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
        console.log('log from login:',authUser)
        if(authUser) {
            navigation.replace('Home')
        }
    }); 

    return unsubscribe;
  }, [])

 

  const signIn = () => {
    auth.signInWithEmailAndPassword(isEmail, isPassword)
        .catch(error => alert(error))
  }

  return (
    <View style={styles.container}>
     <StatusBar style='light'/>   

     <Image
        source={require('../assets/singal-logo.png')} 
        style={styles.logo}
     />

     <View style={styles.input}>
        <Input 
            placeholder='Email' 
            autoFocus type='email' 
            onChangeText={value => setEmail(value)}
            value={isEmail}
        />
        <Input 
            placeholder='Password' 
            secureTextEntry type='password'
            onChangeText={value => setPassword(value)}
            value={isPassword}
            onSubmitEditing={signIn}
        />
     </View>

     <Button containerStyle={styles.button} title='Login' onPress={signIn} />
     <Button containerStyle={styles.button} title='Register' type='outline' onPress={() => navigation.navigate('Register')}/>

     <View style={{height: 10}}></View>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding:10 
    },

    logo: {
        width: 100,
        height: 100,
    },

    input: {
        width: 300,
        marginTop: 15,
    },

    button: {
        width: 200,
        marginTop: 10,
    }
})