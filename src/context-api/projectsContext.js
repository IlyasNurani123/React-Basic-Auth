import React from 'react';
import { projects } from '../reducer/projectsReducer';

export const Projects = React.createContext();
const initialState = {
  projects: [],
};
export const ProjectsProvider = (props) => {
  const [state, dispatch] = React.useReducer(projects, initialState);
  const value = { state, dispatch };
  return <Projects.Provider value={value}>{props.children}</Projects.Provider>;
};
