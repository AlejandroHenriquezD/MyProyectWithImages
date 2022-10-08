const db = require("../models");
const Car = db.cars;
const Op = db.Sequelize.Op;

// Create and Save a new Bicycle
exports.create = (req, res) => {
  // Validate request
  if (!req.body.brand || !req.body.model || !req.body.price){
    res.status(400).send({
      message: "Content cannot be empty!"
    });
  }

  // Create a Bicycle
  const car = {
    brand: req.body.brand,
    model: req.body.model,
    price: req.body.price,
    filename: req.file ? req.file.filename : ""
  }

  // Save Bicycle in the database
  Car.create(car).then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the bicycle"
    })
  });
};

// Retrieve all Bicycles from the database.
exports.findAll = (req, res) => {
  Car.findAll().then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving all Bicycles"
    })
  })
};

// Find a single Bicycle with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  
  Car.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Tutorial with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id
      });
    });
};

// Update a Bicycle by the id in the request
exports.update = (req, res) => {
  // Validate request
  if (!req.body.brand || !req.body.model || !req.body.price){
    res.status(400).send({
      message: "Content cannot be empty!"
    });
  }

  const car = {
    brand: req.body.brand,
    model: req.body.model,
    price: req.body.price,
    filename: req.file ? req.file.filename : ""
  }
  const id = req.params.id;
  Car.update(car, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: `Pokemon was updated successfully.`
        });
      } else {
        res.send({
          message: `Cannot update Pokemon with id=${id}. Maybe Pokemon was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Pokemon with id=" + id
      });
    });
};

//Delete
exports.delete = (req, res) => {
  const id = req.params.id;

  Car.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Pokemon was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Pokemon with id=${id}. Maybe Pokemon was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Pokemon with id=" + id
      });
    });
};