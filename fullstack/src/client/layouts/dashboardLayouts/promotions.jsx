import React from "react";

export default class Promotions extends React.Component {
  state = {
    name: "Promotions"
  };

  render() {
    return (
      <div>
        <h1>{this.state.name}</h1>
      </div>
    );
  }
}
