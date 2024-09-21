import React from 'react';
import {View, Image, StyleSheet, Pressable} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import {Theme} from '../theme/theme';

const HeaderWithLogo = ({isShowInco}) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../asset/ihub-logo.png')} // Adjust the path as per your project structure
        style={styles.logo}
        resizeMode="contain"
      />
      {isShowInco ? (
        <Pressable onPress={() => console.log('search icon')}>
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            color={Theme.colors.onPrimaryContainer}
            size={24}
          />
        </Pressable>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // Align items horizontally
    alignItems: 'center', // Vertically center the items
    justifyContent: 'space-between', // Distribute space between logo and search icon
    backgroundColor: 'rgb(255, 251, 255)',
    paddingLeft: 12,
    paddingRight: 12,
  },
  logo: {
    width: 140,
    height: 60,
  },
  searchIcon: {
    marginLeft: 'auto', // Push the search icon to the right
  },
});

export default HeaderWithLogo;
