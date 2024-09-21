import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createMaterialBottomTabNavigator} from 'react-native-paper/react-navigation';
import HomeScreen from '../screens/homeScreen';
import LoginScreen from '../screens/loginScreen';
import ProfileScreen from '../screens/profileScreen';
import NewPatientScreen from '../screens/newPatientScreen';
import PatientDetailScreen from '../screens/patientDetailScreen';
import DataCollectionScreen from '../screens/dataCollectionScreen';
import {useAppSelector, useAppDispatch} from '../redux/hooks';
import {load} from '../utils/storage';
import {login} from '../redux/features/authSlice';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faHouse,
  faUserPlus,
  faUserDoctor,
} from '@fortawesome/free-solid-svg-icons';

const Tab = createMaterialBottomTabNavigator();
const MainStack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();

const HomeTab = () => (
  <Tab.Navigator
    activeColor="rgb(120, 69, 172)"
    barStyle={{backgroundColor: 'rgb(255, 251, 255)'}}>
    <Tab.Screen
      name="home"
      component={HomeScreen}
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({color}) => (
          <FontAwesomeIcon icon={faHouse} color={color} size={24} />
        ),
      }}
    />
    <Tab.Screen
      name="addpatient"
      component={NewPatientScreen}
      options={{
        tabBarLabel: 'AddPatient',
        tabBarIcon: ({color}) => (
          <FontAwesomeIcon icon={faUserPlus} color={color} size={24} />
        ),
      }}
    />
    <Tab.Screen
      name="profile"
      component={ProfileScreen}
      options={{
        tabBarLabel: 'Profile',
        tabBarIcon: ({color}) => (
          <FontAwesomeIcon icon={faUserDoctor} color={color} size={24} />
        ),
      }}
    />
  </Tab.Navigator>
);

const MainNavigator = () => (
  <MainStack.Navigator initialRouteName="hometabs">
    <MainStack.Screen
      name="hometabs"
      component={HomeTab}
      options={{headerShown: false}}
    />
    <MainStack.Screen
      name="datacollection"
      component={DataCollectionScreen}
      options={{headerShown: true}}
    />
    <MainStack.Screen
      name="patientDetail"
      component={PatientDetailScreen}
      options={{headerShown: true}}
    />
  </MainStack.Navigator>
);

const AuthNavigator = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen
      name="Login"
      component={LoginScreen}
      options={{headerShown: false}}
    />
  </AuthStack.Navigator>
);

const AppNavigator = () => {
  const [refresh, setRefresh] = useState(false);
  const dispatch = useAppDispatch();
  const islogin = useAppSelector(state => state.auth.islogin);

  const refreshToken = async () => {
    const authData = await load('auth');
    return authData;
  };

  useEffect(() => {
    const checkToken = async () => {
      const res = await refreshToken();
      if (res) {
        dispatch(login(res));
      }
      setTimeout(() => setRefresh(true), 1000);
    };

    checkToken();
  }, []);

  if (!refresh) {
    return (
      <View style={styles.container}>
        <Text>Refreshing Token</Text>
        <Text>Replace with Splash Screen</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <MainNavigator />
      {/* {islogin ? <MainNavigator /> : <AuthNavigator />} */}
    </NavigationContainer>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
