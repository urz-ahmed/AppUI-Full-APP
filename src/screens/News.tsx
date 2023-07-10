import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, SafeAreaView, FlatList } from "react-native";
import Article from "../components/Article";
import axios from "axios";

interface ArticleItem {
  urlToImage: string;
  title: string;
  description: string;
  author: string;
  publishedAt: string;
  source: {
    name: string;
  };
  url: string;
}

const News: React.FC = () => {
  const [articles, setArticles] = useState<ArticleItem[]>([]);
  const[loading,setLoading]=useState(false);
  const getNews = () => {
    axios.get('https://newsapi.org/v2/top-headlines?country=in&apiKey=c1ef3317ba2e48c8aeab23ad33adb6e9', {
      params: {
        category: "technology",
      }
    })
      .then((response) => {
        // handle success
        setArticles(response.data.articles);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }

  useEffect(() => {
    getNews();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={articles}
        renderItem={({ item }) =>
          <Article
            urlToImage={item.urlToImage}
            title={item.title}
            description={item.description}
            author={item.author}
            publishedAt={item.publishedAt}
            sourceName={item.source.name}
            url={item.url}
          />}
        keyExtractor={(item) => item.title}
      />
    </SafeAreaView>
  );
}

export default News;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});
