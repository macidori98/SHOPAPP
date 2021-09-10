import React from 'react';
import {FlatList, Platform, Text} from 'react-native';
import {
  HeaderButton,
  HeaderButtons,
  Item,
} from 'react-navigation-header-buttons';
import {useDispatch, useSelector} from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import CustomHeaderButton from '../../components/UI/CustomHeaderButton';
import Titles from '../../constants/Titles';
import * as cartActions from '../../store/actions/cart';

const ProductsOverviewScreen = props => {
  /**
   * @type {import('../../Types/CustomTypes').Products}
   */
  const products = useSelector(
    /** @param {{products: import('../../Types/CustomTypes').ProductStateObject}} state*/
    state => state.products.availableProducts,
  );

  const dispach = useDispatch();

  return (
    <FlatList
      data={products}
      renderItem={itemData => (
        <ProductItem
          title={itemData.item.title}
          price={itemData.item.price}
          imageUrl={itemData.item.imageUrl}
          onAddToCart={() => {
            dispach(cartActions.addToCart(itemData.item));
          }}
          onViewDetail={() => {
            props.navigation.navigate('ProductDetail', {
              productId: itemData.item.id,
              productTitle: itemData.item.title,
            });
          }}
        />
      )}
    />
  );
};

ProductsOverviewScreen.navigationOptions = navData => {
  return {
    headerTitle: Titles.productsOverview,
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
