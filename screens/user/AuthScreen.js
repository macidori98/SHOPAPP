import React, {useCallback, useEffect, useReducer, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Card from '../../components/UI/Card';
import Input from '../../components/UI/Input';
import Colors from '../../constants/Colors';
import LinearGradient from 'react-native-linear-gradient';
import * as authActions from '../../store/actions/auth';
import {useDispatch} from 'react-redux';

const REDUCER_UPDATE = 'UPDATE';

const formReducer = (state, action) => {
  console.log(action);
  if (action.type === REDUCER_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };

    const updatedValiditiies = {
      ...state.inputValidates,
      [action.input]: action.isValid,
    };

    let formIsValid = true;
    for (const key in updatedValiditiies) {
      formIsValid = formIsValid && updatedValiditiies[key];
    }

    return {
      formIsValid: formIsValid,
      inputValidates: updatedValiditiies,
      inputValues: updatedValues,
    };
  }

  return state;
};

const AuthScreen = props => {
  const dispatch = useDispatch();
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, seterror] = useState();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: '',
      password: '',
    },
    inputValidates: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });

  const authHandler = async () => {
    let action;
    if (isSignUp) {
      action = authActions.signup(
        formState.inputValues.email,
        formState.inputValues.password,
      );
    } else {
      action = authActions.login(
        formState.inputValues.email,
        formState.inputValues.password,
      );
    }
    setIsLoading(true);
    seterror(null);
    try {
      await dispatch(action);
      props.navigation.replace('Shopp');
    } catch (err) {
      seterror(err.message);
      setIsLoading(false);
    }
  };

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, isValid) => {
      dispatchFormState({
        type: REDUCER_UPDATE,
        value: inputValue,
        isValid: isValid,
        input: inputIdentifier,
      });
    },
    [dispatchFormState],
  );

  useEffect(() => {
    if (error) {
      Alert.alert('Error', error, [{text: 'ok'}]);
    }
  }, [error]);

  useEffect(() => {
    props.navigation.setOptions({
      headerTitle: 'Authenticate',
    });
  }, []);

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={50}
      style={styles.screen}>
      <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
        <Card style={styles.authContainer}>
          <ScrollView>
            <Input
              id="email"
              label="E-Mail"
              keyboardType="email-address"
              required
              email
              autoCapitalize="none"
              errorText="please enter a valid email address"
              onInputChange={inputChangeHandler}
              initialValue=""
            />

            <Input
              id="password"
              label="Password"
              keyboardType="default"
              secureTextEntry
              required
              minLength={5}
              errorText="please enter a valid password"
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <View style={styles.buttonContainer}>
              {isLoading ? (
                <ActivityIndicator size="large" />
              ) : (
                <Button
                  title={`${isSignUp ? 'sign up' : 'log in'}`}
                  color={Colors.primary}
                  onPress={authHandler}
                />
              )}
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title={`Swith to ${isSignUp ? 'sign up' : 'log in'}`}
                color={Colors.accent}
                onPress={() => {
                  setIsSignUp(prevState => !prevState);
                }}
              />
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  authContainer: {
    width: '80%',
    maxWidth: 400,
    maxHeight: 500,
    padding: 10,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: 10,
  },
});

export default AuthScreen;
