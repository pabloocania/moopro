import React, { Component } from 'react';
import {
  StyleSheet, View, Text, SafeAreaView,
  ActivityIndicator
} from 'react-native';
import { Avatar, Image } from 'react-native-elements';


export default class Profile extends Component {
  render() {
    const { profile } = this.props;
    if (profile == null) {
      return <View />;
    }

    const styles = StyleSheet.create({
      container: {
        flexDirection: 'row'
      },
      left: {
        paddingRight: 10
      },
      avatar: {

      },
      text: {
        fontSize: 20
      },
      right: {
        flexDirection: 'column',
        justifyContent: 'space-around'
      }
    });

    return (
      <View style={styles.container}>
        <View style={styles.left}>
          <Avatar
            large
            rounded
            source={{ uri: profile.avatar }}
          />
        </View>
        <View style={styles.right}>
          <Text style={styles.text}>{profile.name}</Text>
        </View>
      </View>
    );
  }
}
