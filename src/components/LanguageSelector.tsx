import React, { useCallback } from 'react';
import { View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useTranslation } from '../hooks';
import { Scope } from 'i18n-js';
import { useData } from '../hooks';
const LanguageSelector = () => {
  const { locale, changeLanguage } = useTranslation();
  const isDark=useData()
  const textTheme = isDark ? 'white' : 'black';
  const handleLanguageChange = useCallback(
    (selectedLanguage: string) => {
      changeLanguage(selectedLanguage);
    },
    [changeLanguage]
  );

  return (
    <View>
      <Picker
        selectedValue={locale}
        onValueChange={handleLanguageChange}
        style={{backgroundColor:textTheme}}
      >
        <Picker.Item label="English" value="en" />
        <Picker.Item label="हिंदी" value="hi" />
        <Picker.Item label="বাংলা" value="bn" />
      </Picker>
    </View>
  );
};

export default LanguageSelector;
