import React, { useCallback } from 'react';
import { View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useTranslation } from '../hooks';
import { Scope } from 'i18n-js';

const LanguageSelector = () => {
  const { locale, changeLanguage } = useTranslation();

  const handleLanguageChange = useCallback(
    (selectedLanguage: string) => {
      changeLanguage(selectedLanguage);
    },
    [changeLanguage]
  );

  return (
    <View>
      <Text>Language:</Text>
      <Picker
        selectedValue={locale}
        onValueChange={handleLanguageChange}
      >
        <Picker.Item label="English" value="en" />
        <Picker.Item label="Hindi" value="hi" />
        <Picker.Item label="Bangla" value="bn" />
      </Picker>
    </View>
  );
};

export default LanguageSelector;
