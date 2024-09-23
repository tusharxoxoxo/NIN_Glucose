import React, {useState, useRef, useMemo} from 'react';
import {View, StyleSheet} from 'react-native';
import {Divider, Provider as PaperProvider} from 'react-native-paper';
import PatientDetailsCard from '../components/patientDetailsCard';
import {Theme} from '../theme/theme'; // Import your custom theme
import withObservables from '@nozbe/with-observables';
import {Q} from '@nozbe/watermelondb';
import {database} from '../DB/database';
import VisitList from '../components/visitList';

// Main PatientDetailsScreen
const PatientDetailsScreen = ({patient, visits}) => {
  console.log('visits:', visits);
  return (
    <PaperProvider theme={Theme}>
      <View style={styles.container}>
        <PatientDetailsCard patient={patient[0]._raw} />
        <Divider style={styles.divider} bold={true} />
        <VisitList patientID={patient[0]._raw.id} />
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    backgroundColor: '#F5F5F5',
  },
  divider: {
    marginVertical: 8,
  },
});

const enhance = withObservables(['route'], ({route}) => ({
  patient: database.collections
    .get('patients')
    .query(Q.where('id', route.params.patientID))
    .observe(),
  // comorbidity: database.collections
  //   .get('comorbidities')
  //   .query(Q.where('patient_id', route.params.patientID))
  //   .observe(),
  // medicalrecord: database.collections
  //   .get('medicalHistories')
  //   .query(Q.where('patient_id', route.params.patientID))
  //   .observe(),
}));

export default enhance(PatientDetailsScreen);
