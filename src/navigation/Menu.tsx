import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Alert,
  Animated,
  Linking,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import axios from 'axios';
import {View} from 'react-native';

import {
  useIsDrawerOpen,
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentOptions,
  DrawerContentScrollView,
} from '@react-navigation/drawer';

import Screens from './Screens';
import {Block, Text, Switch, Button, Image} from '../components';
import {useData, useTheme, useTranslation} from '../hooks';
import Login from '../screens/Login';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LanguageSelector from '../components/LanguageSelector';
const Drawer = createDrawerNavigator();

/* drawer menu screens navigation */
const ScreensStack = () => {
  const isDrawerOpen = useIsDrawerOpen();
  const animation = useRef(new Animated.Value(0)).current;
  const {assets, colors, gradients, sizes} = useTheme();

  const scale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.88],
  });

  const borderRadius = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 16],
  });

  const animatedStyle = {
    borderRadius: borderRadius,
    transform: [{scale: scale}],
  };

  useEffect(() => {
    Animated.timing(animation, {
      duration: 200,
      useNativeDriver: true,
      toValue: isDrawerOpen ? 1 : 0,
    }).start();
  }, [isDrawerOpen, animation]);

  return (
    <Animated.View
      style={StyleSheet.flatten([
        animatedStyle,
        {
          flex: 1,
          overflow: 'hidden',
          borderColor: colors.card,
          borderWidth: isDrawerOpen ? 1 : 0,
        },
      ])}>
      {/*  */}
      <Screens />
    </Animated.View>
  );
};

/* custom drawer menu */
const DrawerContent = (
  props: DrawerContentComponentProps<DrawerContentOptions>,
) => {
  const {navigation} = props;
  const {t} = useTranslation();
  const [loading, setLoading] = useState(false);
  const {isDark, handleIsDark, isLogin, user, handleUser, handleIsLogin} =
    useData();
  const [active, setActive] = useState('Home');
  const [showPicker, setShowPicker] = useState(false);
  const {assets, colors, gradients, sizes} = useTheme();

  const labelColor = colors.text;
  const themeColor = isDark ? gradients.dark : gradients.light;
  const textTheme = isDark ? 'white' : 'black';
  const HandleLogout = async () => {
    try {
      setLoading(true);
      await axios.post('https://farmappbackend.onrender.com/logout');
      navigation.navigate('Login');
      handleUser({
        id: 0,
        email: 'email',
        name: 'username',
        department: 'Department',
        stats: {posts: 0, followers: 0, following: 0},
        social: {twitter: 'twitter', dribbble: 'dribbble'},
        about: 'about',
        avatar:
          'https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?fit=crop&w=80&q=80',
      });
      await AsyncStorage.removeItem('user');
      await AsyncStorage.removeItem('isLogin');
      // Reset login state
      handleIsLogin(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleNavigation = useCallback(
    (to) => {
      setActive(to);
      navigation.navigate(to);
    },
    [navigation, setActive],
  );

  // screen list for Drawer menu
  const screens = [
    {name: t('screens.home'), to: 'Home', icon: assets.home},
    {name: t('screens.components'), to: 'Components', icon: assets.components},
    {name: t('screens.articles'), to: 'Articles', icon: assets.document},
    {name: t('screens.rental'), to: 'Pro', icon: assets.rental},
    {name: t('screens.profile'), to: 'Profile', icon: assets.profile},

    {name: t('screens.settings'), to: 'Pro', icon: assets.settings},
  ];
  // language selector
  const {locale, changeLanguage} = useTranslation();
  const togglePicker = () => {
    setShowPicker(!showPicker);
  };
  if (!isLogin) {
    screens.push(
      {name: t('screens.register'), to: 'Register', icon: assets.register},
      {name: t('screens.login'), to: 'Login', icon: assets.login},
    );
  }

  return (
    <DrawerContentScrollView
      {...props}
      scrollEnabled
      removeClippedSubviews
      renderToHardwareTextureAndroid
      contentContainerStyle={{paddingBottom: sizes.padding}}>
      <Block paddingHorizontal={sizes.padding}>
        <Block flex={0} row align="center" marginBottom={sizes.l}>
          <Image
            radius={0}
            width={33}
            height={33}
            color={textTheme}
            source={assets.logo}
            marginRight={sizes.sm}
          />
          <Block>
            <Text size={12} semibold color={textTheme}>
              {t('app.name')}
            </Text>
            <Text size={12} semibold color={textTheme}>
              {t('app.native')}
            </Text>
          </Block>
        </Block>

        {screens?.map((screen, index) => {
          const isActive = active === screen.to;
          return (
            <Button
              row
              justify="flex-start"
              marginBottom={sizes.s}
              key={`menu-screen-${screen.name}-${index}`}
              onPress={() => handleNavigation(screen.to)}>
              <Block
                flex={0}
                radius={6}
                align="center"
                justify="center"
                width={sizes.md}
                height={sizes.md}
                marginRight={sizes.s}
                gradient={gradients[isActive ? 'primary' : 'white']}>
                <Image
                  radius={0}
                  width={14}
                  height={14}
                  source={screen.icon}
                  color={colors[isActive ? 'white' : 'black']}
                />
              </Block>
              <Text p semibold={isActive} color={textTheme}>
                {screen.name}
              </Text>
            </Button>
          );
        })}

        <Block
          flex={0}
          height={1}
          marginRight={sizes.md}
          marginVertical={sizes.sm}
          gradient={gradients.menu}
        />
        {/* 
        <Text semibold transform="uppercase" opacity={0.5}>
          {t('menu.documentation')}
        </Text> */}

        {/* Render the Logout button only when isLogin is true */}
        {isLogin && (
          <Button
            row
            justify="flex-start"
            marginTop={sizes.sm}
            marginBottom={sizes.s}
            disabled={!isLogin}
            onPress={HandleLogout}>
            <Block
              flex={0}
              radius={6}
              align="center"
              justify="center"
              width={sizes.md}
              height={sizes.md}
              marginRight={sizes.s}
              gradient={gradients.white}>
              {loading ? (
                <ActivityIndicator />
              ) : (
                <Image
                  radius={0}
                  width={14}
                  height={14}
                  // color={colors.black}
                  source={assets.logout}
                />
              )}
            </Block>
            <Text p color={textTheme}>
              {t('Logout.title')}
            </Text>
          </Button>
        )}

        {/* // language button */}

        <Button
          row
          justify="flex-start"
          marginTop={sizes.sm}
          marginBottom={sizes.s}
          onPress={togglePicker}>
          <Block
            flex={0}
            radius={6}
            align="center"
            justify="center"
            width={sizes.md}
            height={sizes.md}
            marginRight={sizes.s}
            gradient={gradients.white}>
            <Image
              radius={0}
              width={14}
              height={14}
              color={colors.icon}
              source={assets.LangIcon}
            />
          </Block>
          <Text p color={textTheme}>
            Language
          </Text>
        </Button>

        {showPicker && <LanguageSelector />}
        {/* Dark mode Switch  */}
        <Block row justify="space-between" marginTop={sizes.sm}>
          <Text color={textTheme}>{t('darkMode')}</Text>
          <Switch
            checked={isDark}
            onPress={(checked) => {
              handleIsDark(checked);
            }}
          />
        </Block>
      </Block>
    </DrawerContentScrollView>
  );
};

/* drawer menu navigation */
export default () => {
  const {gradients, colors} = useTheme();
  const {isDark} = useData();
  const themeColor = isDark ? gradients.dark : gradients.light;
  const textTheme = isDark ? 'white' : 'black';
  return (
    <Block gradient={themeColor}>
      <Drawer.Navigator
        drawerType="slide"
        overlayColor="transparent"
        sceneContainerStyle={{backgroundColor: 'transparent'}}
        drawerContent={(props) => <DrawerContent {...props} />}
        drawerStyle={{
          flex: 1,
          width: '60%',
          borderRightWidth: 0,
          backgroundColor: 'transparent',
        }}>
        <Drawer.Screen name="Screens" component={ScreensStack} />
      </Drawer.Navigator>
    </Block>
  );
};
