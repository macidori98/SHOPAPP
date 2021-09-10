import React from 'react';
import {StyleSheet, View} from 'react-native';
import Colors from '../../constants/Colors';

const Card = props => {
  return (
    <View style={{...styles.container, ...props.style}}>{props.children}</View>
  );
};

const styles = StyleSheet.create({
  container: {
    shadowColor: Colors.black,
    backgroundColor: Colors.white,
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
  },
});

export default Card;
