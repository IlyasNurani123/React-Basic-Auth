import { updateTask } from '../services/tasksServices';

export const tasks = (state, action) => {
  switch (action.type) {
    case 'FETCH_TASKS':
      return { ...state, tasks: action.payload };
    case 'ADD_TASKS':
      return { ...state, tasks: [...state.tasks, action.payload] };
    case 'UPDATE_TASKS':
      return {
        ...state,
        tasks: UpdateTaskReducer(state.tasks, action.payload),
      };
    case 'DELETE_TASK':
      return {
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    default:
      return state;
  }
};
function UpdateTaskReducer(state, payload) {
  return state.map((task) => {
    if (task.id === payload.id) {
      return {
        ...task,
        ...payload,
      };
    }
    return updateTask;
  });
}
// function addNewTask(tasks, payload) {
//   let list = tasks;
//   list.push(payload);
//   return list;
// }
