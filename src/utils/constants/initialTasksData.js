export default {
  empty: {
    tasks: {},
    columns: {
      'to-do': {
        id: 'to-do',
        title: 'To do',
        taskIds: [],
      },
    },
    // Facilitate reordering of the columns
    columnOrder: ['to-do'],
  },
  mock: {
    tasks: {
      'task-1': {
        id: 'task-1',
        title: 'Take out the garbage',
        checked: true,
        priority: 1,
      },
      'task-2': {
        id: 'task-2',
        title: 'Watch my favorite show',
        checked: false,
        priority: 2,
      },
      'task-3': {
        id: 'task-3',
        title: 'Charge my phone',
        checked: false,
        priority: 3,
      },
      'task-4': {
        id: 'task-4',
        title: 'Cook dinner',
        checked: false,
        priority: 4,
      },
    },
    columns: {
      'to-do': {
        id: 'to-do',
        title: 'To do',
        taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
      },
    },
    columnOrder: ['to-do'],
  },
}
