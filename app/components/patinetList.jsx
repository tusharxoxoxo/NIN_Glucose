import React from 'react';
import {StyleSheet} from 'react-native';
import PatientCard from './patientCard'; // Adjust the import path as necessary
import {FlashList} from '@shopify/flash-list';

const PatientList = ({patient}) => {
  return (
    <FlashList
      data={patient}
      renderItem={({item}) => <PatientCard patient={item._raw} />}
      estimatedItemSize={200}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default PatientList;
