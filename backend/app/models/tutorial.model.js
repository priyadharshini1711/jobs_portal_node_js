module.exports = (sequelize, Sequelize) => {
    const Job = sequelize.define("jobs", {
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      published: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return Job;
  };