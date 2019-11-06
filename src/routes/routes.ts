import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from '../screens/home_screen/homeScreen';
import {SearchScreen} from './../screens/search_screen/searchScreen';

export enum ROUTES {
  RootMain = 'RootMain',
  RootModal = 'RootModal',
  RootDetails = 'RootDetails',
  ModalMain = 'ModalMain',
  MainHome = 'MainHome',
  MainDetails = 'MainDetails',
}

const ModalStack = createStackNavigator({
  [ROUTES.ModalMain]: {
    screen: SearchScreen,
  },
});

const MainStack = createStackNavigator({
  [ROUTES.MainHome]: {
    screen: HomeScreen,
  },
  [ROUTES.MainDetails]: {
    screen: SearchScreen,
  },
});

const RootStack = createStackNavigator(
  {
    [ROUTES.RootMain]: {
      screen: MainStack,
    },
    [ROUTES.RootModal]: {
      screen: ModalStack,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  },
);

const AppContainer = createAppContainer(RootStack);

export default AppContainer;
