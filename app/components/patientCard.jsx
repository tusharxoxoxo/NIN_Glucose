import React from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import {Card, Title, Paragraph, Avatar, IconButton} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Theme} from '../theme/theme';
import {useNavigation} from '@react-navigation/native';

const PatientCard = ({patient, onPress}) => {
  const navigation = useNavigation();

  const handlePress = () => {
    console.log('patientID', patient.id);
    navigation.navigate('patientDetail', {patientID: patient.id});
  };
  return (
    <Card style={styles.card} onPress={handlePress}>
      <Card.Content style={styles.content}>
        <Avatar.Text
          size={48}
          label={patient.name
            .split(' ')
            .map(n => n[0])
            .join('')}
          style={styles.avatar}
        />
        <View style={styles.infoContainer}>
          <Title style={styles.name}>{patient.name}</Title>
          <View style={styles.detailsContainer}>
            <View style={styles.detailItem}>
              <Icon name="calendar" size={18} color="#616161" />
              <Paragraph style={styles.detailText}>
                Age: {patient.age}
              </Paragraph>
            </View>
            <View style={styles.detailItem}>
              <Icon name="gender-male-female" size={18} color="#616161" />
              <Paragraph style={styles.detailText}>{patient.gender}</Paragraph>
            </View>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 8,
    marginVertical: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  avatar: {
    backgroundColor: '#3f51b5',
  },
  infoContainer: {
    flex: 1,
    marginLeft: 24,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#212121',
  },
  detailsContainer: {
    marginTop: 4,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  detailText: {
    marginLeft: 16,
    fontSize: 16,
    color: Theme.colors.onSurface,
  },
});

export default PatientCard;
