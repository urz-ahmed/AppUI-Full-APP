import React, { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import en from '../constants/translations/en.json';
import hi from '../constants/translations/hi.json';
import bn from '../constants/translations/bn.json';
import { Scope } from 'i18n-js';

interface ITranslate {
  t: (scope: Scope, options?: i18n.TranslateOptions) => string;
  locale: string;
  setLocale: (value: string) => void;
  changeLanguage: (selectedLocale: string) => void;
}

export const TranslationContext = createContext<ITranslate | null>(null);

export const useTranslation = (): ITranslate => {
  const contextValue = useContext(TranslationContext);
  if (!contextValue) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return contextValue;
};

export const TranslationProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocale] = useState('en');

  i18n.locale = locale;
  i18n.translations = {
    en,
    hi,
    bn,
  };
  i18n.fallbacks = true;

  const t = useCallback(
    (scope: Scope, options: i18n.TranslateOptions = {}) => {
      return i18n.t(scope, { ...options, locale });
    },
    [locale]
  );

  const getLocale = useCallback(async () => {
    const localeJSON = await AsyncStorage.getItem('locale');
    setLocale(localeJSON !== null ? localeJSON : Localization.locale);
  }, [setLocale]);

  useEffect(() => {
    getLocale();
  }, [getLocale]);

  useEffect(() => {
    AsyncStorage.setItem('locale', locale);
  }, [locale]);

  const changeLanguage = useCallback(
    (selectedLocale: string) => {
      setLocale(selectedLocale);
      AsyncStorage.setItem('locale', selectedLocale);
    },
    [setLocale]
  );

  const contextValue: ITranslate = {
    t,
    locale,
    setLocale,
    changeLanguage,
  };

  return (
    <TranslationContext.Provider value={contextValue}>
      {children}
    </TranslationContext.Provider>
  );
};
