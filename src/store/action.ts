import { Action1, initialState } from '../interfaces';
import { ThunkAction } from 'redux-thunk';
import { ActionCreator } from 'redux';
import { Action } from 'redux';
import { CHANGE, SUBMIT } from '../interfaces';
export const changeUsername: ActionCreator<Action1> = (e) => {
  return {
    type: CHANGE,
    e: e,
  };
};
export const getUserData = (
  e: any,
  username: string
): ThunkAction<void, initialState, null, Action<string>> => async (
  dispatch
) => {
  e.preventDefault();
  try {
    const res = await fetch(`https://api.github.com/users/${username}`);
    const data = await res.json();
    dispatch({
      type: SUBMIT,
      e: e,
      data,
    });
  } catch (er) {
    console.log(er);
  }
};
