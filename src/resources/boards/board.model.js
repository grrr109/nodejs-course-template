const uuid = require('uuid');

class Board {
  constructor({
    id = uuid(),
    title = 'Title',
    columns = [
      { title: 'Backlog', order: 1 },
      { title: 'Sprint', order: 2 }
    ]
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
}

module.exports = Board;
