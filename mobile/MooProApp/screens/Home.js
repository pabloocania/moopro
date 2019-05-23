import React from 'react';
import {
  View, Text, StyleSheet, Button
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import { goToAuth } from '../navigation';

import { USER_KEY } from '../config';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  }
});

export default class Home extends React.Component {
  static get options() {
    return {
      topBar: {
        title: {
          text: 'Home'
        }
      }
    };
  }

  logout = async () => {
    AsyncStorage.removeItem(USER_KEY)
      .then(() => goToAuth())
      .catch(err => console.log('error signing out...: ', err));
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Hello from Home screen.</Text>
        <Button onPress={this.logout} title="Sign Out" />
        <Button
          onPress={() => {
            Navigation.push(this.props.componentId, {
              component: {
                name: 'User'
              }
            });
          }}
          title="View next screen"
        />
      </View>
    );
  }
}
