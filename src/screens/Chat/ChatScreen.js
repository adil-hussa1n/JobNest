import { Button, StyleSheet, View,SafeAreaView,FlatList,TouchableOpacity, Linking  } from 'react-native'
import { NavigationContainer,useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Appbar,SegmentedButtons, Text } from 'react-native-paper';
import { Icon, MD3Colors } from 'react-native-paper';
import React, { useState, useCallback, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import {
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

const ChatScreen = () => {
  const [messages, setMessages] = useState([
    { id: '1', text: 'Hello ADIL!', type: 'text', sender: 'developer', avatar: 'https://scontent.fdac175-1.fna.fbcdn.net/v/t39.30808-6/441249794_2760896580741253_5961391779518990708_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_ohc=R2NOjVQp0AgQ7kNvgEJf3Wg&_nc_ht=scontent.fdac175-1.fna&oh=00_AYBvub0U1i4vsmZctcU-S8vrkUcfDgux7h4P7vVIokUtDA&oe=6670F26C' },
    { id: '2', text: 'How can I assist you today?', type: 'text', sender: 'developer', avatar: 'https://scontent.fdac175-1.fna.fbcdn.net/v/t39.30808-6/441249794_2760896580741253_5961391779518990708_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_ohc=R2NOjVQp0AgQ7kNvgEJf3Wg&_nc_ht=scontent.fdac175-1.fna&oh=00_AYBvub0U1i4vsmZctcU-S8vrkUcfDgux7h4P7vVIokUtDA&oe=6670F26C' },

  ]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { id: Date.now().toString(), text: input, type: 'text', sender: 'user', avatar: 'https://scontent.fdac175-1.fna.fbcdn.net/v/t39.30808-6/441249794_2760896580741253_5961391779518990708_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_ohc=R2NOjVQp0AgQ7kNvgEJf3Wg&_nc_ht=scontent.fdac175-1.fna&oh=00_AYBvub0U1i4vsmZctcU-S8vrkUcfDgux7h4P7vVIokUtDA&oe=6670F26C'  }]);
      setInput('');
    }
  };

  const sendImage = (uri) => {
    setMessages([...messages, { id: Date.now().toString(), uri, type: 'image', sender: 'user' }]);
  };

  const selectImage = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const source = response.assets[0].uri;
        sendImage(source);
      }
    });
  };

  const renderItem = ({ item }) => (
    <View style={[styles.messageContainer, item.sender === 'user' && styles.userMessage]}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      {item.type === 'text' ? (
        <Text style={styles.messageText}>{item.text}</Text>
      ) : (
        <Image source={{ uri: item.uri }} style={styles.messageImage} />
      )}
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Chat</Text>
      </View>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.messageList}
      />
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.imageButton} onPress={selectImage}>
          <Text style={styles.imageButtonText}>+</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Type a message..."
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 75,
    backgroundColor: '#f8f8f8',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 35,
  },
  headerTitle: {
    color: '#6200ee',
    fontSize: 20,
    fontWeight: 'bold',
  },
  messageList: {
    flex: 1,
    padding: 10,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f1f1f1',
    borderRadius: 5,
  },
  developerMessage: {
    backgroundColor: '#e1f7d5',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#b2ff59',},  
  messageText: {
    fontSize: 16,
  },
  
  messageImage: {
    width: 200,
    height: 200,
    borderRadius: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  sendButton: {
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6200ee',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  imageButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6200ee',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
  },
  imageButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  
});

export default ChatScreen;
