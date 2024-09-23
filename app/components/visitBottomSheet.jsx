import {Dimensions} from 'react-native'; // Import Dimensions to calculate screen height
import {Headline} from 'react-native-paper';
import {ScrollView, StyleSheet, View} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import ClinicalDetails from './clinicalDetails';
import MyForm from './clinicForm';
import {useMemo} from 'react';

// Get the screen height dynamically
const {height: screenHeight} = Dimensions.get('window');

const VisitBottomSheet = ({
  sheetRef,
  snapPoints,
  sheetType,
  selectedVisit,
  onFormSubmit,
}) => {
  // Dynamic snap points based on screen height
  const dynamicSnapPoints = useMemo(
    () => [screenHeight * 0.5, screenHeight * 0.8, screenHeight], // Add full screen height as one of the snap points
    [screenHeight],
  );

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
        snapPoints={dynamicSnapPoints} // Use dynamic snap points
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
      index={0}
      snapPoints={dynamicSnapPoints} // Use dynamic snap points
      enablePanDownToClose={true}>
      <View style={styles.bottomSheetContent}>
        <Headline style={styles.sheetTitle}>
          {sheetType === 'view'
            ? 'Clinical Information'
            : 'Add Clinical Information'}
        </Headline>

        <View style={{flex: 1}}>
          <ScrollView
            contentContainerStyle={{flexGrow: 1}} // Ensure scrolling content grows within available space
            keyboardShouldPersistTaps="handled">
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
    flex: 1, // Make the content container take the full available height
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default VisitBottomSheet;
