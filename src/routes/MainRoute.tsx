import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  createBottomTabNavigator,
  BottomTabScreenProps,
  BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs';
import {
  HomeScreen,
  ExploreScreen,
  MessageScreen,
  NotificationScreen,
  ProfileScreen,
} from '../screens/main';
import { TestingScreen } from '../screens';
import { ParamListBase, RouteProp } from '@react-navigation/native';
import { IoIcon } from '../components/Icons';
import colors from '../config/colors';

const MainStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

type Props = {
  route: RouteProp<ParamListBase, string>;
  navigation: any;
};

type TabBarIconType = {
  focused: boolean;
  color: any;
  size: number;
};

const _renderScreenOptions = ({ route }: Props) => ({
  tabBarIcon: ({ focused, color, size }: TabBarIconType) => {
    let iconName = '';

    if (route.name === 'Home') {
      iconName = focused ? 'home' : 'home-outline';
    } else if (route.name === 'Explore') {
      iconName = focused ? 'search' : 'search-outline';
    } else if (route.name === 'Message') {
      iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
    } else if (route.name === 'Notification') {
      iconName = focused ? 'notifications' : 'notifications-outline';
    } else if (route.name === 'Profile') {
      iconName = focused ? 'person' : 'person-outline';
    }

    // You can return any component that you like here!
    return <IoIcon name={iconName} size={size + 1} color={colors.primary} />;
  },
  tabBarActiveTintColor: 'tomato',
  tabBarInactiveTintColor: 'gray',
  headerShown: false,

  // tabBarLabel: () => {
  //   return null;
  // },
});

const MainRoute = () => {
  return (
    <Tab.Navigator screenOptions={_renderScreenOptions}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Message" component={MessageScreen} />
      <Tab.Screen name="Notification" component={NotificationScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
  // return (
  //   <MainStack.Navigator screenOptions={{ headerShown: false }}>
  //     {/* <MainStack.Screen name="Testing" component={TestingScreen} /> */}
  //     <MainStack.Screen name="Home" component={HomeScreen} />
  //   </MainStack.Navigator>
  // );
};

export default MainRoute;
