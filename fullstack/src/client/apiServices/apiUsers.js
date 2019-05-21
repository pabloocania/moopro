import axios from "axios";

export default class ApiUsers {
  url = "/api/v1/users";

  loginUserService(email, password) {
    const loginUserServiceURL = `${this.url}/login`;
    return new Promise((resolve, reject) => {
      axios
        .post(loginUserServiceURL, { email, password })
        .then((r) => {
          const token = r.headers["x-auth-token"];
          const user = r.data;
          if (token && user) {
            user.token = token;
            localStorage.setItem("user", JSON.stringify(user));
            resolve();
          } else {
            reject(new Error("Couldn't find the user"));
          }
        })
        .catch((error) => {
          reject(error.response.data);
        });
    });
  }

  socialLoginUserService(email, userID) {
    const loginUserServiceURL = `${this.url}/sociallogin`;
    return new Promise((resolve, reject) => {
      axios
        .post(loginUserServiceURL, { email, userID })
        .then((r) => {
          const token = r.headers["x-auth-token"];
          const user = r.data;
          if (token && user) {
            user.token = token;
            localStorage.setItem("user", JSON.stringify(user));
            resolve();
          } else {
            reject(new Error("Couldn't find the user"));
          }
        })
        .catch((error) => {
          reject(error.response.data.message);
        });
    });
  }

  registerUserService(name, email, password, socialUser = null) {
    const registerUserServiceURL = `${this.url}/register`;
    return new Promise((resolve, reject) => {
      axios
        .post(registerUserServiceURL, {
          name,
          email,
          password,
          socialUser
        })
        .then((r) => {
          const user = r.data;
          if (user) {
            this.loginUserService(user.email, password)
              .then(() => resolve())
              .catch(error => reject(error));
          }
        })
        .catch((error) => {
          console.log(error.response.data.message);
          reject(error.response.data.message);
        });
    });
  }
}
