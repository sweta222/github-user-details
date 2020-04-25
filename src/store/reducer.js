const initState = {
  name: '',
  username: '',
  email: '',
  repos: '',
  following: '',
  followers: '',
  error: null,
  avatar: '',
  grabData: false,
};
const reducer = (state = initState, action) => {
  if (action.type === 'CHANGE') {
    //let currentUsername = action.e.target.value;
    //console.log(action.e.target.value);
    return {
      ...state,
      username: action.e.target.value,
    };
  } else if (action.type === 'SUBMIT') {
    console.log(action.data);
    if (action.data.public_repos) {
      return {
        ...state,
        name: action.data.name,
        email: action.data.email,
        repos: action.data.public_repos,
        following: action.data.following,
        followers: action.data.followers,
        error: action.data.message,
        avatar: action.data.avatar_url,
        grabData: true,
      };
    } else {
      return { ...state, error: 'User Not Found' };
    }
  }
  return state;
};
export default reducer;
