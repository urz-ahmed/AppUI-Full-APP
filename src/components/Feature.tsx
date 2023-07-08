import {View, Text, ScrollView, Image} from 'react-native';
import React from 'react';
import {useData, useTheme, useTranslation} from '../hooks/';
import {useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useState, useEffect} from 'react';
export default function Features() {
  const [C1, setC1] = useState('rose-200');
  const [C2, setC2] = useState('purple-200');
  const [C3, setC3] = useState('cyan-200');
  const {assets, colors, fonts, gradients, sizes} = useTheme();
  const {handleUser, isDark, isLogin, user} = useData();
  const navigation = useNavigation();
  const themeColor = isDark ? colors.dark : colors.background;
  const textTheme = isDark ? 'white' : 'black';

  // Function to shuffle an array using the Fisher-Yates algorithm
  const shuffleArray = (array) => {
    
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };
  useEffect(() => {
    const interval = setInterval(() => {
      const colors = [C1, C2, C3];
      const shuffledColors = shuffleArray(colors);
      setC1(shuffledColors[0]);
      setC2(shuffledColors[1]);
      setC3(shuffledColors[2]);
    }, 3000); // Change colors every 2 seconds

    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <ScrollView
      style={{height: hp(60)}}
      bounces={false}
      showsVerticalScrollIndicator={false}
      className="space-y-4">
      <Text style={{fontSize: wp(6.5)}} className="font-semibold text-gray-700">
        Features
      </Text>
      <View className={`bg-${C1} p-4 rounded-xl space-y-2 `}>
        <View className="flex-row items-center space-x-1">
          <Image
            className="rounded-ful"
            source={require('../assets/images/chatgptIcon.png')}
            style={{height: hp(4), width: hp(4)}}
          />
          <Text
            style={{fontSize: wp(4.8)}}
            className="font-semibold text-gray-700">
            ChatGPT
          </Text>
        </View>

        <Text style={{fontSize: wp(3.8)}} className="text-gray-700 font-medium">
          ChatGPT can provide you with instant and knowledgeable responses,
          assist you with creative ideas on a wide range of topics.
        </Text>
      </View>
      <View className={`bg-${C2} p-4 rounded-xl space-y-2`}>
        <View className="flex-row items-center space-x-1">
          <Image
            className="rounded-ful"
            source={require('../assets/images/dalleIcon.png')}
            style={{height: hp(4), width: hp(4)}}
          />
          <Text
            style={{fontSize: wp(4.8)}}
            className="font-semibold text-gray-700">
            DALL-E
          </Text>
        </View>

        <Text style={{fontSize: wp(3.8)}} className="text-gray-700 font-medium">
          DALL-E can generate imaginative and diverse images from textual
          descriptions, expanding the boundaries of visual creativity.
        </Text>
      </View>
      <View className={`bg-${C3} p-4 rounded-xl space-y-2`}>
        <View className="flex-row items-center space-x-1">
          <Image
            className="rounded-ful"
            source={require('../assets/images/smartaiIcon.png')}
            style={{height: hp(4), width: hp(4)}}
          />
          <Text
            style={{fontSize: wp(4.8)}}
            className="font-semibold text-gray-700">
            Smart AI
          </Text>
        </View>

        <Text style={{fontSize: wp(3.8)}} className="text-gray-700 font-medium">
          A powerful voice assistant with the abilities of ChatGPT and Dall-E,
          providing you the best of both worlds.
        </Text>
      </View>
    </ScrollView>
  );
}
