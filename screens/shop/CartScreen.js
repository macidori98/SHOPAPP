import React from 'react';
import {View, Text, StyleSheet, FlatList, Button} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Colors from '../../constants/Colors';
import cart from '../../store/reducers/cart';
import CartItem from '../../components/shop/CartItem';
import * as cartActions from '../../store/actions/cart';
import * as orderActions from '../../store/actions/orders';
import Card from '../../components/UI/Card';

const CartScreen = props => {
  const cartTotalAmount = useSelector(
    /** @param {{cart: import('../../Types/CustomTypes').CartStateObject}} state*/ state =>
      state.cart.totalAmount,
  );

  /**
   * @typedef {{productId: string, productTitle: string, productPrice: number, sum: number, quantity: number}} CartItem
   */

  /**
   * @type {CartItem[]}
   */
  const cartItems = useSelector(
    /** @param {{cart: import('../../Types/CustomTypes').CartStateObject}} state*/ state => {
      const transformedCartItems = [];
      for (const key in state.cart.items) {
        transformedCartItems.push({
          productId: key,
          productTitle: state.cart.items[key].productTitle,
          productPrice: state.cart.items[key].productPrice,
          quantity: state.cart.items[key].quantity,
          sum: state.cart.items[key].sum,
        });
      }

      return transformedCartItems.sort((a, b) => {
        return a.productId > b.productId;
      });
    },
  );

  const dispach = useDispatch();

  return (
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{' '}
          <Text style={styles.amount}>${cartTotalAmount.toFixed(2)}</Text>
        </Text>
        <Button
          color={Colors.accent}
          title="Order now"
          onPress={() => {
            dispach(orderActions.addOrder(cartItems, cartTotalAmount));
          }}
          disabled={cartItems.length === 0}
        />
      </Card>
      {cartItems.length > 0 && (
        <FlatList
          data={cartItems}
          renderItem={item => (
            <CartItem
              deleteable={true}
              title={item.item.productTitle}
              quantity={item.item.quantity}
              amount={item.item.sum}
              onRemove={() => {
                dispach(cartActions.removeFromCart(item.item.productId));
              }}
            />
          )}
        />
      )}
      {cartItems.length === 0 && (
        <View>
          <View style={styles.noItem}>
            <Text>No item added</Text>
          </View>
        </View>
      )}
    </View>
  );
};

CartScreen.navigationOptions = {
  headerTitle: 'Your cart',
};

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 10,
  },
  summaryText: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 18,
  },
  amount: {
    color: Colors.primary,
  },
  noItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CartScreen;
