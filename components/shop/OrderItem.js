import React, {useState} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import Colors from '../../constants/Colors';
import Card from '../UI/Card';
import CartItem from './CartItem';

const OrderItem = props => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <Card style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.amount}>${props.total.toFixed(2)} </Text>
        <Text style={styles.date}>{props.date}</Text>
      </View>
      <Button
        title={showDetails ? 'Hide' : 'Show'}
        color={Colors.primary}
        onPress={() => {
          setShowDetails(prevState => !prevState);
        }}
      />
      {showDetails && (
        <View style={styles.detailItem}>
          {props.items.map(item => (
            <CartItem
              key={item.productId}
              deleteable={false}
              title={item.productTitle}
              quantity={item.quantity}
              amount={item.sum}
            />
          ))}
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    margin: 20,
    padding: 10,
    alignItems: 'center',
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 15,
  },
  amount: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 16,
  },
  date: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 16,
    color: Colors.greyish,
  },
  detailItem: {
    width: '100%',
  },
});

export default OrderItem;
