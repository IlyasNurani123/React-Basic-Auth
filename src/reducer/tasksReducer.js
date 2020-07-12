export const tasks = (state, action) => {
  switch (action.type) {
    case 'FETCH_TASKS':
      return { ...state, tasks: action.payload };
    case 'ADD_TASKS':
      return { ...state, tasks: [...state.tasks, action.payload] };
    case 'DELETE_TASK':
      return {
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    default:
      return state;
  }
};

// function addNewTask(tasks, payload) {
//   let list = tasks;
//   list.push(payload);
//   return list;
// }
