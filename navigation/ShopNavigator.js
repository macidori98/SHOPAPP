import {Platform} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Colors from '../constants/Colors';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';

const ProductsNavigator = createStackNavigator(
  {
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail: ProductDetailScreen,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
      },
      headerTitleStyle: {
        fontFamily: 'OpenSans-Bold',
      },
      headerBackTitleStyle: {
        fontFamily: 'OpenSans-Regular',
      },
      headerTintColor:
        Platform.OS === 'android' ? Colors.white : Colors.primary,
    },
  },
);

export default createAppContainer(ProductsNavigator);
