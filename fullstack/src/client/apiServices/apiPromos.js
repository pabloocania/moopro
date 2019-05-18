import axios from "axios";
import getAuthHeader from "../_helpers/auth-header";

export default class ApiPromos {
  apiUrl = "/api/v1/promos";

  requestOptions = {
    headers: getAuthHeader()
  };

  async getPromociones() {
    axios
      .get(`${this.url}`)
      .then(promociones => promociones)
      .catch(error => console.log(error));
  }

  saveNewPromo(promo) {
    const saveNewPromo = `${this.apiUrl}/new`;
    console.log(promo);
    return new Promise((resolve, reject) => {
      axios
        .post(saveNewPromo, promo, this.requestOptions)
        .then(result => resolve(result))
        .catch((error) => {
          const errorText = error.response.data.message
            ? error.response.data.message
            : error.response.statusText;
          reject(new Error(errorText));
        });
    });
  }
}
