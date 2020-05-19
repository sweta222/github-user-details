import { combinedAction, initialState, CHANGE, SUBMIT } from '../interfaces';
const initState: initialState = {
  loginId: '',
  name: '',
  username: '',
  email: '',
  repos: 0,
  following: 0,
  followers: 0,
  error: null,
  avatar: '',
  grabData: false,
};
const reducer = (state = initState, action: combinedAction): initialState => {
  switch (action.type) {
    case CHANGE:
      return {
        ...state,
        username: (action.e.target as HTMLInputElement).value,
      };
    case SUBMIT:
      return {
        ...state,
        loginId: action.data.login,
        name: action.data.name,
        email: action.data.email,
        repos: action.data.public_repos,
        following: action.data.following,
        followers: action.data.followers,
        error: action.data.message,
        avatar: action.data.avatar_url,
        grabData: true,
      };
    default:
      return state;
  }
};
export default reducer;

// const reducer = (state = initState, action: combinedAction): initialState => {
//   if (action.type === CHANGE) {
//     return {
//       ...state,
//       username: (action.e.target as HTMLInputElement).value,
//     };
//   } else if (action.type === SUBMIT) {
//     //console.log(action.data);
//     if (action.data.public_repos) {
//       return {
//         ...state,
//         loginId: action.data.login,
//         name: action.data.name,
//         email: action.data.email,
//         repos: action.data.public_repos,
//         following: action.data.following,
//         followers: action.data.followers,
//         error: action.data.message,
//         avatar: action.data.avatar_url,
//         grabData: true,
//       };
//     } else {
//       return { ...state, error: 'User Not Found' };
//     }
//   }
//   return state;
// };
// export default reducer;
