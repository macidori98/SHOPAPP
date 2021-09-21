import React, {useCallback, useEffect, useReducer, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Platform,
  Alert,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {useDispatch, useSelector} from 'react-redux';
import CustomHeaderButton from '../../components/UI/CustomHeaderButton';
import Input from '../../components/UI/Input';
import Colors from '../../constants/Colors';
import Product from '../../models/Product';
import * as productsActions from '../../store/actions/products';

const REDUCER_UPDATE = 'UPDATE';

const formReducer = (state, action) => {
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

const EditProductScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const prodId = props.route.params.productId;

  /**
   * @type {Product}
   */
  const editedProduct = useSelector(state =>
    state.products.userProducts.find(prod => prod.id === prodId),
  );
  const dispach = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedProduct ? editedProduct.title : '',
      imageUrl: editedProduct ? editedProduct.imageUrl : '',
      price: editedProduct ? editedProduct.price : '',
      description: editedProduct ? editedProduct.description : '',
    },
    inputValidates: {
      title: editedProduct ? true : false,
      price: editedProduct ? true : false,
      description: editedProduct ? true : false,
      imageUrl: editedProduct ? true : false,
    },
    formIsValid: editedProduct ? true : false,
  });

  useEffect(() => {
    const submitFn = props.route.params.submit;
    props.navigation.setOptions({
      headerTitle: props.route.params.productId
        ? 'Edit Product'
        : 'Add Product',
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="save"
            iconName={
              Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'
            }
            onPress={submitFn}
          />
        </HeaderButtons>
      ),
    });
  });

  useEffect(() => {
    if (error) {
      Alert.alert('error', error, [{text: 'okay, i understand'}]);
    }
  }, [error]);

  const submitHandler = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    if (!formState.formIsValid) {
      Alert.alert('Invalid data', 'Please check errors', [
        {text: 'ok', style: 'default'},
      ]);
      return;
    }

    try {
      if (editedProduct) {
        await dispach(
          productsActions.updateProduct(
            prodId,
            formState.inputValues.title,
            formState.inputValues.description,
            formState.inputValues.imageUrl,
          ),
        );
      } else {
        await dispach(
          productsActions.createProduct(
            formState.inputValues.title,
            formState.inputValues.description,
            formState.inputValues.imageUrl,
            +formState.inputValues.price,
          ),
        );
      }
      props.navigation.goBack();
    } catch (err) {
      setError(err.message);
    }

    setIsLoading(false);
  }, [dispach, prodId, formState]);

  useEffect(() => {
    props.navigation.setParams({submit: submitHandler});
  }, [submitHandler]);

  /**
   *
   * @param {string} text
   */
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

  return (
    <KeyboardAvoidingView
      style={{flex: 1}} //fontos
      behavior="padding"
      keyboardVerticalOffset={100}>
      {isLoading && (
        <View>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      )}
      {!isLoading && (
        <ScrollView>
          <View style={styles.form}>
            <Input
              id={'title'}
              label="Title"
              errorText="Please enter a valid title"
              autoCapitalize="sentences"
              keyboardType="default"
              returnKeyType="next"
              onInputChange={inputChangeHandler}
              initialValue={editedProduct ? editedProduct.title : ''}
              isValid={!!editedProduct}
              required
            />
            <Input
              id={'imageUrl'}
              label="Image url"
              onInputChange={inputChangeHandler}
              errorText="Please enter a valid image url"
              autoCapitalize="sentences"
              keyboardType="default"
              returnKeyType="next"
              initialValue={editedProduct ? editedProduct.imageUrl : ''}
              isValid={!!editedProduct}
              required
            />
            {editedProduct ? null : (
              <Input
                id={'price'}
                label="Price"
                errorText="Please enter a valid Price"
                keyboardType="decimal-pad"
                required
                onInputChange={inputChangeHandler}
                min={0.1}
              />
            )}
            <Input
              id={'description'}
              label="description"
              errorText="Please enter a valid description"
              autoCapitalize="sentences"
              onInputChange={inputChangeHandler}
              keyboardType="default"
              returnKeyType="next"
              multiline
              numberOfLine={3}
              initialValue={editedProduct ? editedProduct.description : ''}
              isValid={!!editedProduct}
              required
              minLength={5}
            />
          </View>
        </ScrollView>
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
});

export default EditProductScreen;
