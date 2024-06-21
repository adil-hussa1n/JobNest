import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home/home';
import Login from '../screens/Auth/Login/login';
import Signup from '../screens/Auth/Signup/signup';
import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomBar from './BottomBar';
import JobPost from '../screens/JobPost/JobPost';
import Profile from '../screens/Profile/profile';
import ChatScreen from '../screens/Chat/ChatScreen.js';

const Stack = createNativeStackNavigator();

const MainNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
        
        <Stack.Screen name ="Home" component={Home}/>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="JobPost" component={JobPost} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
        
      </Stack.Navigator>
      <BottomBar></BottomBar>
    </NavigationContainer>
  );
};

export default MainNavigation;