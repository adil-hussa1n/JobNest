import * as React from 'react';
import { Avatar, Text, TextInput } from 'react-native-paper';
import { StyleSheet, View } from 'react-native'
import { useSelector } from 'react-redux';

const Profile = () => {
  const { currentUser} = useSelector(state =>state.user);
    return(
        <>
        <View style={styles.contener}>
        <Avatar.Image size={150} style={styles.avater} source={require('../../../assets/imgprofile.png')} />
        </View>

        <View style={styles.subcontener}>
            <TextInput mode="outlined"
                     label="Name"
                     defaultValue={currentUser.username}
                     style={styles.input_margin}
                     >
            </TextInput>
            <TextInput mode="outlined"
                    //  label="Email"
                    defaultValue={currentUser.email}
                     style={styles.input_margin}
                     >
            </TextInput>
            <TextInput mode="outlined"
                     label="PassWord"
                    defaultValue={currentUser.id}
                     >
            </TextInput>
        </View>

        </>
    );
};
export default Profile
const styles = StyleSheet.create({
    contener:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        marginTop: 70
    },
    subcontener:{
      width: "80%" ,
      marginHorizontal:'auto'
    },
    input_margin:{
      marginBottom:20
    }
  });
  