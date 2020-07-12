// import react, { useState, useEffect } from 'react';
// import { AuthUserContext } from './auth-context';
// import { withFirebase } from '../../firebse';

// const withAuthentication = (Component) => {
//   class WithAuthentication extends Component {
//     constructor(props) {
//       super(props);
//       this.state = {
//         authUser: null,
//       };
//     }
//     componentDidMount() {
//       this.listener = this.props.firebase.auth.onAuthStateChanged(
//         (authUser) => {
//           authUser
//             ? this.setState({ authUser })
//             : this.setState({ authUser: null });
//         }
//       );
//     }
//     componentWillUnmount() {
//       this.listener();
//     }
//     render() {
//       return (
//         <AuthUserContext.Provider value={this.state.authUser}>
//           <Component {...this.props} />
//         </AuthUserContext.Provider>
//       );
//     }
//   }
//   return WithAuthentication;
// };

// export default withAuthentication;
