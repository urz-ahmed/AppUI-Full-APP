import {View, Text, SafeAreaView, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useData, useTheme, useTranslation} from '../hooks/';

export default function Assistant() {
  const {assets, colors, fonts, gradients, sizes} = useTheme();
  const {handleUser, isDark, isLogin, user} = useData();
  const navigation = useNavigation();
  const UserName = !isLogin ? 'AI Pair' : user.name;
  const themeColor = isDark ? colors.dark : colors.background;
  const textTheme = isDark ? 'white' : 'black';
  return (
    <SafeAreaView
      className="flex-1 flex justify-around"
      style={{backgroundColor: themeColor}}>
      {/* title */}

      <View className="space-y-2">
        <Text
          style={{
            fontSize: wp(10),
            color: textTheme,
            shadowColor: '#000000',
            shadowOffset: {
              width: 0,
              height: 5,
            },
            shadowOpacity: 0.2,
            shadowRadius: 5.62,
            elevation: 7,
          }}
          className="text-center font-bold font-serif italic underline underline-offset-8 shadow-2xl shadow-rose-500 ">
          {UserName}
        </Text>
        <Text
          style={{fontSize: wp(4), color: textTheme}}
          className="text-center tracking-wider font-semibold text-gray-600">
          The future is here, powerd by AI.
        </Text>
      </View>

      {/* assistant image */}
      <View className="flex-row justify-center text-pink-500">
        <Image
          source={require('../assets/images/robot.png')}
          style={{height: wp(75), width: wp(75)}}
        />
      </View>

      {/* start button */}
      <TouchableOpacity
        onPress={() => navigation.navigate('Chat')}
        className=" mx-5 p-4 rounded-2xl"
        style={{backgroundColor: colors.Primary}}>
        <Text
          style={{fontSize: wp(6)}}
          className="text-center font-bold text-white">
          Get Started
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
