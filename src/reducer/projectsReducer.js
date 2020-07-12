export const projects = (state, action) => {
  switch (action.type) {
    case 'FETCH_PROJECTS':
      return { ...state, projects: action.payload };
    case 'ADD_PROJECTS':
      return { ...state, projects: [...state.projects, action.payload] };
    case 'DELETE_PROJECT':
      return {
        projects: state.projects.filter(
          (project) => project.id !== action.payload
        ),
      };

    default:
      return state;
  }
};
