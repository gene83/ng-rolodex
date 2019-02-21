const bookshelf = require('./bookshelf');
require('./Contact');

class User extends bookshelf.Model {
  get hidden() {
    return ['id', 'password', 'created_at', 'updated_at'];
  }

  get tableName() {
    return 'users';
  }
  get hasTimstamps() {
    return true;
  }

  contacts() {
    return this.hasMany('Contact', 'id', 'created_by');
  }
}

module.exports = bookshelf.model('User', User);
