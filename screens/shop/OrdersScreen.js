import React from 'react';
import {View, Text, StyleSheet, FlatList, Platform} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {useSelector} from 'react-redux';
import OrderItem from '../../components/shop/OrderItem';
import CustomHeaderButton from '../../components/UI/CustomHeaderButton';

const OrdersScreen = props => {
  const orders = useSelector(state => state.order.orders);

  if (orders.length > 0) {
    return (
      <FlatList
        data={orders}
        renderItem={itemData => (
          <OrderItem
            total={itemData.item.totalAmount}
            date={itemData.item.readableDate}
            items={itemData}
          />
        )}
      />
    );
  } else {
    return (
      <View style={styles.noData}>
        <Text>No orders yet</Text>
      </View>
    );
  }
};

OrdersScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Your orders',
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
  };
};

const styles = StyleSheet.create({
  noData: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default OrdersScreen;
