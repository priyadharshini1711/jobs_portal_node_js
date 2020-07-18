module.exports = app => {
    const jobs = require("../controllers/jobs.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", jobs.create);
  
    // Retrieve all jobs
    router.get("/", jobs.findAll);
  
    // Retrieve all published jobs
    router.get("/published", jobs.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", jobs.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", jobs.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", jobs.delete);
  
    // Create a new Tutorial
    router.delete("/", jobs.deleteAll);
  
    app.use('/api/jobs', router);
  };