import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {Articles, Components, Home, Profile, Register, Pro} from '../screens';
import {useScreenOptions, useTranslation} from '../hooks';
import Login from '../screens/Login';
// <<<<<<< HEAD
import Assistant from '../screens/Assistant';
import ChatScreen from '../screens/ChatScreen';
// =======
import Weather from '../screens/Weather';
// >>>>>>> 99bca51207f76886aa94e709407b1258dbc012ff


const Stack = createStackNavigator();

export default () => {
  const {t} = useTranslation();
  const screenOptions = useScreenOptions();

  return (
    <Stack.Navigator screenOptions={screenOptions.stack}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{title: t('navigation.home')}}
        
      />

      <Stack.Screen
        name="Components"
        component={Components}
        options={screenOptions.components}
      />

      <Stack.Screen
        name="Articles"
        component={Articles}
        options={{title: t('navigation.articles')}}
      />

      {/* // <Stack.Screen name="Pro" component={Pro} options={screenOptions.pro} /> */}
      <Stack.Screen
        name="Weather"
        component={Weather}
        options={{headerShown: true}}
      />

      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Register"
        component={Register}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Assistant"
        component={Assistant}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={{headerShown: false}}
      />

    
    </Stack.Navigator>
  );
};
