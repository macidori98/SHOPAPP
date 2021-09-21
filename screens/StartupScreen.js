import React, {useEffect} from 'react';
import {ActivityIndicator, AsyncStorage, StyleSheet, View} from 'react-native';
import {useDispatch} from 'react-redux';
import Colors from '../constants/Colors';
import * as authActions from '../store/actions/auth';

const StartupScreen = props => {
  const dispach = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem('userData');
      if (!userData) {
        props.navigation.replace('Authh');
        return;
      }
      const transformedData = JSON.parse(userData);

      const {token, userId, expiryDate} = transformedData;

      const expirationDate = new Date(expiryDate);

      if (expirationDate <= new Date() || !token || !userId) {
        props.navigation.replace('Authh');
        return;
      }

      const expirationTime = expirationDate.getTime() - new Date().getTime();

      props.navigation.replace('Shopp');
      dispach(authActions.authenticate(userId, token, expirationTime));
    };

    tryLogin();
  }, [dispach]);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default StartupScreen;
