import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import {useData, useTheme, useTranslation} from '../hooks/';
import Voice from '@react-native-community/voice';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {apiCall} from '../api/openAI';
import Features from '../components/Feature';
import Tts from 'react-native-tts';
import {Audio} from 'expo-av';
import {Configuration, OpenAIApi} from 'openai';
import {dummyMessages} from '../constants/message';
import {Block, Button, Input} from '../components';
const ChatScreen = () => {
  const [result, setResult] = useState('');
  const [rec, setRec] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recording, setRecording] = React.useState();
  const [messages, setMessages] = useState([]);
  const [speaking, setSpeaking] = useState(false);
  const {assets, colors, gradients, sizes} = useTheme();
  const scrollViewRef = useRef();
  const {isDark} = useData();

  const {t} = useTranslation();
  const themeColor = isDark ? colors.dark : colors.background;
  const textTheme = isDark ? 'white' : 'black';
  const [promptChat, setPromptChat] = useState('');
  const [sound, setSound] = React.useState();
  const StartSound = '../assets/audio/hello2.mp3';
  const EndSound = '../assets/audio/helloend.mp3';
  const OPENAI_API_KEY = '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';
  async function getChatResponse(prompt: string) {
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {role: 'system', content: 'You are a helpful assistant.'},
        {role: 'user', content: prompt},
      ],
    });

    return completion.data.choices[0].message.content;
  }
  const configuration = new Configuration({
    apiKey: OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const handleChat = () => {
    getChatResponse(promptChat)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  async function playSound() {
    console.log('Loading Sound');
    const {sound} = await Audio.Sound.createAsync(require(StartSound));
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync();
  }
  async function pauseSound() {
    console.log('Loading Sound');
    const {sound} = await Audio.Sound.createAsync(require(EndSound));
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync();
  }
  React.useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const speechStartHandler = (e) => {
    console.log('speech start event', e);
  };
  const speechEndHandler = (e) => {
    setRec(false);
    console.log('speech stop event', e);
  };
  const speechResultsHandler = (e) => {
    console.log('speech event: ', e);
    const text = e.value[0];
    setResult(text);
  };

  const speechErrorHandler = (e) => {
    console.log('speech error: ', e);
  };

  async function startRecording() {
    setRec(true);
    try {
      console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log('Starting recording..');
      const {recording} = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY,
      );
      playSound();
      setRecording(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    setRec(false);
    console.log('Stopping recording..');
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });
    const uri = recording.getURI();
    console.log('Recording stopped and stored at', uri);
    pauseSound();
  }

  const clear = async () => {
    // await Tts.stop();
    setRec(false);
    setSpeaking(false);
    setLoading(false);
    setMessages([]);
  };

  const fetchResponse = async () => {
    if (result.trim().length > 0) {
      setLoading(true);
      let newMessages = [...messages];
      newMessages.push({role: 'user', content: result.trim()});
      setMessages([...newMessages]);

      // scroll to the bottom of the view
      updateScrollView();

      setLoading(true);
      const response = await getChatResponse(result.trim());

      // const newMessages = [...messages];
      newMessages.push({role: 'user', content: result.trim()});
      newMessages.push({role: 'assistant', content: response});

      setMessages(newMessages);
      setResult('');
      setLoading(false);
      updateScrollView();
      startTextToSpeach({role: 'assistant', content: response});
    }
  };

  const updateScrollView = () => {
    setTimeout(() => {
      scrollViewRef?.current?.scrollToEnd({animated: true});
    }, 200);
  };

  const startTextToSpeach = async (message) => {
    if (!message.content.includes('https')) {
      setSpeaking(true);
      try {
        await Tts.stop();
        await Tts.speak(message.content, {
          iosVoiceId: 'com.apple.ttsbundle.Samantha-compact',
          rate: 0.5,
        });
      } catch (error) {
        console.log('Error in Text to Speech', error);
      }
    }
  };

  const stopSpeaking = async () => {
    try {
      await Tts.stop();
      setSpeaking(false);
    } catch (error) {
      console.log('error', error);
    }
  };
  const handleChatChange = (value: React.SetStateAction<string>) => {
    setPromptChat(value);
  };
  useEffect(() => {
    // voice handler events
    Voice.onSpeechStart = speechStartHandler;
    Voice.onSpeechEnd = speechEndHandler;
    Voice.onSpeechResults = speechResultsHandler;
    Voice.onSpeechError = speechErrorHandler;

    // text to speech events

    // Tts.setDefaultLanguage('en-IE');

    Tts.addEventListener('tts-start', (event) => console.log('start', event));
    Tts.addEventListener('tts-finish', (event) => {
      console.log('finish', event);
      setSpeaking(false);
    });
    Tts.addEventListener('tts-cancel', (event) => console.log('cancel', event));

    return () => {
      // destroy the voice instance after component unmounts
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  return (
    <View className="flex-1  mt-3" style={{backgroundColor: themeColor}}>
      {/* <StatusBar barStyle="dark-content" /> */}
      <SafeAreaView className="flex-1 flex mx-5">
        {/* bot icon */}
        <View className="flex-row justify-center">
          <Image
            source={require('../assets/images/robot.png')}
            style={{height: hp(25), width: hp(25)}}
            className="mt-1"
          />
        </View>

        {/* features || message history */}
        {messages.length > 0 ? (
          <View className="space-y-2 flex-1">
            <Text
              className=" font-semibold ml-1"
              style={{fontSize: wp(5), color: textTheme}}>
              Assistant
            </Text>

            <View
              style={{height: hp(58)}}
              className="bg-neutral-200 rounded-3xl p-4">
              <ScrollView
                ref={scrollViewRef}
                bounces={false}
                className="space-y-4"
                showsVerticalScrollIndicator={false}>
                {messages.map((message, index) => {
                  if (message.role == 'assistant') {
                    if (message.content.includes('https')) {
                      // result is an ai image
                      return (
                        <View key={index} className="flex-row justify-start">
                          <View className="p-2 flex rounded-2xl bg-cyan-100 rounded-tl-none">
                            {/* <Image
                              source={{uri: message.content}}
                              className="rounded-2xl"
                              resizeMode="contain"
                              style={{height: wp(60), width: wp(60)}}
                            /> */}
                          </View>
                        </View>
                      );
                    } else {
                      // chat gpt response
                      return (
                        <View
                          key={index}
                          style={{width: wp(70)}}
                          className="bg-cyan-100 p-2 rounded-xl rounded-tl-none ">
                          <Text
                            className="text-neutral-800"
                            style={{fontSize: wp(4)}}>
                            {message.content}
                          </Text>
                        </View>
                      );
                    }
                  } else {
                    // user input text
                    return (
                      <View key={index} className="flex-row justify-end">
                        <View
                          style={{width: wp(70)}}
                          className="bg-white p-2 rounded-xl rounded-tr-none">
                          <Text style={{fontSize: wp(4)}}>
                            {message.content}
                          </Text>
                        </View>
                      </View>
                    );
                  }
                })}
              </ScrollView>
            </View>
          </View>
        ) : (
          <Features />
        )}
        <View className="">
          <Input
            placeholder="Enter Text"
            marginBottom={sizes.sm}
            value={promptChat}
            onChangeText={handleChatChange}
          />
          <TouchableOpacity
            onPress={handleChat}
            className="flex items-end justify-top ">
            {/* recording start button */}
            <Image
              className="rounded-full "
              source={require('../assets/icons/sendLarge.png')}
              style={{width: hp(2), height: hp(2)}}
            />
          </TouchableOpacity>
        </View>
        {/* recording, clear and stop buttons */}
        <View className="flex justify-center items-center">
          {loading ? (
            <Image
              source={require('../assets/images/loading.gif')}
              style={{width: hp(10), height: hp(10), borderRadius: 100}}
            />
          ) : rec ? (
            <TouchableOpacity
              className="space-y-2 rounded-full"
              onPress={stopRecording}>
              {/* recording stop button */}
              <Image
                className="rounded-full"
                source={require('../assets/images/voiceLoading.gif')}
                style={{width: hp(10), height: hp(10), borderRadius: 100}}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={startRecording}>
              {/* recording start button */}
              <Image
                className="rounded-full"
                source={require('../assets/images/recordingIcon.png')}
                style={{width: hp(10), height: hp(10)}}
              />
            </TouchableOpacity>
          )}

          {messages.length > 0 && (
            <TouchableOpacity
              onPress={clear}
              className="bg-neutral-400 rounded-3xl p-2 absolute right-10">
              <Text className="text-white font-semibold">Clear</Text>
            </TouchableOpacity>
          )}

          {speaking && (
            <TouchableOpacity
              onPress={stopSpeaking}
              className="bg-red-400 rounded-3xl p-2 absolute left-10">
              <Text className="text-white font-semibold">Stop</Text>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    </View>
  );
};

export default ChatScreen;