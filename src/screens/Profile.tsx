import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/core';

import {Block, Button, Image, Text} from '../components/';
import {useData, useTheme, useTranslation} from '../hooks/';


const Profile = () => {
  const {user, isLogin, isDark} = useData();
  const {t} = useTranslation();
  const navigation = useNavigation();
  const {assets, colors, sizes, gradients} = useTheme();
  useEffect(() => {
    if (!isLogin) {
      navigation.navigate('Login');
    }
  }, [isLogin, navigation]);
  const themeColor = isDark ? gradients.dark : gradients.light;
  const textTheme = isDark ? 'white' : 'black';
  return (
    <Block safe marginTop={sizes.md}  >
      <Block
        scroll
        paddingHorizontal={sizes.s}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: sizes.padding}}
      
        >
        <Block flex={0} gradient={themeColor}>
          <Image
            background
            resizeMode="cover"
            padding={sizes.sm}
            paddingBottom={sizes.l}
            radius={sizes.cardRadius}
            source={assets.background}>
            <Button
              row
              flex={0}
              justify="flex-start"
              onPress={() => navigation.goBack()}>
              <Image
                radius={0}
                width={10}
                height={18}
                color={colors.white}
                source={assets.arrow}
                transform={[{rotate: '180deg'}]}
              />
              <Text p white marginLeft={sizes.s} color={textTheme}>
                {t('profile.title')}
              </Text>
            </Button>
            <Block flex={0} align="center">
              <Image
                width={64}
                height={64}
                marginBottom={sizes.sm}
                source={{uri: user?.avatar}}
              />
              <Text h5 center white>
                {user?.name}
              </Text>
              <Text p center white>
                {user?.department}
              </Text>
            </Block>
          </Image>

          {/* profile: about me */}
          <Block paddingHorizontal={sizes.sm}>
            <Text h5 semibold marginTop={sizes.sm} color={textTheme}>
              {t('profile.aboutMe')}
            </Text>
            <Text p lineHeight={26} color={textTheme}>
              {user?.about}
            </Text>
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

export default Profile;
