import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';
import {Platform} from 'react-native';
import Colors from '../constants/Colors';
import {createDrawerNavigator} from '@react-navigation/drawer';
import OrdersScreen from '../screens/shop/OrdersScreen';
import UserProductsScreen from '../screens/user/UserProductsScreen';
import EditProductScreen from '../screens/user/EditProductScreen';
import AuthScreen from '../screens/user/AuthScreen';
import StartupScreen from '../screens/StartupScreen';

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

const ProductsNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{...defaultNavOptions}}>
      <Stack.Screen
        name="ProductsOverview"
        component={ProductsOverviewScreen}
        options={() => ({headerTitle: 'All Products', title: 'All products'})}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={({route}) => ({
          title: route.params.productTitle,
          headerTitle: route.params.productTitle,
        })}
      />
      <Stack.Screen
        name="CartScreen"
        component={CartScreen}
        options={() => ({headerTitle: 'Cart', title: 'Cart'})}
      />
    </Stack.Navigator>
  );
};

const OrderNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Orders"
        component={OrdersScreen}
        options={() => defaultNavOptions}
      />
    </Stack.Navigator>
  );
};

const AdminNavigator = () => {
  return (
    <Stack.Navigator screenOptions={defaultNavOptions}>
      <Stack.Screen name="UserProducts" component={UserProductsScreen} />
      <Stack.Screen
        name="EditProducts"
        component={EditProductScreen}
        initialParams={{productId: -1}}
      />
    </Stack.Navigator>
  );
};

const AuthNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Auth" component={AuthScreen} />
    </Stack.Navigator>
  );
};

const ShopNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        ...defaultNavOptions,
        headerShown: false,
        drawerActiveTintColor: Colors.primary,
        drawerInactiveTintColor: Colors.greyish,
      }}>
      <Drawer.Screen
        name="Shop"
        component={ProductsNavigation}
        options={() => ({headerTitle: 'All Products', title: 'All products'})}
      />
      <Drawer.Screen
        name="Orderss"
        component={OrderNavigator}
        options={{title: 'Orders'}}
      />
      <Drawer.Screen name="Admin" component={AdminNavigator} />
    </Drawer.Navigator>
  );
};

export const MainNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        ...defaultNavOptions,
        headerShown: false,
      }}>
      <Stack.Screen name="Startup" component={StartupScreen} />
      <Stack.Screen name="Authh" component={AuthNavigator} />
      <Stack.Screen name="Shopp" component={ShopNavigator} />
    </Stack.Navigator>
  );
};
