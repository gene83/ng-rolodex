const bookshelf = require('./bookshelf');
require('./User');

class Contact extends bookshelf.Model {
  get tableName() {
    return 'contacts';
  }
  get hasTimestamps() {
    return true;
  }

  users() {
    return this.belongsTo('User', 'created_by', 'id');
  }
}

module.exports = bookshelf.model('Contact', Contact);
