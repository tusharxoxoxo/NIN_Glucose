import React from 'react';
import {Alert, StyleSheet, View, Text} from 'react-native';
import {Avatar, Button, TextInput} from 'react-native-paper';
import {useState} from 'react';
import {saveString, loadString} from '../utils/storage';

const NurseProfile = ({name, hospital, imageUrl}) => {
  const [IP, setIP] = useState(loadString('IP'));
  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          saveString('token', '');
          Alert.alert('Logout', 'You have been logged out successfully');
        },
      },
    ]);
  };

  const handleSetIP = () => {
    saveString('IP', IP);
    Alert.alert('IP Address Set', 'IP Address has been set successfully');
    setIP('');
  };

  return (
    <View style={styles.container}>
      {/* Profile Information */}
      <View style={styles.profileContainer}>
        <Avatar.Image
          size={100}
          source={{uri: imageUrl}}
          style={styles.avatar}
        />
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.hospital}>Hospital: {hospital}</Text>
      </View>
      <TextInput
        mode="outlined"
        label="IP Address"
        value={IP}
        onChangeText={text => setIP(text)}
        style={{width: '100%', marginBottom: 16}}
      />
      <View style={styles.buttonContainer}>
        <Button mode="outlined" onPress={handleLogout}>
          Logout
        </Button>
        <Button mode="outlined" onPress={handleSetIP} style={[{marginLeft: 8}]}>
          SetIP
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#f5f5f5', // Optional: Set a background color
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    marginBottom: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  hospital: {
    fontSize: 16,
    color: '#666',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NurseProfile;
