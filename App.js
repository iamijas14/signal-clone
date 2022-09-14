import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/Screens/Login';
import Register from './src/Screens/Register';
import Home from './src/Screens/Home';
import AddChat from './src/Screens/AddChat';
import Chat from './src/Screens/Chat';

export default function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName='Login'
        screenOptions={{
          headerStyle: {backgroundColor: '#2C6BED'},
          headerTitleStyle: {color: '#ffffffff'},
          headerTintColor: '#ffffffff',
          headerTitleAlign: 'center',
      }}>
        <Stack.Screen name='Login' component={Login}/>
        <Stack.Screen name='Register' component={Register}/>
        <Stack.Screen name='Home' component={Home}/>
        <Stack.Screen name='AddChat' component={AddChat}/>
        <Stack.Screen name='Chat' component={Chat} options={{}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


