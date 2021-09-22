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

/**
 * @typedef {{ProductsOverview: undefined, ProductDetail: undefined, CartScreen: undefined}} ProductsParamList
 */
/**
 * @typedef {{Orders: undefined}} OrdersParamList
 */
/**
 * @typedef {{UserProducts: undefined, EditProducts: undefined}} UserParamList
 */
/**
 * @typedef {{Auth: undefined}} AuthParamList
 */
/**
 * @typedef {{Authh: undefined, Shopp: undefined, Startup: undefined}} ShopParamList
 */
/**
 * @typedef {{Shop: undefined, Orderss: undefined, Admin: undefined}} DrawerParamList
 */

/**
 * @template T
 * @typedef {import('@react-navigation/native').TypedNavigator<T, import('@react-navigation/native').StackNavigationState<import('@react-navigation/native').ParamListBase>,  import('@react-navigation/native-stack/lib/typescript/src/types').NativeStackNavigationOptions, import('@react-navigation/native-stack/lib/typescript/src/types').NativeStackNavigationEventMap, ({ initialRouteName, children, screenListeners, screenOptions, ...rest}: import('@react-navigation/native-stack/lib/typescript/src/types').NativeStackNavigatorProps) => JSX.Element>} CreateNativeStackNavigatorResult
 */

/**
 * @template K
 * @typedef {import('@react-navigation/native').TypedNavigator<K, import('@react-navigation/routers').DrawerNavigationState<import('@react-navigation/routers').ParamListBase>, import('@react-navigation/drawer').DrawerNavigationOptions, import('@react-navigation/drawer/lib/typescript/src/types').DrawerNavigationEventMap, ({ initialRouteName, defaultStatus, backBehavior, children, screenListeners, screenOptions, openByDefault, lazy, drawerContentOptions, ...rest }: (import('@react-navigation/native').DefaultNavigatorOptions<import('@react-navigation/routers').ParamListBase, import('@react-navigation/routers').DrawerNavigationState<import('@react-navigation/routers').ParamListBase>, import('@react-navigation/drawer').DrawerNavigationOptions, import('@react-navigation/drawer/lib/typescript/src/types').DrawerNavigationEventMap> & import('@react-navigation/routers').DrawerRouterOptions & import('@react-navigation/drawer/lib/typescript/src/types').DrawerNavigationConfig))=> JSX.Element>} CreateDrawerNavigatorResult
 */

/**
 * @type {CreateNativeStackNavigatorResult<ProductsParamList>}
 */
const ProductsStack = createNativeStackNavigator();
/**
 * @type {CreateNativeStackNavigatorResult<OrdersParamList>}
 */
const OrdersStack = createNativeStackNavigator();
/**
 * @type {CreateNativeStackNavigatorResult<UserParamList>}
 */
const UserStack = createNativeStackNavigator();
/**
 * @type {CreateNativeStackNavigatorResult<AuthParamList>}
 */
const AuthStack = createNativeStackNavigator();
/**
 * @type {CreateNativeStackNavigatorResult<ShopParamList>}
 */
const ShopStack = createNativeStackNavigator();
/**
 * @type {CreateDrawerNavigatorResult<DrawerParamList>}
 */
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
    <ProductsStack.Navigator screenOptions={{...defaultNavOptions}}>
      <ProductsStack.Screen
        name="ProductsOverview"
        component={ProductsOverviewScreen}
        options={() => ({headerTitle: 'All Products', title: 'All products'})}
      />
      <ProductsStack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={({route}) => ({
          title: route.params.productTitle,
          headerTitle: route.params.productTitle,
        })}
      />
      <ProductsStack.Screen
        name="CartScreen"
        component={CartScreen}
        options={() => ({headerTitle: 'Cart', title: 'Cart'})}
      />
    </ProductsStack.Navigator>
  );
};

const OrderNavigator = () => {
  return (
    <OrdersStack.Navigator>
      <OrdersStack.Screen
        name="Orders"
        component={OrdersScreen}
        options={() => defaultNavOptions}
      />
    </OrdersStack.Navigator>
  );
};

const AdminNavigator = () => {
  return (
    <UserStack.Navigator screenOptions={defaultNavOptions}>
      <UserStack.Screen name="UserProducts" component={UserProductsScreen} />
      <UserStack.Screen
        name="EditProducts"
        component={EditProductScreen}
        initialParams={{productId: -1}}
      />
    </UserStack.Navigator>
  );
};

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="Auth" component={AuthScreen} />
    </AuthStack.Navigator>
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
        name=""
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
    <ShopStack.Navigator
      screenOptions={{
        ...defaultNavOptions,
        headerShown: false,
      }}>
      <ShopStack.Screen name="Startup" component={StartupScreen} />
      <ShopStack.Screen name="Authh" component={AuthNavigator} />
      <ShopStack.Screen name="Shopp" component={ShopNavigator} />
    </ShopStack.Navigator>
  );
};
