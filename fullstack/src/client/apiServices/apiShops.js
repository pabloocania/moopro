import axios from "axios";
import getAuthHeader from "../_helpers/auth-header";

export default class ApiShops {
  apiUrl = "/api/v1/shops";

  // const encodedID = encodeURIComponent(id);

  requestOptions = {
    headers: getAuthHeader()
  };

  getShops() {
    const getShops = `${this.apiUrl}`;
    return new Promise((resolve, reject) => {
      axios.get(getShops, this.requestOptions).then(
        (result) => {
          resolve(result.data.shops);
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

  getShopsDTO() {
    const getShops = `${this.apiUrl}/dto`;
    return new Promise((resolve, reject) => {
      axios.get(getShops, this.requestOptions).then(
        (result) => {
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

  saveNewShop(shop) {
    const saveNewShop = `${this.apiUrl}/new`;
    console.log(shop);
    return new Promise((resolve, reject) => {
      axios
        .post(saveNewShop, shop, this.requestOptions)
        .then(result => resolve(result))
        .catch(error => reject(new Error(error.response.data.message)));
    });
  }
}
