import React from 'react';
import {View, Text, StyleSheet, Image, Button, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';

const ProductDetailScreen = props => {
  /**
   * @type {string}
   */
  const productId = props.navigation.getParam('productId');

  const selectedProduct = useSelector(
    /** @param {{products: import('../../Types/CustomTypes').ProductStateObject}} state*/ state =>
      state.products.availableProducts.find(prod => prod.id === productId),
  );

  return (
    <View>
      <Text>{selectedProduct.title}</Text>
    </View>
  );
};

ProductDetailScreen.navigationOptions = navData => {
  return {
    headerTitle: navData.navigation.getParam('productTitle'),
  };
};

const styles = StyleSheet.create({});

export default ProductDetailScreen;
