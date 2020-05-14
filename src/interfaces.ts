import { SyntheticEvent } from 'react';
export interface DispatchProps {
  changeUsername: (e: any) => any;
  getUserData: (e: any, username: string) => any;
}
export const CHANGE = 'CHANGE';
export const SUBMIT = 'SUBMIT';
export interface Action1 {
  type: typeof CHANGE;
  e: SyntheticEvent;
}
export interface Action2 {
  type: typeof SUBMIT;
  e: SyntheticEvent;
  data: any;
}
export interface initialState {
  name: string;
  username: string;
  email: string;
  repos: number;
  following: number;
  followers: number;
  error: string | null | undefined;
  avatar: string;
  grabData: boolean;
}
export type combinedAction = Action1 | Action2;
