import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Button, TextInput, useTheme} from 'react-native-paper';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {userLogin} from '../redux/features/authSlice';
import {RootState} from '../redux/store';
import {Theme} from '../theme/theme';

const LoginScreen: React.FC = () => {
  const theme = useTheme();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const dispatch = useAppDispatch();
  const {error, isloading} = useAppSelector((state: RootState) => state.auth);

  const handleLogin = () => {
    dispatch(userLogin({email, password}));
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        style={[styles.input, {backgroundColor: theme.colors.background}]}
        mode="outlined"
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        style={[styles.input, {backgroundColor: theme.colors.background}]}
        secureTextEntry
        mode="outlined"
      />
      {error && <Text style={styles.errorText}>{String(error)}</Text>}
      <Button
        mode="contained"
        onPress={handleLogin}
        style={[styles.button, {backgroundColor: theme.colors.primary}]}
        loading={isloading}
        disabled={isloading}>
        Login
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.colors.background,
  },
  input: {
    width: '80%',
    margin: 10,
  },
  button: {
    width: '80%',
    margin: 10,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default LoginScreen;
