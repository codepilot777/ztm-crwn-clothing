import { takeLatest, put, all, call } from 'typed-redux-saga/macro';
import { User } from 'firebase/auth';

import { USER_ACTION_TYPES } from './user.types';
import { signInSuccess, signInFail, signOutSuccess, signOutFail, signUpSuccess, signUpFail, EmailSignInStart, SignUpStart, SignUpSuccess } from './user.action';
import { getCurrentUser, createUserDocumentFromAuth, signInWithGooglePopup, signInAuthUserwithEmailAndPassword, signOutUser, createAuthUserWithEmailAndPassword, AdditionalInformation } from '../../utils/firebase/firebase.utils';

export function* getSnapshotFromUserAuth(userAuth: User, additionalInformation?: AdditionalInformation) {
  try {
    const userSnapshot = yield* call(createUserDocumentFromAuth, userAuth, additionalInformation);
    if (userSnapshot) {
      yield put(signInSuccess({id: userSnapshot.id, ...userSnapshot.data()}))
    }
  } catch (error) {
    yield put(signInFail(error as Error));
  } 
}

export function* signInWithGoogle() {
  try {
    const { user} = yield* call(signInWithGooglePopup);
    yield* call(getSnapshotFromUserAuth, user)
  } catch (error) {
    yield* put(signInFail(error as Error))
  }
}

export function* signInWithEmail({payload: { email, password }}: EmailSignInStart) {
  try {
    const UserCredential = yield* call(signInAuthUserwithEmailAndPassword, email, password)
    if (UserCredential) {
      const { user } = UserCredential;
      yield* call(getSnapshotFromUserAuth, user)
    }
  } catch (error) {
    yield* put(signInFail(error as Error))
  }
}

export function* signOut () {
  try {
    yield* call(signOutUser)
    yield* put(signOutSuccess())
  } catch (error) {
    yield* put(signOutFail(error as Error))
  }
}

export function* signUp ({ payload: { email, password, displayName}}: SignUpStart) {
  try {
    const UserCredential = yield* call(createAuthUserWithEmailAndPassword, email, password);
    if ( UserCredential ) {
      const { user } = UserCredential;
      yield* put(signUpSuccess(user, { displayName } ))
    }
  } catch (error) {
    yield put(signUpFail(error as Error))
  }
}

export function* signInAfterSignUp ( { payload: { user, additionalInformation }}: SignUpSuccess ) {
  yield call(getSnapshotFromUserAuth, user, additionalInformation);
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield* (call(getCurrentUser));
    if (!userAuth) return;
    yield call(getSnapshotFromUserAuth, userAuth)
  } catch (error) {
    yield put(signInFail(error as Error));
  }
}

export function* onCheckUserSession() {
  yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
  
}

export function* onEmailSignInStart () {
  yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGNIN_START, signInWithEmail)
}

export function* onGoogleSignInStart() {
  yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGNIN_START, signInWithGoogle)
}

export function* onSignOutStart() {
  yield takeLatest(USER_ACTION_TYPES.SIGNOUT_START, signOut)
}

export function* onSignUpStart () {
  yield takeLatest(USER_ACTION_TYPES.SIGNUP_START, signUp)
}

export function* onSignUpSuccess () {
  yield takeLatest(USER_ACTION_TYPES.SIGNUP_SUCCESS, signInAfterSignUp);
}

export function* userSagas() {
  yield all([call(onCheckUserSession), call(onGoogleSignInStart), call(onEmailSignInStart), call(onSignOutStart), call(onSignUpStart), call(onSignUpSuccess)])
}

