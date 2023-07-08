import { View, Text, Alert, SafeAreaView, StyleSheet, ActivityIndicator, ScrollView, RefreshControl,FlatList, Image, Dimensions } from "react-native"
import * as Location from "expo-location"
import { useEffect, useState } from "react"
import { useTheme } from "../hooks"
import { Block } from "../components"
const openWeatherKey = "3584e8b5428ee7ee43c9e8bd7b681e1e"
let url = `https://api.openweathermap.org/data/2.5/weather?`
// let url =`https://api.openweathermap.org/data/2.5/onecall?`
const Weather = () => {
  const {assets, colors, gradients, sizes} = useTheme();
  const [forecast, setForecast] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const loadForecast = async () => {
    setRefreshing(true);
    //ask for permission to access location
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status != 'granted') {
      Alert.alert("Permission to access location was denied");
    }
    //get location
    // const locationOptions: Location.LocationOptions = {
    //   accuracy: Location.Accuracy.High
    // };
    // let location = await Location.getCurrentPositionAsync(locationOptions);
    let location = await Location.getCurrentPositionAsync();
    //fetches the weather data from the openweathermap api
    const response = await fetch(`${url}lat=${location.coords.latitude}&lon=${location.coords.longitude}&units=metric&appid=${openWeatherKey}`)
    const data = await response.json();
    console.log(data)
    if (!response.ok) {
      Alert.alert('Error', 'Something went wrong');
    } else {
      setForecast(data);
    }
    setRefreshing(false)
  }
  useEffect(() => {
    loadForecast();
  }, []);
  if (!forecast) {
    return (
      <SafeAreaView style={styles.loading}>
        <ActivityIndicator size='large' />
      </SafeAreaView>
    )
  }
  const current = forecast.weather[0] // get the current weather data
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView refreshControl={<RefreshControl
        refreshing={refreshing}
        onRefresh={() => loadForecast()}
      />}
        style={{ marginTop: 50 }}
      >
        <Text style={styles.title}>
          Current Weather
        </Text>
        <Text style={{ alignItems: 'center', textAlign: 'center' }}>
          {forecast.name}, {forecast.sys.country}
        </Text>
        <View style={styles.current}>
          <Image
            style={styles.largeIcon}
            source={{
              uri: `https://openweathermap.org/img/wn/${current.icon}@4x.png`
            }}
          />
          <Text style={styles.currentTemp}>
            {Math.round(forecast.main.temp)} ℃
          </Text>
        </View>
        <Text style={styles.currentDescription}>
          {current.description}
        </Text>
        <Block row style={styles.extraInfo}>
          <Block card  marginHorizontal={sizes.sm} style={styles.info}>
            <Image
              source={require('../assets/icons/temperature.png')}
              style={{ width: 40, height: 40, borderRadius: 40 / 2, marginLeft: 50 }}
            />
            <Text style={styles.text}>
              {forecast.main.feels_like} ℃
            </Text>
            <Text style={styles.text}>
              Feels Like
            </Text>
          </Block>
          <Block card  marginHorizontal={sizes.sm} style={styles.info}>
            <Image
              source={require('../assets/icons/humidity.png')}
              style={{ width: 40, height: 40, borderRadius: 40 / 2, marginLeft: 50 }}
            />
            <Text style={styles.text}>
              {forecast.main.humidity} %
            </Text>
            <Text style={styles.text}>
              Humidity
            </Text>
          </Block>
        </Block>
      </ScrollView>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E2F6CA'
  },
  loading: {

  },
  title: {
    textAlign: 'center',
    fontSize: 36,
    fontWeight: 'bold',
    color: 'green',
  },
  current: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center'
  },
  largeIcon: {
    width: 300,
    height: 250,
  },
  currentTemp: {
    fontSize: 30,
    fontWeight: '400',
    textAlign: 'center'
  },
  currentDescription: {
    width: '100%',
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 5,
    fontWeight: "200"
  },
  info:{
    width: Dimensions.get('screen').width/2,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius:15,
    padding:20,
    justifyContent:'center'
  },
  text:{
    fontSize:15,
    fontWeight:'300'
  },
  subtitle:{
    fontSize:20,
    marginVertical:20,
    marginLeft:7,
    color:'green'
  }
})
export default Weather;