import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  Platform,
  TouchableOpacity,
  TouchableNativeFeedback,
} from 'react-native';
import Colors from '../../constants/Colors';

const ProductItem = props => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <TouchableCmp onPress={props.onViewDetail} useForeground>
      <View style={styles.product}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{uri: props.imageUrl}}
            resizeMode={'cover'}
          />
        </View>
        <View style={styles.details}>
          <Text style={styles.title}>{props.title}</Text>
          <Text styles={styles.price}>${props.price.toFixed(2)}</Text>
        </View>
        <View style={styles.actions}>
          <Button
            color={Colors.primary}
            title={'View details'}
            onPress={props.onViewDetail}
          />
          <Button
            color={Colors.primary}
            title={'To cart'}
            onPress={props.onAddToCart}
          />
        </View>
      </View>
    </TouchableCmp>
  );
};

const styles = StyleSheet.create({
  product: {
    shadowColor: Colors.black,
    backgroundColor: Colors.white,
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    height: 300,
    margin: 20,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 18,
    marginVertical: 4,
  },
  price: {
    fontSize: 14,
    color: Colors.greyish,
  },
  actions: {
    height: '20%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  details: {
    alignItems: 'center',
    height: '20%',
    padding: 10,
  },
  imageContainer: {
    width: '100%',
    height: '60%',
    overflow: 'hidden',
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
  },
});

export default ProductItem;
