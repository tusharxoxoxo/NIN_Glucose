import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import NurseProfile from '../components/nurseProfile'; // Import NurseProfile component
import HeaderWithLogo from '../components/headerlogo'; // Import HeaderWithLogo component

interface ProfileScreenProps {}

const ProfileScreen: React.FC<ProfileScreenProps> = () => {
  // Dummy data for nurse profile
  const nurseData = {
    name: 'Nurse Jane Doe',
    hospital: 'General Hospital',
    imageUrl: 'https://randomuser.me/api/portraits/women/44.jpg', // Replace with a valid image URL
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderWithLogo isShowInco={false} />
      <NurseProfile
        name={nurseData.name}
        hospital={nurseData.hospital}
        imageUrl={nurseData.imageUrl}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', // Light background color
  },
});

export default ProfileScreen;
