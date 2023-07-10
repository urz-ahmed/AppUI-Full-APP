import React, {useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import SearchBar from '../components/SearchBar';
import axios from 'axios';
import Article from '../components/Article';

interface ArticleItem {
  urlToImage: string;
  title: string;
  description: string;
  author: string;
  publishedAt: string;
  source: {
    name: string;
  };
}

const SearchScreen: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [articles, setArticles] = useState<ArticleItem[]>([]);

  const searchArticles = () => {
    axios
      .get(
        'https://newsapi.org/v2/top-headlines?country=us&apiKey=c1ef3317ba2e48c8aeab23ad33adb6e9',
        {
          params: {
            category: 'technology',
            q: searchText,
          },
        },
      )
      .then((response) => {
        // handle success
        setArticles(response.data.articles);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <SearchBar
        searchText={searchText}
        setSearchText={setSearchText}
        onSubmit={searchArticles}
      />
      <FlatList
        data={articles}
        renderItem={({item}) => (
          <Article
            urlToImage={item.urlToImage}
            title={item.title}
            description={item.description}
            author={item.author}
            publishedAt={item.publishedAt}
            sourceName={item.source.name}
            url={''}
          />
        )}
        keyExtractor={(item) => item.title}
      />
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
