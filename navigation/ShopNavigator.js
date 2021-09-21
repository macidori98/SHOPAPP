import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';
import {Platform} from 'react-native';
import Colors from '../constants/Colors';
import {createDrawerNavigator} from '@react-navigation/drawer';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
  },
  headerTitleStyle: {
    fontFamily: 'OpenSans-Bold',
  },
  headerBackTitleStyle: {
    fontFamily: 'OpenSans-Regular',
  },
  headerTintColor: Platform.OS === 'android' ? Colors.white : Colors.primary,
};

export const ProductsNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProductsOverview"
        component={ProductsOverviewScreen}
        options={() => ({...defaultNavOptions, headerTitle: 'All Products'})}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={({route}) => ({
          ...defaultNavOptions,
          headerTitle: route.params.productTitle,
        })}
      />
      <Stack.Screen
        name="CartScreen"
        component={CartScreen}
        options={() => ({...defaultNavOptions, headerTitle: 'Cart'})}
      />
    </Stack.Navigator>
  );
};

export const DrawerNavigation = () => {
  return (
    <Drawer.Navigator screenOptions={{headerShown: false}}>
      <Drawer.Screen
        name="Shop"
        component={ProductsNavigation}
        options={() => ({...defaultNavOptions, headerTitle: 'All Products'})}
      />
    </Drawer.Navigator>
  );
};
