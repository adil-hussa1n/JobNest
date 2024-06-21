import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, TextInput, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { signInStart, signInSuccess, signInFailure } from '../../../redux/user/userSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.user);

  const loginInfo = async () => {
    try {
      dispatch(signInStart());
      const formData = { email, password };
      const response = await axios.post("http://192.168.0.113:3000/api/auth/singin", formData);
      if (response.data.status !== 'success') {
        dispatch(signInFailure());
        return;
      }
      dispatch(signInSuccess(response.data.data.user));
      navigation.navigate('Home');
    } catch (error) {
      dispatch(signInFailure(error));
      console.error("Error fetching data: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back!</Text>
      <View style={styles.form}>
        <TextInput
          label="Email"
          value={email}
          style={styles.input}
          onChangeText={text => setEmail(text)}
          theme={{ colors: { primary: '#3f51b5', underlineColor: 'transparent' } }}
        />
        <TextInput
          label="Password"
          value={password}
          style={styles.input}
          onChangeText={text => setPassword(text)}
          secureTextEntry // Hide password
          theme={{ colors: { primary: '#3f51b5', underlineColor: 'transparent' } }}
        />
        <Button mode="contained" style={styles.button} onPress={loginInfo} loading={loading}>
          Login
        </Button>
        <Button mode="text" style={styles.button} onPress={() => navigation.navigate('Signup')}>
          New to JobNest? Sign up here
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  form: {
    width: '100%',
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#f2f2f2',
  },
  input: {
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  button: {
    marginTop: 10,
    borderRadius: 5,
  },
});

export default Login;
