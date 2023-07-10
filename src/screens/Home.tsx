import React, {useCallback, useState} from 'react';
import axios from 'axios';
import {ScrollView, TouchableOpacity, View, StyleSheet} from 'react-native';
import {useData, useTheme, useTranslation} from '../hooks/';
import {Block, Button, Image, Input, Product, Text} from '../components/';
import {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();
  const {t} = useTranslation();
  const [tab, setTab] = useState<number>(0);
  const {following} = useData();
  const [, setProducts] = useState(following);
  const {assets, colors, gradients, sizes} = useTheme();
  const {isDark} = useData();
  const {isLogin} = useData();

  useEffect(() => {
    console.log('Login Status:', isLogin);
  });

  const themeColor = isDark ? colors.dark : colors.background;
  const gridItems = [
    {
      id: 1,
      image: require('../assets/images/seeds-icon.png'),
      title: 'Seed Verifier',
      navigateTo: 'SeedVerifier',
    },
    {
      id: 2,
      image: require('../assets/images/location.png'),
      title: 'Nearby Research Center',
      navigateTo: 'SeedVerifier',
    },
    {
      id: 3,
      image: require('../assets/images/analysis.png'),
      title: 'Analyze Plants',
      navigateTo: 'SeedVerifier',
    },

    // Add more items as needed
  ];

  return (
    <Block color={themeColor}>
      {/* products list */}
      <Block
        scroll
        paddingHorizontal={sizes.padding}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: sizes.l}}
        color={themeColor}>
        <Block row wrap="wrap" justify="space-between" marginTop={sizes.sm}>
          {/* single card */}
          <Block>
            <Block card row>
              <Image
                resizeMode="contain"
                source={assets?.card1}
                style={{height: 114}}
              />
              <Block padding={sizes.s} justify="space-between">
                <Text p>Temperature: 23%</Text>
                <Text p>Humidity: 65%</Text>
                <Text p>Chance of Rain: 90%</Text>
                <TouchableOpacity>
                  <Block row align="center">
                    <Text
                      p
                      semibold
                      marginRight={sizes.s}
                      color={colors.success}>
                      More
                    </Text>
                    <Image source={assets.arrow} color={colors.success} />
                  </Block>
                </TouchableOpacity>
              </Block>
            </Block>
          </Block>
        </Block>
        <Text
          h5
          bold
          transform="uppercase"
          gradient={gradients.tertiary}
          marginTop={sizes.sm}>
          Explore
        </Text>
        {/* Small Cards */}
        <View style={{padding: 16}}>
          <ScrollView
            contentContainerStyle={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-around',
            }}>
            {gridItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => navigation.navigate(item.navigateTo)}>
                <View style={styles.Genetics1} className="mt-2">
                  <View style={styles.Group212}>
                    <Image style={styles.DnaIcon} source={item.image} />
                    <Text className="">{item.title}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Block>
    </Block>
  );
};

export default Home;
const styles = StyleSheet.create({
  Genetics1: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: 114,
    height: 133,
    paddingLeft: 22,
    paddingRight: 24,
    paddingTop: 21,
    paddingBottom: 18,
    borderColor: 'rgba(151,151,151,1)',
    borderRadius: 20,
    boxSizing: 'border-box',
    backgroundColor: 'white',
  },
  Group212: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    boxSizing: 'border-box',
  },
  DnaIcon: {
    width: 27,
    height: 38,
  },
  Genetics: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    color: 'rgba(34,43,69,1)',
    fontSize: '15px',
    lineHeight: '15px',
    fontFamily: 'Museo Sans Cyrl, sans-serif',
    fontWeight: '400',
    textAlign: 'center',
    letterSpacing: '0.3px',
  },
});
