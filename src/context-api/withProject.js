import React from 'react';
import { Projects } from './projectsContext';
export default function withProject(WrapperComponent) {
  function withProject(props) {
    return (
      <Projects.Consumer>
        {(projects) => <WrapperComponent {...props} projects={projects} />}
      </Projects.Consumer>
    );
  }
  return withProject;
}
