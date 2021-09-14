import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  Platform,
  Text,
  Button,
  View,
  ActivityIndicator,
} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {useDispatch, useSelector} from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import CustomHeaderButton from '../../components/UI/CustomHeaderButton';
import Colors from '../../constants/Colors';
import Titles from '../../constants/Titles';
import * as cartActions from '../../store/actions/cart';
import * as productsActions from '../../store/actions/products';

const ProductsOverviewScreen = props => {
  /**
   * @type {import('../../Types/CustomTypes').Products}
   */
  const products = useSelector(
    /** @param {{products: import('../../Types/CustomTypes').ProductStateObject}} state*/
    state => state.products.availableProducts,
  );

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [refreshing, setRefreshing] = useState(false);

  const dispach = useDispatch();

  const loadProducts = useCallback(async () => {
    setError(null);
    setRefreshing(true);
    try {
      await dispach(productsActions.fetchProducts());
    } catch (err) {
      setError(err.message);
    }

    setRefreshing(false);
  }, [dispach]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener('willFocus', () => {
      loadProducts();
    });

    return () => {
      //it runs whenever it will be recreated
      willFocusSub.remove();
    };
  }, [loadProducts]);

  useEffect(() => {
    setIsLoading(true);
    loadProducts().then(() => {
      setIsLoading(false);
    });
  }, [loadProducts]);

  const selectItemHandler = itemData => {
    props.navigation.navigate('ProductDetail', {
      productId: itemData.id,
      productTitle: itemData.title,
    });
  };

  return (
    <View style={{flex: 1}}>
      {isLoading && !error && (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      )}
      {!isLoading && products.length > 0 && !error && (
        <FlatList
          data={products}
          onRefresh={loadProducts}
          refreshing={refreshing}
          renderItem={itemData => (
            <ProductItem
              title={itemData.item.title}
              price={itemData.item.price}
              imageUrl={itemData.item.imageUrl}
              onSelect={() => {
                selectItemHandler(itemData.item);
              }}>
              <Button
                color={Colors.primary}
                title="View Details"
                onPress={() => {
                  selectItemHandler(itemData.item);
                }}
              />
              <Button
                color={Colors.primary}
                title="To Cart"
                onPress={() => {
                  dispach(cartActions.addToCart(itemData.item));
                }}
              />
            </ProductItem>
          )}
        />
      )}
      {!isLoading && products.length === 0 && !error && (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>No products found</Text>
        </View>
      )}
      {error && !isLoading && (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>{error}</Text>
          <Button title="try again" onPress={loadProducts} />
        </View>
      )}
    </View>
  );
};

ProductsOverviewScreen.navigationOptions = navData => {
  return {
    headerTitle: Titles.productsOverview,
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Cart"
          iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
          onPress={() => {
            navData.navigation.navigate('Cart');
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default ProductsOverviewScreen;
