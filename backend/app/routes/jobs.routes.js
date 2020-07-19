module.exports = app => {
    const jobs = require("../controllers/jobs.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Jobs
    router.post("/", jobs.create);
  
    // Retrieve all jobs
    router.get("/", jobs.findAll);
  
    // Retrieve all published jobs
    router.get("/published", jobs.findAllPublished);
  
    // Retrieve a single Jobs with id
    router.get("/:id", jobs.findOne);
  
    // Update a Jobs with id
    router.put("/:id", jobs.update);
  
    // Delete a Jobs with id
    router.delete("/:id", jobs.delete);
  
    // delete Jobs
    router.delete("/", jobs.deleteAll);
  
    app.use('/api/jobs', router);
  };