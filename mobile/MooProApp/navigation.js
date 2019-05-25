// navigation.js
import { Navigation } from "react-native-navigation";
import signinIcon from "./images/signIn.png";
import signupIcon from "./images/signUp.png";

export const goToAuth = () => Navigation.setRoot({
    root: {
      bottomTabs: {
        id: "BottomTabsId",
        children: [
          {
            component: {
              name: "SignIn",
              options: {
                bottomTab: {
                  fontSize: 12,
                  text: "Sign In",
                  icon: signinIcon,
                  iconColor: "blue"
                }
              }
            }
          },
          {
            component: {
              name: "SignUp",
              options: {
                bottomTab: {
                  text: "Sign Up",
                  fontSize: 12,
                  icon: signupIcon
                }
              }
            }
          }
        ]
      }
    }
  });

export const goHome = () => Navigation.setRoot({
    root: {
      stack: {
        id: "App",
        children: [
          {
            component: {
              name: "Home"
            }
          }
        ]
      }
    }
  });
