import axios from "axios";

export default class ApiUsers {
  url = "/api/v1/users";

  loginUserService(email, password, callback) {
    const loginUserServiceURL = `${this.url}/login`;
    axios
      .post(loginUserServiceURL, { email, password })
      .then((r) => {
        const token = r.headers["x-auth-token"];
        const user = r.data;
        if (token && user) {
          user.token = token;
          callback(user);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  registerUserService(fullName, email, password, confirmPassword, onRegister) {
    const loginUserServiceURL = "/api/auth/users/register";
    axios
      .post(loginUserServiceURL, {
        name: fullName,
        email,
        password,
        confirmPassword
      })
      .then((r) => {
        const user = r.data;
        if (user) {
          this.loginUserService(user.email, user.password, onRegister);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
