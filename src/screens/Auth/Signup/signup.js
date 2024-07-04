import { ScrollView, StyleSheet, View, TouchableOpacity } from 'react-native';
import React, { useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Button, Text, TextInput } from 'react-native-paper';
import axios from 'axios';
import Feather from '@expo/vector-icons/Feather';
import { useDispatch } from 'react-redux';
import { signUpStart, signUpSuccess, signUpFailure } from '../../../redux/user/userSlice';

const Signup = () => {
  const [errormsg, setErrormsg] = useState(null);
  const usernameRef = useRef();
  const passwordRef = useRef();
  const emailRef = useRef();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [nameverify, setNameverify] = useState(false);
  const [emails, setEmailes] = useState('');
  const [emailsverify, setEmailsverify] = useState(false);
  const [passwords, setPasswords] = useState('');
  const [passwordsverify, setPasswordsverify] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleName = (e) => {
    const namevar = e.nativeEvent.text;
    setName(namevar);
    setNameverify(namevar.length > 2);
  }

  const handleEmail = (e) => {
    const emailVar = e.nativeEvent.text;
    setEmailes(emailVar);
    setEmailsverify(/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(emailVar));
  }

  const handlePassword = (e) => {
    const passVar = e.nativeEvent.text;
    setPasswords(passVar);
    setPasswordsverify(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(passVar));
  }

  const sendToBackend = async () => {
    try {
      dispatch(signUpStart());
      const formData = { username: name, email: emails, password: passwords };
      const response = await axios.post("http://192.168.0.121:3000/api/auth/signup", formData);
      if (response.data.status !== 'success') {
        dispatch(signUpFailure());
        setErrormsg(response.data.message);
        return;
      }
      dispatch(signUpSuccess(response.data.data.user));
      navigation.navigate('Home');
    } catch (error) {
      dispatch(signUpFailure(error));
      console.error("Error fetching data: ", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="always">
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to JobNest!</Text>
        <View style={styles.form}>
          <TextInput
            label="Name"
            value={name}
            style={styles.input}
            onChange={handleName}
            ref={usernameRef}
            theme={{ colors: { primary: '#3f51b5', underlineColor: 'transparent' } }}
          />
          {name.length > 0 && !nameverify && <Text style={styles.errorText}>Name should be more than 2 characters</Text>}

          <TextInput
            label="Email"
            value={emails}
            style={styles.input}
            onChange={handleEmail}
            ref={emailRef}
            theme={{ colors: { primary: '#3f51b5', underlineColor: 'transparent' } }}
          />
          {emails.length > 0 && !emailsverify && <Text style={styles.errorText}>Enter a valid email address</Text>}

          <View style={styles.passwordInputContainer}>
            <TextInput
              label="Password"
              value={passwords}
              style={styles.passwordInput}
              onChange={handlePassword}
              secureTextEntry={!showPassword}
              ref={passwordRef}
              theme={{ colors: { primary: '#3f51b5', underlineColor: 'transparent' } }}
            />
            <TouchableOpacity style={styles.iconContainer} onPress={() => setShowPassword(!showPassword)}>
              <Feather name={showPassword ? 'eye' : 'eye-off'} style={styles.passIcons} />
            </TouchableOpacity>
          </View>
          {passwords.length > 0 && !passwordsverify && (
            <Text style={styles.errorText}>Password must contain uppercase, lowercase, number, and 6 or more characters</Text>
          )}

          <Button mode="contained" style={styles.button} onPress={sendToBackend}>
            Sign Up
          </Button>
          <Button mode="text" style={styles.button} onPress={() => navigation.navigate('Login')}>
            Already have an account? Login
          </Button>
          {errormsg && <Text style={styles.errorMsg}>*{errormsg}*</Text>}
        </View>
      </View>
    </ScrollView>
  );
};

export default Signup;

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
  iconContainer: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{ translateY: -10 }],
  },
  passIcons: {
    color: '#4B5563',
    fontSize: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
  errorMsg: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
  passwordInputContainer: {
    position: 'relative',
  },
  passwordInput: {
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
});
