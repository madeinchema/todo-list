const initialData = {
  tasks: {
    'task-1': { id: 'task-1', title: 'Take out the garbage', checked: false },
    'task-2': { id: 'task-2', title: 'Watch my favorite show', checked: false },
    'task-3': { id: 'task-3', title: 'Charge my phone', checked: true },
    'task-4': { id: 'task-4', title: 'Cook dinner', checked: false },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To do',
      taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
    }
  },
  // Facilitate reordering of the columns
  columnOrder: ['column-1']
};

export default initialData;
