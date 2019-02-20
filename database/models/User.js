const bookshelf = require('./bookshelf');

class User extends bookshelf.Model {
  get tableName() {
    return 'users';
  }
  get hasTimstamps() {
    return true;
  }

  contacts() {
    return this.hasMany('contacts');
  }
}

module.exports('User', User);
