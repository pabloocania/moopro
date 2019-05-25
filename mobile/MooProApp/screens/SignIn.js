// SignIn.js
import React from 'react';
import {
  View, Text, StyleSheet, TextInput, Button
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { LoginManager } from 'react-native-fbsdk';
import FacebookLoginRN from '../components/FacebookLoginRN';

import { goHome } from '../navigation';
import { USER_KEY } from '../config';

export default class SignIn extends React.Component {
  state = {
    username: '',
    password: '',
    token: null
  };

  /*
    componentDidMount() {
      const token = this.state;
      if (!token) {
        LoginManager.logOut();
      } else {
        goHome();
      }
    }
  */
  onChangeText = (key, value) => {
    this.setState({ [key]: value });
  };

  signIn = async () => {
    const { username, password } = this.state;
    try {
      // login with provider
      const user = await AsyncStorage.setItem(USER_KEY, username);
      console.log('user successfully signed in!', user);
      goHome();
    } catch (err) {
      console.log('error:', err);
    }
  };

  onSignInFacebookFinished = (token) => {
    this.setState({ token });
    goHome();
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          autoCapitalize="none"
          autoCorrect={false}
          placeholderTextColor="white"
          onChangeText={val => this.onChangeText('username', val)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          autoCapitalize="none"
          secureTextEntry
          placeholderTextColor="white"
          onChangeText={val => this.onChangeText('password', val)}
        />
        <Button title="Sign In" onPress={this.signIn} />
        <Text>Or using your social networks</Text>
        <FacebookLoginRN onSignInFinished={this.onSignInFacebookFinished} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    width: 350,
    fontSize: 18,
    fontWeight: '500',
    height: 55,
    backgroundColor: '#42A5F5',
    margin: 10,
    color: 'white',
    padding: 8,
    borderRadius: 14
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
