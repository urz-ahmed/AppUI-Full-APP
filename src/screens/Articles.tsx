import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';

const API_URL =
  'https://newsdata.io/api/1/news?apikey=pub_259149668791f1fd3719222b0afb39346a3bb&q=agriculture&language=en';

const NewsScreen = () => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNewsData();
  }, []);

  const fetchNewsData = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setNewsData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching news data:', error);
      setLoading(false);
    }
  };

  const renderNewsItem = ({ item }) => {
    return (
      <View>
        <Text>{item.title}</Text>
        <Text>{item.description}</Text>
      </View>
    );
  };

  return (
    <View>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={newsData}
          renderItem={renderNewsItem}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
};

export default NewsScreen;
