import React from 'react';
import {
  View, Text, StyleSheet, Button
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import facebookService from "../services/FacebookService";
import { goToAuth } from '../navigation';

import { USER_KEY } from '../config';
import Profile from '../components/Profile';

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
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      fbProfile: null
    };
  }

  componentDidMount() {
    if (!this.state.fbProfile) {
      facebookService.fetchProfile().then((profile) => {
        this.setState({ fbProfile: profile });
      }).catch((error) => {
        console.log(error);
      });
    }
  }

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
    this.setState({ fbProfile: null, user: null });
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
                name: 'User',
                passProps: { profile: this.state.fbProfile }
              }
            });
          }}
          title="View next screen"
        />
      </View>
    );
  }
}
