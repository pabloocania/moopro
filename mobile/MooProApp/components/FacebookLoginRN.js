import React, { Component } from 'react';
import { View, TouchableHighlight } from 'react-native';
import {
  LoginButton, AccessToken, GraphRequest, GraphRequestManager
} from 'react-native-fbsdk';

export default class FacebookLogin extends Component {
  constructor(props) {
    super(props);
    this.requestManager = new GraphRequestManager();
  }

    fetchProfile = callback => new Promise((resolve, reject) => {
      const request = new GraphRequest('/me', null, (error, result) => {
        if (result) {
          const profile = result;
          profile.avatar = `https://graph.facebook.com/${result.id}/picture`;
          resolve(profile);
        } else {
          reject(error);
        }
      });

      this.requestManager.addRequest(request).start();
    });

    render() {
      const { onSignInFinished } = this.props;
      return (
          <View>
              <LoginButton
                  readPermissions={['public_profile']}
                  onLoginFinished={(error, result) => {
                      if (error) {
                        console.log(`login has error: ${result.error}`);
                      } else if (result.isCancelled) {
                        console.log('login is cancelled.');
                      } else {
                        AccessToken.getCurrentAccessToken().then((data) => {
                          onSignInFinished(data.accessToken.toString());
                        });
                      }
                    }}
                  onLogoutFinished={() => console.log('logout.')}
                />
            </View>
      );
    }
}
