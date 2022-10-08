module.exports = app => {
  const cars = require("../controllers/car.controller");
  var upload = require('../multer/upload');

  var router = require("express").Router();

  // Create a new Bicycle
  router.post("/", upload.single('file'), cars.create);

  // Retrieve all Bicycles
  router.get("/", cars.findAll);

  // Retrieve a single Bicycle with id
  router.get("/:id", cars.findOne);

  // Update a Bicycle with id
  router.put("/:id",upload.single('file'), cars.update);
  
  // Delete a Bicycle with id
  router.delete("/:id", cars.delete);

  app.use("/api/cars", router);
}