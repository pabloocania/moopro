import axios from "axios";
import getAuthHeader from "../_helpers/auth-header";

export default class apiDTOS {
  url = "/api/v1/dtos";

  requestOptions = {
    headers: getAuthHeader()
  };

  getDTOS() {
    const getDtos = `${this.apiUrl}`;
    return new Promise((resolve, reject) => {
      axios.get(getDtos, this.requestOptions).then(
        (result) => {
          localStorage.setItem("dtos", JSON.stringify(result.data));
          resolve(result.data);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          reject(error);
        }
      );
    });
  }
}
