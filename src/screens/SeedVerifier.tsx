import React, {useState, useEffect} from 'react';
import {Block, Button, Input, Image, Switch, Modal, Text} from '../components/';
import {useTheme} from '../hooks';
import {BarCodeScanner} from 'expo-barcode-scanner';
import {StatusBar} from 'expo-status-bar';
import {StyleSheet} from 'react-native';
import * as Speech from 'expo-speech';
const SeedVerifier = () => {
  const {assets, colors, gradients, sizes} = useTheme();

  const [seedId, setSeedId] = useState('');

  const [hasPermission, setHasPermission] = React.useState(false);
  const [scanData, setScanData] = React.useState();
  const [showBarcode, setShowBarcode] = useState(false);

  useEffect(() => {
    (async () => {
      const {status} = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (!hasPermission) {
    return (
      <Block style={styles.container}>
        <Text>Please grant camera permissions to app.</Text>
      </Block>
    );
  }
  const handleBarCodeScanned = ({type, data}) => {
    Speech.speak('Qr Code Scanned');
    setScanData(data);
    console.log(`Data: ${data}`);
    console.log(`Type: ${type}`);
    setShowBarcode(false);
  };

  const handleSeedIdChange = (value: React.SetStateAction<string>) => {
    setSeedId(value);
  };

  const handleVerify = () => {
    setScanData(undefined);
    Speech.speak('Place Your QR Code Here');
    setShowBarcode(true);
    setTimeout(() => {
        Speech.speak('Your Qr Code will be closed after 10 seconds');
    }, 1000);

    setTimeout(() => setShowBarcode(false), 11 * 1000);
  };
  if (showBarcode) {
    return (
      <BarCodeScanner
        style={StyleSheet.absoluteFillObject}
        onBarCodeScanned={scanData ? undefined : handleBarCodeScanned}
      />
    );
  } else
    return (
      <Block>
        <Text
          h5
          bold
          transform="uppercase"
          gradient={gradients.tertiary}
          marginTop={sizes.sm}
          padding={sizes.m}
          center>
          Verify your seeds
        </Text>
        <Block marginHorizontal={sizes.m}>
          <Input
            search
            marginBottom={sizes.sm}
            placeholder="Enter Seeds ID"
            value={seedId}
            onChangeText={handleSeedIdChange}
          />
          <Text>{seedId}</Text>
        </Block>
        <Block marginHorizontal={sizes.xxl}>
          <Button gradient={gradients.success} onPress={handleVerify}>
            <Text white bold transform="uppercase">
              Verify
            </Text>
          </Button>
        </Block>
      </Block>
    );
};

export default SeedVerifier;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
