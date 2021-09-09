import React from 'react';
import {FlatList, Text} from 'react-native';
import {useSelector} from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import Titles from '../../constants/Titles';

const ProductsOverviewScreen = props => {
  /**
   * @type {import('../../Types/CustomTypes').Products}
   */
  const products = useSelector(
    /** @param {{products: import('../../Types/CustomTypes').ProductStateObject}} state*/
    state => state.products.availableProducts,
  );
  return (
    <FlatList
      data={products}
      renderItem={itemData => (
        <ProductItem
          title={itemData.item.title}
          price={itemData.item.price}
          imageUrl={itemData.item.imageUrl}
          onAddToCart={() => {}}
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

ProductsOverviewScreen.navigationOptions = {
  headerTitle: Titles.productsOverview,
};

export default ProductsOverviewScreen;
