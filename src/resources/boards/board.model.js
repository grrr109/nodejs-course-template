const uuid = require('uuid');

class Board {
  constructor({ id = uuid(), title = 'Title', columns = 3 } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
}

module.exports = Board;
