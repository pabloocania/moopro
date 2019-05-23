/**
 * @format
 */
import { Navigation } from 'react-native-navigation';
import { name as appName } from './app.json';
import registerScreens from './screensRegister';
/*
class FakeApp extends Component {
  render() {
    return null;
  }
}
AppRegistry.registerComponent("thrifter", () => FakeApp);

AppRegistry.registerComponent(appName, () => FakeApp);

*/
registerScreens();
Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      component: {
        name: appName
      }
    }
  });
});
