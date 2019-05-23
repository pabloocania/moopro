import React, { useEffect } from 'react';
import {
  View, Text, ActivityIndicator, StyleSheet
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { goToAuth, goHome } from '../navigation';

import { USER_KEY } from '../config';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  }
});

export default class Initial extends React.Component {
  async componentDidMount() {
    try {
      const user = await AsyncStorage.getItem(USER_KEY);
      console.log('user: ', user);
      if (user) {
        goHome();
      } else {
        goToAuth();
      }
    } catch (err) {
      console.log('error: ', err);
      goToAuth();
    }
  }

  render() {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  }
}
