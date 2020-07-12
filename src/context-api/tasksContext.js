import React, { createContext, useReducer } from 'react';
import { tasks } from '../reducer/tasksReducer';

export const TasksContext = createContext();
const initialState = {
  tasks: [],
  error: '',
};
export function TasksContextProvider(props) {
  const [state, dispatch] = useReducer(tasks, initialState);
  const value = { state, dispatch };
  return (
    <TasksContext.Provider value={value}>
      {props.children}
    </TasksContext.Provider>
  );
}
