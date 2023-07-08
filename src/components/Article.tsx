import React, {useEffect, useState} from 'react';
import dayjs from 'dayjs';
import {TouchableWithoutFeedback} from 'react-native';
import Text from './Text';
import Block from './Block';
import Image from './Image';
import {useTheme, useTranslation, useData} from '../hooks/';
import {IArticle} from '../constants/types';
import axios from 'axios';
const Article = ({
  title,
  description,
  image,
  category,
  rating,
  location,
  timestamp,
  user,
  onPress,
}: IArticle) => {
  const {isLogin, isDark} = useData();
  const {t} = useTranslation();
  const {colors, gradients, icons, sizes} = useTheme();
  const [News, SetNews] = useState('');
  const API_URL =
    'https://newsapi.org/v2/top-headlines?country=in&apiKey=ba4d97e8640f45d19149d26f024d39f7';
  // useEffect(() => {
  //   try {
  //     axios
  //       .get(API_URL)
  //       .then((res) => {
  //         const filteredResults = res.data.articles.filter(
  //           (article) =>
  //             article.title &&
  //             article.description &&
  //             article.content &&
  //             article.author &&
  //             article.publishedAt &&
  //             article.urlToImage,
  //         );
  //         SetNews(filteredResults);
  //         console.log(News[0].urlToImage);

  //         // Check if News is not empty before accessing specific properties
  //         // if (News&&res.data.results.length > 0) {
  //         //   console.log(News[0].title);
  //         // } else {
  //         //   console.log("No Title");
  //         // }
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //         // Handle the error appropriately (e.g., show an error message)
  //       });
  //   } catch (error) {
  //     console.log(error);
  //     // Handle the error appropriately (e.g., show an error message)
  //   }
  // }, [isLogin]);

  // render card for Newest & Fashion
  if (category?.id !== 1) {
    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <Block card padding={sizes.sm} marginTop={sizes.sm}>
          <Image height={170} resizeMode="cover" source={{uri: image}} />
          {/* article category */}
          {category?.name && (
            <Text
              h5
              bold
              size={13}
              marginTop={sizes.s}
              transform="uppercase"
              marginLeft={sizes.xs}
              gradient={gradients.primary}>
              {category?.name}
            </Text>
          )}

          {/* article description */}
          {description && (
            <Text
              p
              marginTop={sizes.s}
              marginLeft={sizes.xs}
              marginBottom={sizes.sm}>
              {description}
            </Text>
          )}

          {/* user details */}
          {user?.name && (
            <Block row marginLeft={sizes.xs} marginBottom={sizes.xs}>
              <Image
                radius={sizes.s}
                width={sizes.xl}
                height={sizes.xl}
                source={{uri: user?.avatar}}
                style={{backgroundColor: colors.white}}
              />
              <Block justify="center" marginLeft={sizes.s}>
                <Text p semibold>
                  {user?.name}
                </Text>
                <Text p gray>
                  {t('common.posted', {
                    date: dayjs(timestamp).format('DD MMMM') || '-',
                  })}
                </Text>
              </Block>
            </Block>
          )}

          {/* location & rating */}
          {(Boolean(location) || Boolean(rating)) && (
            <Block row align="center">
              <Image source={icons.location} marginRight={sizes.s} />
              <Text p size={12} semibold>
                {location?.city}, {location?.country}
              </Text>
              <Text p bold marginHorizontal={sizes.s}>
                •
              </Text>
              <Image source={icons.star} marginRight={sizes.s} />
              <Text p size={12} semibold>
                {rating}/5
              </Text>
            </Block>
          )}
        </Block>
      </TouchableWithoutFeedback>
    );
  }

  // render card for Popular
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Block card white padding={0} marginTop={sizes.sm}>
        <Image
          background
          resizeMode="cover"
          radius={sizes.cardRadius}
          source={{uri: image}}>
          <Block color={colors.overlay} padding={sizes.padding}>
            <Text h4 white marginBottom={sizes.sm}>
              {title}
            </Text>
            <Text p white>
              {description}
            </Text>
            {/* user details */}
            <Block row marginTop={sizes.xxl}>
              <Image
                radius={sizes.s}
                width={sizes.xl}
                height={sizes.xl}
                source={{uri: user?.avatar}}
                style={{backgroundColor: colors.white}}
              />
              <Block justify="center" marginLeft={sizes.s}>
                <Text p white semibold>
                  {user?.name}
                </Text>
                <Text p white>
                  {user?.department}
                </Text>
              </Block>
            </Block>
          </Block>
        </Image>
      </Block>
    </TouchableWithoutFeedback>
  );
};

export default Article;
