import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  ScrollView,
  Dimensions,
} from 'react-native';
import {useSelector} from 'react-redux';
import Colors from '../../constants/Colors';

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
    <ScrollView>
      <Image style={styles.image} source={{uri: selectedProduct.imageUrl}} />
      <View style={styles.actions}>
        <Button color={Colors.primary} title="Add to cart" onPress={() => {}} />
      </View>
      <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
      <Text style={styles.description}>{selectedProduct.description}</Text>
    </ScrollView>
  );
};

ProductDetailScreen.navigationOptions = navData => {
  return {
    headerTitle: navData.navigation.getParam('productTitle'),
  };
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: Dimensions.get('screen').height * 0.33,
  },
  price: {
    fontSize: 20,
    color: Colors.greyish,
    textAlign: 'center',
    marginVertical: 20,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 20,
  },
  actions: {
    marginVertical: 20,
    alignItems: 'center',
  },
});

export default ProductDetailScreen;
