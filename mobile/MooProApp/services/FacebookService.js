import {
  LoginButton, AccessToken, GraphRequest, GraphRequestManager
} from 'react-native-fbsdk';

class FacebookService {
  constructor() {
    this.requestManager = new GraphRequestManager();
  }

    fetchProfile = () => new Promise((resolve, reject) => {
      const request = new GraphRequest(
        '/me',
        null,
        (error, result) => {
          if (result) {
            const profile = result;
            profile.avatar = `https://graph.facebook.com/${result.id}/picture`;
            resolve(profile);
          } else {
            reject(error);
          }
        }
      );
      if (!this.requestManager) {
        this.requestManager = new GraphRequestManager();
      }
      this.requestManager.addRequest(request).start();
    })
}

export default new FacebookService();
