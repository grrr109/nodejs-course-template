const Board = require('./board.model');

const BOARDS = [
  new Board({
    title: 'Title 1',
    columns: [
      { title: 'Backlog', order: 1 },
      { title: 'Sprint', order: 2 }
    ]
  }),
  new Board({
    title: 'Title 2',
    columns: [
      { title: 'Backlog', order: 1 },
      { title: 'Sprint', order: 2 }
    ]
  }),
  new Board({
    title: 'Title 3',
    columns: [
      { title: 'Backlog', order: 1 },
      { title: 'Sprint', order: 2 }
    ]
  })
];

const getAll = async () => {
  return BOARDS;
};

const addBoard = ({ title, columns }) => {
  const board = new Board({ title, columns });
  BOARDS.push(board);
  return board;
};

const getBoardById = id => {
  return BOARDS.find(item => item.id === id);
};

const putBoardById = (id, { title, columns }) => {
  const index = BOARDS.map(item => item.id).indexOf(id);

  if (index === -1) {
    return 'error';
  }

  BOARDS[index] = { ...BOARDS[index], title, columns };
  return BOARDS[index];
};

const deleteBoardById = id => {
  const index = BOARDS.map(item => item.id).indexOf(id);

  if (index === -1) {
    return 'error';
  }

  BOARDS.splice(index, 1);

  return BOARDS;
};

module.exports = {
  getAll,
  addBoard,
  getBoardById,
  putBoardById,
  deleteBoardById
};
