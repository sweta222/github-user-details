import {
  Action1,
  initialState,
  Action3,
  //Action4,
  Action5,
} from '../interfaces';
import { ThunkAction } from 'redux-thunk';
import { ActionCreator } from 'redux';
import { Action } from 'redux';
import {
  CHANGE,
  SUBMIT,
  ADD_REPOS,
  //ADD_COMMITS,
  ADD_CONTRIBUTIONS,
  ADD_YEARLY_CONTRIBUTIONS,
} from '../interfaces';
export const changeUsername: ActionCreator<Action1> = (e) => {
  return {
    type: CHANGE,
    e: e,
  };
};
export const getUserData = (
  e: any,
  username: string
): ThunkAction<void, initialState, null, Action<string>> => (dispatch) => {
  e.preventDefault();
  try {
    fetch(`https://api.github.com/users/${username}`)
      .then((res) => res.json())
      .then((data) => {
        //console.log(data);
        dispatch({
          type: SUBMIT,
          e: e,
          data,
        });
        console.log(data);
      });
    fetch(`https://github-contributions-api.now.sh/v1/${username}`)
      .then((response) => response.json())
      .then((respData) => {
        //console.log(respData);
        const contributions = respData.years.map((item: any) => item.total);
        console.log(contributions[0]);
        // const yearContributions = respData.years.map((item: any) => item.year);
        // console.log(yearContributions);

        const sum = contributions.reduce((a: any, b: any) => {
          return a + b;
        });
        dispatch(addContributions(sum));
        dispatch({
          type: ADD_YEARLY_CONTRIBUTIONS,
          yearlyContributionsData: respData.years,
        });
      });
  } catch (er) {
    console.log(er);
  }
};

export const addContributions: ActionCreator<Action5> = (
  contributions: any[]
) => {
  return {
    type: ADD_CONTRIBUTIONS,
    contributions,
  };
};
export const addRepos: ActionCreator<Action3> = (repos: any[]) => {
  return {
    type: ADD_REPOS,
    repos,
  };
};

export const getRepos = (
  username: string
): ThunkAction<void, initialState, null, Action<string>> => (dispatch) => {
  fetch(`https://api.github.com/users/${username}/repos?sort=updated`)
    .then((res) => res.json())
    .then((data) => {
      //console.log(data);
      dispatch(addRepos(data));
      // const repoNames = data.map((item: any) => item.name);
      // const array = repoNames;
      // let i: number;
      // for (i = 0; i < array.length; i++) {
      //   dispatch(getCommits(username, array[i], i));
      // }
    });
};

// export const addCommits: ActionCreator<Action4> = (commits: any[]) => {
//   return {
//     type: ADD_COMMITS,
//     commits,
//   };
// };

// const arrayOfNum: any[] = [];
// export const getCommits = (
//   username: string,
//   userrepo: string,
//   i: number
// ): ThunkAction<void, initialState, null, Action<string>> => (dispatch) => {
//   fetch(`https://api.github.com/repos/${username}/${userrepo}
// /commits?author=${username}`)
//     .then((res) => res.json())
//     .then((data) => {
//       //console.log(data);
//       //console.log(data.length);
//       arrayOfNum[i] = data.length;
//       //console.log(arrayOfNum);
//       const sum = arrayOfNum.reduce((a, b) => {
//         return a + b;
//       });
//       //console.log(sum);
//       dispatch(addCommits(sum));
//     });
// };

// fetch(`https://api.github.com/repos/sweta222/
// sweta222.github.io/languages`)
//   .then((res) => res.json())
//   .then((data) => {
//     console.log(data);
//   });
