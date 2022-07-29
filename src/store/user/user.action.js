import { createAction } from "../../utils/reducer/reducer.utils"
import { USER_ACTION_TYPES } from "./user.types.js"

export const setCurrentUser = (user) => (
  createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user)
)

export const checkUserSession = () => createAction(USER_ACTION_TYPES.CHECK_USER_SESSION)

export const googleSignInStart = () =>  createAction(USER_ACTION_TYPES.GOOGLE_SIGNIN_START);

export const emailSignInStart = (email, password) => createAction(USER_ACTION_TYPES.EMAIL_SIGNIN_START, {email, password});

export const signInSuccess = (user) => createAction(USER_ACTION_TYPES.SIGNIN_SUCCESS, user);

export const signInFail = (error) => createAction(USER_ACTION_TYPES.SIGNIN_FAIL, error);

export const signOutStart = () => createAction(USER_ACTION_TYPES.SIGNOUT_START);

export const signOutSuccess = () => createAction(USER_ACTION_TYPES.SIGNOUT_SUCCESS);

export const signOutFail = (error) => createAction(USER_ACTION_TYPES.SIGNOUT_FAIL, error);

export const signUpStart = ( email, password, displayName ) => createAction(USER_ACTION_TYPES.SIGNUP_START, { email, password, displayName });

export const signUpSuccess = (user, additionalInformation) => createAction(USER_ACTION_TYPES.SIGNUP_SUCCESS, { user, additionalInformation });

export const signUpFail = (error) => createAction(USER_ACTION_TYPES.SIGNUP_FAIL, error);