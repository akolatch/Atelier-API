const model = require('../db');

module.exports = {
  updateHelpfulness: async (collection, id, update) => {
    try {
      await model[collection].findOneAndUpdate(id, { $inc: update });
    } catch (err) {
      console.error(err);
      return err;
    }
  },

  report: async (collection, id) => {
    try {
      await model[collection].findOneAndUpdate(id, { reported: 1 });
    } catch (err) {
      console.error(err);
      return err;
    }
  },

  delete: async (collection, target) => {
    try {
      await model[collection].deleteMany(target);
    } catch (err) {
      console.error(err);
      return err;
    }
  },
};
