import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Theme} from '../theme/theme';
import PatientList from '../components/patinetList';
import HeaderWithLogo from '../components/headerlogo';
import withObservables from '@nozbe/with-observables';
import {withDatabase, compose} from '@nozbe/watermelondb/react';

import {Q} from '@nozbe/watermelondb';

const HomeScreen = ({patients}) => {
  const [search, setSearch] = useState('');

  return (
    <View style={styles.container}>
      <HeaderWithLogo isShowInco={true} />
      <PatientList patient={patients} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
});

const enhance = compose(
  withDatabase,
  withObservables(['search'], ({database, search}) => ({
    patients: database.collections
      .get('patients')
      .query(
        search && search.length > 0
          ? Q.where('name', Q.like(`%${Q.sanitizeLikeString(search)}%`))
          : Q.where('name', Q.notLike('')),
      )
      .observe(),
  })),
);

export default enhance(HomeScreen);
