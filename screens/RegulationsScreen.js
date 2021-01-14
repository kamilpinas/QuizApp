import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button, Text, View} from 'react-native';
import {STORAGE_KEY} from '../App';
import React, {useState, useEffect} from 'react';

function RegulationsScreen({navigation}) {
  const [accepted, setAccepted] = useState(false);
  useEffect(() => {
    getData();
  }, []);

  if (accepted === true) {
    navigation.navigate('Home');
  }

  const onAccept = async () => {
    try {
      console.log(accepted);
      setAccepted(true);
      await AsyncStorage.setItem(STORAGE_KEY, 'true');
    } catch (err) {
      console.log(err);
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem(STORAGE_KEY);
      if (value !== null) {
        if (value === 'true') {
          setAccepted(true);
        } else {
          setAccepted(false);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={[{alignItems: 'center', margin: 30}]}>
      <Text style={[{fontSize: 30, textAlign: 'center', fontWeight: 'bold'}]}>
        Regulamin
      </Text>
      <Text style={[{fontSize: 12, marginTop: 20, marginBottom: 50}]}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat Lorem ipsum dolor sit amet, consectetur adipiscing
        elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
        ut aliquip ex ea commodo consequat Lorem ipsum dolor sit amet,
        consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
        et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat Lorem ipsum dolor sit amet, consectetur adipiscing
        elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
        ut aliquip ex ea commodo consequat{' '}
      </Text>
      <Button
        title={'Akceptuj'}
        onPress={() => {
          onAccept();
          navigation.navigate('Home');
        }}
      />
    </View>
  );
}

export default RegulationsScreen;
