import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Icon, MD3Colors } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import Feather from '@expo/vector-icons/Feather';
import ChatScreen from '../screens/Chat/ChatScreen.js';


const BottomBar = () => {
  const [activeItem, setActiveItem] = useState('home');
  const { currentUser} = useSelector(state =>state.user);

  const navigation = useNavigation()
  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.bottom_bar, activeItem === 'home' && styles.active]}
        onPress={() => navigation.navigate('Home')}
      >
        <Icon source="home" color={MD3Colors.black} size={28} />
        <Text>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
         style={[styles.bottom_bar, activeItem === 'post' && styles.active]}
        onPress={() => navigation.navigate('JobPost')} 
      >
        
        <Icon source="post" color={MD3Colors.black} size={28} />
        <Text>Post</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.bottom_bar, activeItem === 'chat' && styles.active]}
        onPress={() => navigation.navigate('ChatScreen')}
      >
        <Icon source="chat" color={MD3Colors.black} size={28} />
        <Text>Chat</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.bottom_bar, activeItem === 'login' && styles.active]}
        onPress={() => navigation.navigate('Profile')}
      >
          {
            currentUser ?(
              < >
            <Feather name={'user'} style={styles.f_icons_G}/>
            <Text style={styles.profile_style}>Profile</Text>
            </>
          ): 
            (
              <TouchableOpacity style={[styles.bottom_bar, activeItem === 'login' && styles.active]}
              onPress={() => navigation.navigate('Login')}>
              <Icon source="login" color={MD3Colors.black} size={28} />
              <Text>Login</Text>
              </TouchableOpacity>
            )
          } 
      </TouchableOpacity>
    </View>
  );
};

export default BottomBar;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 20,
    marginRight: 20,
    padding: 20,
  },
  bottom_bar: {
    alignItems: 'center',
  },
  active: {
    color: 'blue',
  },
  f_icons_G:{
    position: 'absolute',
    right: 0,
    top: '50%',
    transform: [{ translateY: -25 }],
    color: 'black',
    fontSize: 25, 
  },
  profile_style:{
    marginTop:28,
    marginRight:-10
  }
});
