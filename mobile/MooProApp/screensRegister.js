import { Navigation } from 'react-native-navigation';
import Home from './screens/Home';
import User from './screens/User';
import Initial from './screens/Initial';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import { name as appName } from './app.json';

export default function registerScreens() {
  Navigation.registerComponent(appName, () => Initial);
  Navigation.registerComponent('Home', () => Home);
  Navigation.registerComponent('User', () => User);
  Navigation.registerComponent('SignIn', () => SignIn);
  Navigation.registerComponent('SignUp', () => SignUp);
}
