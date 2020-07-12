import React from 'react';

const FirebaseContext = React.createContext(null);

export const withFirebase = (Component) => (props) => (
  <FirebaseContext.Consumer>
    {(firebase) => <Component {...props} firebase={firebase} />}
  </FirebaseContext.Consumer>
);

// export const withFirebase = (Component) => (props) => {
//   return class extends React.Component {
//     render() {
//       // Wraps the input component in a container, without mutating it. Good!
//       return (
//         <FirebaseContext.Consumer>
//           {(firebase) => <Component {...props} firebase={firebase} />}
//         </FirebaseContext.Consumer>
//       );
//     }
//   };
// };

export default FirebaseContext;
