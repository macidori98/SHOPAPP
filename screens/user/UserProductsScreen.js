import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Platform,
  Button,
  Alert,
} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {useDispatch, useSelector} from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import CustomHeaderButton from '../../components/UI/CustomHeaderButton';
import * as productsActions from '../../store/actions/products';

const UserProductsScreen = props => {
  const userProducts = useSelector(state => state.products.userProducts);

  const dispach = useDispatch();

  const editProductHandler = id => {
    props.navigation.navigate('EditProducts', {productId: id});
  };

  const deleteHandler = id => {
    Alert.alert('are you sure?', 'do you reallz want to delete?', [
      {
        text: 'no',
        style: 'default',
      },
      {
        text: 'yes',
        style: 'destructive',
        onPress: () => {
          dispach(productsActions.deleteProduct(id));
        },
      },
    ]);
  };

  return (
    <FlatList
      data={userProducts}
      renderItem={item => (
        <ProductItem
          onSelect={() => {
            editProductHandler(item.item.id);
          }}
          title={item.item.title}
          price={item.item.price}
          imageUrl={item.item.imageUrl}>
          <Button
            title="Edit"
            onPress={() => {
              editProductHandler(item.item.id);
            }}
          />
          <Button title="Delete" onPress={() => deleteHandler(item.item.id)} />
        </ProductItem>
      )}
    />
  );
};

UserProductsScreen.navigationOptions = navData => {
  return {
    headerTitle: 'User products',
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
          title="Add"
          iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
          onPress={() => {
            navData.navigation.navigate('EditProducts');
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({});

export default UserProductsScreen;
