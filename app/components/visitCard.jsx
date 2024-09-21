import React from 'react';
import {Card, Avatar, Button, useTheme} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import {formatDate} from '../utils/dateformater';
import {useNavigation} from '@react-navigation/native';

const VisitCard = ({item, openBottomSheet}) => {
  const {colors} = useTheme(); // Get colors from the current theme
  const navigation = useNavigation();

  const navigateToDataCollection = () => {
    navigation.navigate('datacollection', {visitId: item.id});
  };

  return (
    <Card
      style={[styles.card, {backgroundColor: colors.surface}]}
      elevation={4}>
      <Card.Title
        title={`Visit Date: ${formatDate(item.visitDate)}`}
        subtitle={`Visit ID: ${item.id}`}
        titleStyle={[styles.visitTitle, {color: colors.onSurface}]}
        left={props => (
          <Avatar.Icon
            {...props}
            icon="hospital-building"
            size={40}
            style={styles.avatar}
            color={colors.onSurface}
            backgroundColor={colors.primaryContainer}
          />
        )}
      />
      <Card.Content style={styles.cardContent}>
        <Button
          mode="outlined"
          icon="file-document-edit"
          onPress={() => openBottomSheet(item, 'collect')}
          style={[{borderColor: colors.primary}]}
          labelStyle={{color: colors.primary, fontSize: 12}}>
          Clinical
        </Button>
        <Button
          mode="outlined"
          icon="file-eye-outline" // Changed icon here
          onPress={() => openBottomSheet(item, 'view')}
          style={[{borderColor: colors.primary}]}
          labelStyle={{color: colors.primary, fontSize: 12}}>
          Clinical
        </Button>
        <Button
          mode="outlined"
          icon="file-download-outline"
          onPress={navigateToDataCollection}
          style={[{borderColor: colors.primary}]}
          labelStyle={{color: colors.primary, fontSize: 12}}>
          Sensor
        </Button>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
  },
  visitTitle: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  avatar: {
    marginRight: 12,
  },
  cardContent: {
    flexDirection: 'row', // Arrange the buttons in a row
    justifyContent: 'space-between', // Ensure buttons are spaced out evenly
    paddingHorizontal: 16,
    paddingBottom: 16, // Add padding for a cleaner look
  },
});

export default VisitCard;
