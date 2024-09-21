import React from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import {View, ScrollView, StyleSheet} from 'react-native';
import {Headline} from 'react-native-paper';
import MyForm from './clinicForm'; // Import your form component
import ClinicalDetails from '../components/clinicalDetails';

const VisitBottomSheet = ({
  sheetRef,
  snapPoints,
  sheetType,
  selectedVisit,
  onFormSubmit,
}) => {
  const handleFormSubmit = ({selectedVisit, formValues}) => {
    console.log('Form submitted handle submit:', formValues);
    console.log('Selected Visit: handle submit', selectedVisit);
    if (selectedVisit) {
      selectedVisit.addClinical(formValues);
      selectedVisit.ClinicalDataCollected();
      sheetRef.current?.close(); // Close the BottomSheet
    }
  };

  if (!selectedVisit) {
    return (
      <BottomSheet
        ref={sheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}>
        <View style={styles.bottomSheetContent}>
          <Headline style={styles.sheetTitle}>No Visit Selected</Headline>
        </View>
      </BottomSheet>
    );
  }

  return (
    <BottomSheet
      ref={sheetRef}
      index={0} // Ensure the BottomSheet is open
      snapPoints={snapPoints}
      enablePanDownToClose={true}>
      <View style={styles.bottomSheetContent}>
        <Headline style={styles.sheetTitle}>
          {sheetType === 'view'
            ? 'Clinical Information'
            : 'Add Clinical Information'}
        </Headline>

        <View style={{flex: 1}}>
          <ScrollView keyboardShouldPersistTaps="handled">
            {sheetType === 'view' ? (
              <ClinicalDetails visitID={selectedVisit._raw.id} />
            ) : (
              <MyForm
                selectedVisit={selectedVisit}
                onFormSubmit={handleFormSubmit}
              />
            )}
          </ScrollView>
        </View>
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  bottomSheetContent: {
    padding: 16,
    backgroundColor: '#fff',
    flex: 1,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default VisitBottomSheet;
