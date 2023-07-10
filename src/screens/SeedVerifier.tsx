import React, { useState } from 'react';
import { Block, Button, Input, Image, Switch, Modal, Text } from '../components/';
import { useTheme } from '../hooks';

const SeedVerifier = () => {
  const { assets, colors, gradients, sizes } = useTheme();

  const [seedId, setSeedId] = useState('');

  const handleSeedIdChange = (value: React.SetStateAction<string>) => {
    setSeedId(value);
  };

  const handleVerify = () => {
    console.log('Verifying seed ID:', seedId);
  };

  return (
    <Block>
      <Text
        h5
        bold
        transform="uppercase"
        gradient={gradients.tertiary}
        marginTop={sizes.sm}
        padding={sizes.m}
        center
      >
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
