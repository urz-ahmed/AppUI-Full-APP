import React, {useCallback, useState} from 'react';
import axios from 'axios';
import {
  ScrollView,
  TouchableOpacity,
  View,
  StyleSheet,
  Linking,
} from 'react-native';
import {useData, useTheme, useTranslation} from '../hooks/';
import {Block, Button, Image, Input, Product, Text} from '../components/';
import {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import Weather from './Weather';

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
      image: require('../assets/images/analysis.png'),
      title: t('home.analyseplants'),
      navigateTo: 'SeedVerifier',
    },
    {
      id: 2,
      image: require('../assets/images/seeds-icon.png'),
      title: t('home.seed_verifier'),
      navigateTo: 'SeedVerifier',
    },
    {
      id: 3,
      image: require('../assets/images/location.png'),
      title: t('home.nearby'),
      navigateTo:
        'https://www.google.com/maps/search/nearby+agriculture+research+center/@22.6538069,88.3017304,11z/data=!3m1!4b1?entry=ttu',
    },
    
    {
      id: 4,
      image: require('../assets/images/chatbot.png'),
      title: t('home.ask_teja'),
      navigateTo: 'Assistant',
    },
    {
      id: 5,
      image: require('../assets/images/poision.png'),
      title:"Pesticide calculator",
      navigateTo: 'Assistant',
    },
    // Add more items as needed
  ];

  // Function to handle opening external links
  const openExternalLink = async (url) => {
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.error('Error opening URL:', error);
    }
  };

  const [weatherData, setWeatherData] = useState(null);
  const handleWeatherData = (data) => {
    setWeatherData(data);
  };

  useEffect(() => {
    console.log('Weather Data:', weatherData);
  }, [weatherData]);
const custom_text='white';
  return (
    <Block color={themeColor}>
      <Weather onWeatherData={handleWeatherData} />
      <Block
        scroll
        paddingHorizontal={sizes.padding}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: sizes.l}}
        color={themeColor}>
        {/* Display Weather data */}
        {weatherData && (
          <Block>
            <Block card row>
              <Image
                resizeMode="contain"
                source={{
                  uri: `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`,
                }}
                style={{height: 114}}
              />
              <Block padding={sizes.s} justify="space-between">
                <Text p>
                  Temperature: {Math.round(weatherData.main.temp)} ℃
                </Text>
                <Text p>Humidity: {weatherData.main.humidity}%</Text>
                <Text p>Chance of Rain: {weatherData.main.humidity}%</Text>
              </Block>
            </Block>
          </Block>
        )}
        <Text
          h5
          bold
          transform="uppercase"
          gradient={gradients.tertiary}
          marginTop={sizes.sm}
          style={styles.exploreTitle}
          className={`text-white`}
          >
          {t('home.explore')}
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
                onPress={() => {
                  if (item.navigateTo.startsWith('http')) {
                    // It's an external link, open it
                    openExternalLink(item.navigateTo);
                  } else {
                    // It's an internal navigation, navigate within the app
                    navigation.navigate(item.navigateTo);
                  }
                }}>
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
    width: 35,
    height: 40,
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
  exploreTitle: {
    borderBottomWidth: 2, // Add an underline
    borderBottomColor: 'grey', // Set the underline color
    paddingBottom: 5, // Adjust as needed
  },
});
