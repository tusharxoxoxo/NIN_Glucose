import React, {useMemo} from 'react';
import {View, StyleSheet} from 'react-native';
import {Card, Avatar, useTheme, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {formatDate} from '../utils/dateformater';

const PatientDetailsCard = ({patient}) => {
  const {colors, fonts} = useTheme(); // Getting colors and fonts from the theme

  // Memoizing the component to avoid unnecessary renders
  const patientDetails = useMemo(() => {
    return (
      <Card
        style={[styles.card, {backgroundColor: colors.surface}]}
        elevation={4}>
        <Card.Title
          title={patient.name}
          titleStyle={[fonts.headlineSmall, {color: colors.onSurface}]}
          left={props => (
            <Avatar.Icon {...props} icon="account-circle" size={40} />
          )}
        />
        <Card.Content>
          {/* Date of Birth */}
          <View style={styles.detailRow}>
            <Icon
              name="calendar"
              size={20}
              color={colors.primary}
              style={styles.icon}
            />
            <Text style={[styles.label, {color: colors.primary}]}>
              Date of Birth:
            </Text>
            <Text style={[styles.value, {color: colors.onSurface}]}>
              {formatDate(patient.dateOfBirth)}
            </Text>
          </View>

          {/* Contact */}
          <View style={styles.detailRow}>
            <Icon
              name="email"
              size={20}
              color={colors.primary}
              style={styles.icon}
            />
            <Text style={[styles.label, {color: colors.primary}]}>
              Contact:
            </Text>
            <Text style={[styles.value, {color: colors.onSurface}]}>
              {patient.contactInformation}
            </Text>
          </View>

          {/* Gender */}
          <View style={styles.detailRow}>
            <Icon
              name="human-male"
              size={20}
              color={colors.primary}
              style={styles.icon}
            />
            <Text style={[styles.label, {color: colors.primary}]}>Gender:</Text>
            <Text style={[styles.value, {color: colors.onSurface}]}>
              {patient.gender}
            </Text>
          </View>

          {/* Weight */}
          <View style={styles.detailRow}>
            <Icon
              name="scale"
              size={20}
              color={colors.primary}
              style={styles.icon}
            />
            <Text style={[styles.label, {color: colors.primary}]}>Weight:</Text>
            <Text style={[styles.value, {color: colors.onSurface}]}>
              {patient.weight} kg
            </Text>
          </View>

          {/* Height */}
          <View style={styles.detailRow}>
            <Icon
              name="human-male-height"
              size={20}
              color={colors.primary}
              style={styles.icon}
            />
            <Text style={[styles.label, {color: colors.primary}]}>Height:</Text>
            <Text style={[styles.value, {color: colors.onSurface}]}>
              {patient.height} cm
            </Text>
          </View>
        </Card.Content>
      </Card>
    );
  }, [patient, colors, fonts]);

  return <View style={styles.container}>{patientDetails}</View>;
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
    marginHorizontal: 4,
  },
  card: {
    borderRadius: 12,
    elevation: 2,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  icon: {
    marginRight: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 6, // Space between label and value
  },
  value: {
    fontSize: 16,
  },
});

export default PatientDetailsCard;
