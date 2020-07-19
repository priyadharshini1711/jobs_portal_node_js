const db = require("../models");
const Jobs = db.jobs;
const Op = db.Sequelize.Op;

// Create and Save a new Jobs
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a Jobs
    const jobs = {
      title: req.body.title,
      description: req.body.description,
      vacancy: req.body.published ? req.body.published : false
    };
  
    // Save Jobs in the database
    Jobs.create(jobs)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Jobs."
        });
      });
  };

// Retrieve all Jobs from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
    Jobs.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Jobs."
        });
      });
  };

// Find a single Jobs with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Jobs.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Jobs with id=" + id
        });
      });
  };

// Update a Jobs by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    Jobs.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Jobs was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Jobs with id=${id}. Maybe Jobs was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Jobs with id=" + id
        });
      });
  };

// Delete a Jobs with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Jobs.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Jobs was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Jobs with id=${id}. Maybe Jobs was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Jobs with id=" + id
        });
      });
  };

// Delete all Jobs from the database.
exports.deleteAll = (req, res) => {
    Jobs.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Jobs were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Jobs."
        });
      });
  };
// Find all published Jobs
exports.findAllPublished = (req, res) => {
    Jobs.findAll({ where: { published: true } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Jobs."
        });
      });
  };