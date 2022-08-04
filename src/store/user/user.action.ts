import { createAction, withMatcher, Action, ActionWithPayload } from "../../utils/reducer/reducer.utils"
import { AdditionalInformation, UserData } from "../../utils/firebase/firebase.utils"
import { USER_ACTION_TYPES } from "./user.types.js"
import { User } from "firebase/auth";

export type CheckUserSession = Action<USER_ACTION_TYPES.CHECK_USER_SESSION>;
export const checkUserSession = withMatcher(() => createAction(USER_ACTION_TYPES.CHECK_USER_SESSION))

export type SetCurrentUser = ActionWithPayload<USER_ACTION_TYPES.SET_CURRENT_USER, UserData>
export const setCurrentUser = withMatcher((user: UserData) => (
  createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user)
))

export type GoogleSignInStart = Action<USER_ACTION_TYPES.GOOGLE_SIGNIN_START>;
export const googleSignInStart = withMatcher(() =>  createAction(USER_ACTION_TYPES.GOOGLE_SIGNIN_START));

export type EmailSignInStart = ActionWithPayload<USER_ACTION_TYPES.EMAIL_SIGNIN_START, {email:string, password:string}>;
export const emailSignInStart = withMatcher((email: string, password: string) => createAction(USER_ACTION_TYPES.EMAIL_SIGNIN_START, {email, password}));

export type SignInSuccess = ActionWithPayload<USER_ACTION_TYPES.SIGNIN_SUCCESS, UserData>
export const signInSuccess = withMatcher((user: UserData & { id: string }) => createAction(USER_ACTION_TYPES.SIGNIN_SUCCESS, user));

export type SignInFail = ActionWithPayload<USER_ACTION_TYPES.SIGNIN_FAIL, Error>;
export const signInFail = withMatcher((error: Error) => createAction(USER_ACTION_TYPES.SIGNIN_FAIL, error));

export type SignOutStart = Action<USER_ACTION_TYPES.SIGNOUT_START>;
export const signOutStart = withMatcher(() => createAction(USER_ACTION_TYPES.SIGNOUT_START));

export type SignOutSuccess = Action<USER_ACTION_TYPES.SIGNOUT_SUCCESS>;
export const signOutSuccess = withMatcher(() => createAction(USER_ACTION_TYPES.SIGNOUT_SUCCESS));

export type SignOutFail = ActionWithPayload<USER_ACTION_TYPES.SIGNOUT_FAIL, Error>;
export const signOutFail = withMatcher((error: Error) => createAction(USER_ACTION_TYPES.SIGNOUT_FAIL, error));

export type SignUpStart = ActionWithPayload<USER_ACTION_TYPES.SIGNUP_START, { email: string, password: string, displayName: string}>;
export const signUpStart = withMatcher(( email: string, password: string, displayName: string ) => createAction(USER_ACTION_TYPES.SIGNUP_START, { email, password, displayName }));

export type SignUpSuccess = ActionWithPayload<USER_ACTION_TYPES.SIGNUP_SUCCESS, { user: User, additionalInformation: AdditionalInformation }>;
export const signUpSuccess = (user: User, additionalInformation: AdditionalInformation) => createAction(USER_ACTION_TYPES.SIGNUP_SUCCESS, { user, additionalInformation });

export type SignUpFail = ActionWithPayload<USER_ACTION_TYPES.SIGNUP_FAIL, Error>;
export const signUpFail = withMatcher((error:Error) => createAction(USER_ACTION_TYPES.SIGNUP_FAIL, error));