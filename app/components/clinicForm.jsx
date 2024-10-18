import React, {useState} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {Dropdown} from 'react-native-paper-dropdown';
import {
  Button,
  TextInput,
  useTheme,
  RadioButton,
  Text,
} from 'react-native-paper';
import {Formik} from 'formik';

const OPTIONS_SMOKING = [
  {label: 'Cigarette', value: 'cigarette'},
  {label: 'Cigar', value: 'cigar'},
  {label: 'Pipe', value: 'pipe'},
];

const OPTIONS_ALCOHOL = [
  {label: 'Beer', value: 'beer'},
  {label: 'Wine', value: 'wine'},
  {label: 'Spirits', value: 'spirits'},
];

const MyForm = ({selectedVisit, onFormSubmit}) => {
  const theme = useTheme();
  const [antigenStatus, setAntigenStatus] = useState(
    selectedVisit?.antigenStatus || 'true',
  );

  const handleSubmitForm = formValues => {
    onFormSubmit({selectedVisit, formValues});
  };

  return (
    <ScrollView style={{backgroundColor: theme.colors.surface}}>
      <View style={styles.container}>
        <Formik
          initialValues={{
            bloodGroup: selectedVisit?.bloodGroup || '',
            systolic: selectedVisit?.systolic || '',
            diastolic: selectedVisit?.diastolic || '',
            temperature: selectedVisit?.temperature || '',
            smokingType: selectedVisit?.smokingType || '',
            overAllYearOfSmoking: selectedVisit?.overAllYearOfSmoking || '',
            dailyConsumption: selectedVisit?.dailyConsumption || '',
            smokingIndex: selectedVisit?.smokingIndex || '',
            alcoholFreeDays: selectedVisit?.alcoholFreeDays || '',
            alcoholType: selectedVisit?.alcoholType || '',
            alcoholConsumption: selectedVisit?.alcoholConsumption || '',
            homoglobin: selectedVisit?.homoglobin || '',
            reacentHealthIssue: selectedVisit?.reacentHealthIssue || '',
            hereditaryHistory: selectedVisit?.hereditaryHistory || '',
          }}
          onSubmit={handleSubmitForm}>
          {({handleChange, handleBlur, handleSubmit, values}) => (
            <>
              <TextInput
                label="Blood Group"
                onChangeText={handleChange('bloodGroup')}
                onBlur={handleBlur('bloodGroup')}
                value={values.bloodGroup}
                style={styles.input}
                mode="outlined"
                outlineColor={theme.colors.primary}
              />

              <Text style={{color: theme.colors.text}}>Antigen Status</Text>
              <RadioButton.Group
                onValueChange={setAntigenStatus}
                value={antigenStatus}>
                <View style={styles.radioRow}>
                  <RadioButton value="true" color={theme.colors.primary} />
                  <Text style={{color: theme.colors.text}}>Positive</Text>
                </View>
                <View style={styles.radioRow}>
                  <RadioButton value="false" color={theme.colors.primary} />
                  <Text style={{color: theme.colors.text}}>Negative</Text>
                </View>
              </RadioButton.Group>

              <TextInput
                label="Systolic"
                onChangeText={handleChange('systolic')}
                onBlur={handleBlur('systolic')}
                value={values.systolic}
                style={styles.input}
                mode="outlined"
                keyboardType="numeric"
                outlineColor={theme.colors.primary}
              />

              <TextInput
                label="Diastolic"
                onChangeText={handleChange('diastolic')}
                onBlur={handleBlur('diastolic')}
                value={values.diastolic}
                style={styles.input}
                mode="outlined"
                keyboardType="numeric"
                outlineColor={theme.colors.primary}
              />

              <TextInput
                label="Temperature"
                onChangeText={handleChange('temperature')}
                onBlur={handleBlur('temperature')}
                value={values.temperature}
                style={styles.input}
                mode="outlined"
                keyboardType="numeric"
                outlineColor={theme.colors.primary}
              />

              <Dropdown
                mode="outlined"
                label="Smoking Type"
                placeholder="Select Smoking Type"
                options={OPTIONS_SMOKING}
                value={values.smokingType}
                onSelect={handleChange('smokingType')}
                style={styles.input}
                outlineColor={theme.colors.primary}
              />

              <TextInput
                label="Overall Years of Smoking"
                onChangeText={handleChange('overAllYearOfSmoking')}
                onBlur={handleBlur('overAllYearOfSmoking')}
                value={values.overAllYearOfSmoking}
                style={styles.input}
                mode="outlined"
                keyboardType="numeric"
                outlineColor={theme.colors.primary}
              />

              <TextInput
                label="Daily Consumption"
                onChangeText={handleChange('dailyConsumption')}
                onBlur={handleBlur('dailyConsumption')}
                value={values.dailyConsumption}
                style={styles.input}
                mode="outlined"
                keyboardType="numeric"
                outlineColor={theme.colors.primary}
              />

              <TextInput
                label="Smoking Index"
                onChangeText={handleChange('smokingIndex')}
                onBlur={handleBlur('smokingIndex')}
                value={values.smokingIndex}
                style={styles.input}
                mode="outlined"
                keyboardType="numeric"
                outlineColor={theme.colors.primary}
              />

              <TextInput
                label="Alcohol Free Days"
                onChangeText={handleChange('alcoholFreeDays')}
                onBlur={handleBlur('alcoholFreeDays')}
                value={values.alcoholFreeDays}
                style={styles.input}
                mode="outlined"
                keyboardType="numeric"
                outlineColor={theme.colors.primary}
              />

              <Dropdown
                mode="outlined"
                label="Alcohol Type"
                placeholder="Select Alcohol Type"
                options={OPTIONS_ALCOHOL}
                value={values.alcoholType}
                onSelect={handleChange('alcoholType')}
                style={styles.input}
                outlineColor={theme.colors.primary}
              />

              <TextInput
                label="Alcohol Consumption"
                onChangeText={handleChange('alcoholConsumption')}
                onBlur={handleBlur('alcoholConsumption')}
                value={values.alcoholConsumption}
                style={styles.input}
                mode="outlined"
                keyboardType="numeric"
                outlineColor={theme.colors.primary}
              />

              <TextInput
                label="Hemoglobin"
                onChangeText={handleChange('homoglobin')}
                onBlur={handleBlur('homoglobin')}
                value={values.homoglobin}
                style={styles.input}
                mode="outlined"
                keyboardType="numeric"
                outlineColor={theme.colors.primary}
              />

              <TextInput
                label="Recent Health Issues"
                onChangeText={handleChange('reacentHealthIssue')}
                onBlur={handleBlur('reacentHealthIssue')}
                value={values.reacentHealthIssue}
                style={styles.input}
                mode="outlined"
                outlineColor={theme.colors.primary}
              />

              <TextInput
                label="Hereditary History"
                onChangeText={handleChange('hereditaryHistory')}
                onBlur={handleBlur('hereditaryHistory')}
                value={values.hereditaryHistory}
                style={styles.input}
                mode="outlined"
                outlineColor={theme.colors.primary}
              />

              <Button
                mode="contained"
                onPress={handleSubmit}
                style={[
                  styles.submitButton,
                  {backgroundColor: theme.colors.primary},
                ]}>
                Submit Clinical Data
              </Button>
            </>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    marginBottom: 10,
  },
  submitButton: {
    marginTop: 20,
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
});

export default MyForm;
