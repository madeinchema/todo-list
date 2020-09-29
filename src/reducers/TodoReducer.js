import { nanoid } from 'nanoid'

export const TodoReducer = (state, action) => {
  // Todo: Don't hardcode 'column-1'
  const column = state.columns['column-1'];
  const newTaskIds = Array.from(column.taskIds);

  switch (action.type) {
    case 'HANDLE_DRAG':
      console.log('action newState', action.newState)
      return action.newState;
    case 'ADD_TODO':
      return [...state, {
        id: nanoid(8),
        title: action.title,
        checked: false,
        indent: 1,
        priority: 4,
      }];
    case 'REMOVE_TODO':
      // Remove selected task from the taskIds
      newTaskIds.splice(action.todo.index, 1);
      // Create object where the selected task is removed
      let obj = {};
      Object.entries(state.tasks).forEach(entry => {
        const [key, value] = entry;
        if (key !== action.todo.id) {
          obj = { ...obj, [key]:value }
        }
      })
      // Update state without the selected taskId and task.
      return {
        ...state,
        columns: {
          'column-1': {
            ...state.columns['column-1'],
            taskIds: newTaskIds,
          }
        },
        tasks: obj,
      }
    case 'EDIT_TODO':
      let targetTaskId;

      return state.columns['column-1'].taskIds.forEach(taskId => {
        if (taskId === action.todo.id) {
          targetTaskId = taskId;

          return {
            ...state,
            tasks: {
              ...state.tasks,
              [targetTaskId]: {
                ...[targetTaskId],
                title: action.todo.title
              }
            }
          }

        }
      })
    case 'HANDLE_CHECKBOX':
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [action.todo.id]: {
            ...action.todo.todo,
            checked: !state.tasks[action.todo.id].checked
          },
        }
      }
    default:
      return state;
  }
};
