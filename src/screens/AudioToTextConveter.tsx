import Voice from '@react-native-community/voice';
import {SpeechClient} from '@google-cloud/speech';
import { Alert } from 'react-native';

// Create a Speech-to-Text client
const speechClient = new SpeechClient({keyFilename: '../keyfile.json'});

// Start recording audio
async function startTextConversion() {
  Voice.start('en-US');
}

// Stop recording audio and perform speech recognition
async function stopTextConversion() {
  console.log("stopTextConversion")
  Voice.stop();

  // Get the audio file path from Voice module
  const audioFilePath = '../assets/audio/hello-46355.mp3';

  // Read the audio file using react-native-fs
  const audioFile = await RNFS.readFile(audioFilePath, 'base64');

  // Perform speech recognition using Google Cloud Speech-to-Text API
  const [response] = await speechClient.recognize({
    audio: {
      content: audioFile,
    },
    config: {
      encoding: 'LINEAR16',
      sampleRateHertz: 16000,
      languageCode: 'en-US',
    },
  });

  // Extract the transcript from the API response
  const transcript = response.results
    .map((result) => result.alternatives[0].transcript)
    .join('');
  console.log(transcript);
  return transcript;
}

export {startTextConversion, stopTextConversion};
