import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home/home';
import Login from '../screens/Auth/Login/login';
import Signup from '../screens/Auth/Signup/signup';
import * as React from 'react';
import BottomBar from './BottomBar';
import JobPost from '../screens/JobPost/JobPost';
import Profile from '../screens/Profile/profile';
import ChatScreen from '../screens/Chat/ChatScreen.js';
import GetStarted from '../screens/GetStarted/GetStarted.js';

const Stack = createNativeStackNavigator();

const MainNavigation = () => {
  const [routeName, setRouteName] = React.useState('');

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="GetStarted"
        screenListeners={({ route }) => {
          setRouteName(route.name);
        }}
      >
        <Stack.Screen 
          name="GetStarted" 
          component={GetStarted} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Home" 
          component={Home} 
          options={{ headerBackVisible: false }} // Hide back button
        />
        <Stack.Screen 
          name="Login" 
          component={Login} 
          options={{ headerBackVisible: false }} // Hide back button
        />
        <Stack.Screen 
          name="Signup" 
          component={Signup} 
          options={{ headerBackVisible: false }} // Hide back button
        />
        <Stack.Screen 
          name="JobPost" 
          component={JobPost} 
          options={{ headerBackVisible: false }} // Hide back button
        />
        <Stack.Screen 
          name="Profile" 
          component={Profile} 
          options={{ headerBackVisible: false }} // Hide back button
        />
        <Stack.Screen 
          name="ChatScreen" 
          component={ChatScreen} 
          options={{ headerBackVisible: false }} // Hide back button
        />
      </Stack.Navigator>
      {routeName !== 'GetStarted' && <BottomBar />}
    </NavigationContainer>
  );
};

export default MainNavigation;
