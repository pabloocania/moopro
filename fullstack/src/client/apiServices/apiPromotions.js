import axios from "axios";

export default class apiPromotions {
  url = "/api/v1/promociones";

  async getPromociones() {
    axios
      .get(`${this.url}`)
      .then(promociones => promociones)
      .catch(error => console.log(error));
  }
}
