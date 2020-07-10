import { SyntheticEvent } from 'react';
export interface DispatchProps {
  changeUsername: (e: any) => any;
  getUserData: (e: any, username: string) => any;
  getRepos: (username: string) => any;
}
export const CHANGE = 'CHANGE';
export const SUBMIT = 'SUBMIT';
export const ADD_REPOS = 'ADD_REPOS';
//export const ADD_COMMITS = 'ADD_COMMITS';
export const ADD_CONTRIBUTIONS = 'ADD_CONTRIBUTIONS';
export const ADD_YEARLY_CONTRIBUTIONS = 'ADD_YEARLY_CONTRIBUTIONS';

export interface Action1 {
  type: typeof CHANGE;
  e: SyntheticEvent;
}
export interface Action2 {
  type: typeof SUBMIT;
  e: SyntheticEvent;
  data: any;
}
export interface Action3 {
  type: typeof ADD_REPOS;
  repos: any;
}
// export interface Action4 {
//   type: typeof ADD_COMMITS;
//   commits: any;
// }
export interface Action5 {
  type: typeof ADD_CONTRIBUTIONS;
  contributions: any;
}
export interface Action6 {
  type: typeof ADD_YEARLY_CONTRIBUTIONS;
  yearlyContributionsData: any;
}
export interface initialState {
  loginId: string;
  name: string;
  username: string;
  email: string;
  repositories: number;
  following: number;
  followers: number;
  error: string | null | undefined;
  avatar: string;
  grabData: boolean;
  profile_url: any;
  location: string;
  blog: any;
  repos: any[];
  //commits: any[];
  contributions: any[];
  yearlyContributionsData: any[];
  bio: any;
  company: any;
}
export type combinedAction = Action1 | Action2 | Action3 | Action5 | Action6;
