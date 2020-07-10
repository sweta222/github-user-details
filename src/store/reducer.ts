import {
  combinedAction,
  initialState,
  CHANGE,
  SUBMIT,
  ADD_REPOS,
  //ADD_COMMITS,
  ADD_CONTRIBUTIONS,
  ADD_YEARLY_CONTRIBUTIONS,
} from '../interfaces';
const initState: initialState = {
  loginId: '',
  name: '',
  username: '',
  email: '',
  repositories: 0,
  following: 0,
  followers: 0,
  error: '',
  avatar: '',
  grabData: false,
  profile_url: '',
  location: '',
  blog: '',
  repos: [],
  //commits: [],
  contributions: [],
  yearlyContributionsData: [],
  bio: '',
  company: '',
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
        repositories: action.data.public_repos,
        following: action.data.following,
        followers: action.data.followers,
        error: action.data.message,
        avatar: action.data.avatar_url,
        profile_url: action.data.html_url,
        grabData: true,
        location: action.data.location,
        blog: action.data.blog,
        bio: action.data.bio,
        company: action.data.company,
      };
    case ADD_REPOS:
      return {
        ...state,
        repos: action.repos,
      };
    // case ADD_COMMITS:
    //   return {
    //     ...state,
    //     commits: action.commits,
    //   };
    case ADD_CONTRIBUTIONS:
      return { ...state, contributions: action.contributions };
    case ADD_YEARLY_CONTRIBUTIONS:
      return {
        ...state,
        yearlyContributionsData: action.yearlyContributionsData,
      };
    default:
      return state;
  }
};
export default reducer;
