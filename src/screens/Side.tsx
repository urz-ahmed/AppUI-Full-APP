import * as React from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import * as Speech from 'expo-speech';
export default function App() {
  const thingToSay = "I am beginning to feel like a Rap God, Rap God All my people from the front to the back nod, back nod Now, who thinks their arms are long enough To slap box, slap box? They said I rap like a robot, so call me Rap-bot";
  const speak = () => {
    Speech.speak(thingToSay);
  };
return (
    <View style={styles.container}>
      <Text style={styles.Texts}>{thingToSay}</Text>
      <Button title="Start listening" onPress={speak} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  Texts: {
    marginTop: 10,
    color: 'black',
    padding:10,
  }
});