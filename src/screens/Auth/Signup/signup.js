import { ScrollView, StyleSheet, View,TouchableOpacity } from 'react-native';
import React, { useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Button, Text, TextInput } from 'react-native-paper';
import axios from 'axios';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import Feather from '@expo/vector-icons/Feather';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import { signInStart,signInSuccess,signInFailure } from '../../../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';

const Signup = () => {
  const [errormsg, setErrormsg] = useState(null);
  const usernameRef = useRef();
  const passwordRef = useRef();
  const emailRef = useRef();
  const navigation = useNavigation();


  const [name,setName]=useState('');
  const[nameverify,setNameverify]=useState(false);
  const [emails,setEmailes]=useState('');
  const[emailsverify,setEmailsverify]=useState(false);
  const [passwords,setPasswords]=useState('');
  const[passwordsverify,setPasswordsverify]=useState(false);
  const [showPassword,setShowPassword] = useState(false);

  const handleName=(e)=>{
    const namevar=e.nativeEvent.text;
    setName(namevar);
    setNameverify(false);

    if(namevar.length>2){
      setNameverify(true);
    }
  }

  const handelEmail =(e)=>{
    const emailVar = e.nativeEvent.text;
    setEmailes(emailVar);
    setEmailsverify(false);
    if(/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(emailVar)){
      setEmailes(emailVar);
      setEmailsverify(true);
    }
  }

  const handelPassword=(e)=>{
    const passVar = e.nativeEvent.text;
    setPasswords(passVar);
    setPasswordsverify(false);
    if(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(passVar)){
      setPasswords(passVar);
      setPasswordsverify(true)
    }
  }

  const Sendtobackend = async () => {
    try {
      

      const formData = { username:name, email:emails,password:passwords };

      const response = await axios.post("http://192.168.0.113:3000/api/auth/singup", formData);
      console.log(response.data);
      navigation.navigate('Home')
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };



  return (
    <ScrollView contentContainerStyle={{flexGrow:1}} keyboardShouldPersistTaps="always">
      
    <View style={styles.container}>
      <Text variant="displaySmall" style={{ margin: 8 }}> Hey, Welcome</Text>
      <Text style={styles.text_space} variant="labelLarge">Find your best job in Jobnest</Text>
      <Text variant="titleLarge" style={{ fontWeight: "bold", margin: 8 }}>SignUp</Text>
      {errormsg && <Text style={{ color: 'red', alignItems: "center" }}>*{errormsg}*</Text>}

      <View style={styles.subcontainer}>
        <View style={styles.inputContainer}>
        <TextInput
          label="User Name"
          name='username'
          style={styles.textInput}
          onChange={e=>handleName(e)}
          ref={usernameRef}
        />
         {name.length<1 ?null: nameverify?(<Feather name={'check-circle'} style={styles.f_icons_G}/>):(<Feather name={'check-circle'} style={styles.f_icons} />)}
  
        </View>
        {
          name.length<1 ?null: nameverify?null:(<Text style={{marginLeft:10,color:'red'}}>
            Name should be more then 2 characters
          </Text>)

        }

        <View style={styles.inputContainer}>

        <TextInput
          label="Email"
          name='email'
          style={styles.textInput}
          ref={emailRef}
          onChange={(e)=>handelEmail(e)}
        />
         {emails.length<1 ?null: emailsverify?(<Feather name={'check-circle'} style={styles.f_icons_G}/>):(<Feather name={'check-circle'} style={styles.f_icons} />)}

      </View>
      {
          emails.length<1 ?null: emailsverify?null:(<Text style={{marginLeft:10,color:'red'}}>
            Enter Proper Email Address
          </Text>)

        }

       <View style={styles.inputContainer}>
       <TextInput
          label="Password"
          name='password'
          secureTextEntry={showPassword}
          style={styles.textInput}
          onChange={(e)=>handelPassword(e)}
          ref={passwordRef}
        />
      
       <TouchableOpacity  style={styles.iconContainer} onPress={()=>setShowPassword(!showPassword)}>
       {
        passwords.length<1 ?null: !showPassword ?(
          <Feather name={'eye-off'} style={styles.pass_icons} />
        ):
        (<Feather name={'eye'} style={styles.pass_icons} />)
      }
        
      </TouchableOpacity>
              </View>
       {
          passwords.length<1 ?null: passwordsverify?null:(<Text style={{marginLeft:10,color:'red'}}>
           Uppercase,Lowercase,Number and 6 or more characters
          </Text>)

        }
        <Button style={{ marginTop: 5 }} icon="login" mode="contained" onPress={Sendtobackend}>
          SignUp
        </Button>

        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 5 }}>
          <Text style={{ marginRight: 0 }}>Already have an account, please</Text>
          <Button icon="" mode="text" style={{ padding: 0, margin: 0 }} onPress={() => navigation.navigate('Login')}>
            Login
          </Button>
        </View>
      </View>
    </View>
    </ScrollView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  subcontainer: {
    width: "80%"
  },
  f_icons: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{ translateY: -10 }],
    color: 'red',
    fontSize: 19, 
  },
  f_icons_G:{
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{ translateY: -10 }],
    color: 'green',
    fontSize: 19, 
  },
  inputContainer: {
    position: 'relative',
    margin: 10,
  },
  textInput: {
    paddingRight: 30, 
  },
  iconContainer: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{ translateY: -10 }],
    fontSize: 19, 
  },
  pass_icons: {
    color: 'green',
    fontSize: 20, 
  },


});
