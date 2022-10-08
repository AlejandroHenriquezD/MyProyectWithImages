module.exports = (sequelize, Sequelize) => {
  const Car = sequelize.define("car", {
    brand: {
      type: Sequelize.STRING
    },
    model: {
      type: Sequelize.STRING
    },
    price: {
      type: Sequelize.STRING
    },
    filename: {
      type: Sequelize.STRING
    }
  });

  return Car;
}