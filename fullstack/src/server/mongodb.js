const mongoose = require('mongoose');

module.exports = () => {
  mongoose
    .connect(
      `mongodb://localhost:27017/${process.env.NAME}`,
      { useNewUrlParser: true }
    )
    .then(() => console.log('MongoDB Connected &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&'))
    .catch(err => console.log(err));
};
