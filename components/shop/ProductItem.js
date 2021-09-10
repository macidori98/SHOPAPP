import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
  TouchableOpacity,
  TouchableNativeFeedback,
} from 'react-native';
import Colors from '../../constants/Colors';
import Card from '../UI/Card';

const ProductItem = props => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <Card style={styles.product}>
      <View style={styles.touchable}>
        <TouchableCmp onPress={props.onSelect} useForeground>
          <View>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{uri: props.imageUrl}} />
            </View>
            <View style={styles.details}>
              <Text style={styles.title}>{props.title}</Text>
              <Text style={styles.price}>${props.price.toFixed(2)}</Text>
            </View>
            <View style={styles.actions}>{props.children}</View>
          </View>
        </TouchableCmp>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  product: {
    height: 300,
    margin: 20,
  },
  touchable: {
    overflow: 'hidden',
    borderRadius: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 18,
    marginVertical: 4,
  },
  price: {
    fontFamily: 'OpenSans-Bold',
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
    fontFamily: 'OpenSans-Regular',
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
