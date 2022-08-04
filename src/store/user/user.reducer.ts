import { AnyAction } from "redux";
import { UserData } from "../../utils/firebase/firebase.utils";
import { signInFail, signOutFail, signUpFail, signOutSuccess, signInSuccess} from "./user.action";

export type UserState = {
  readonly currentUser: UserData | null;
  readonly isLoading: boolean;
  readonly error: Error | null;
}
const USER_INITIAL_STATE: UserState = {
  currentUser: null,
  isLoading: false,
  error: null
}

export const userReducer = (state = USER_INITIAL_STATE, action: AnyAction): UserState => {
    if (signInSuccess.match(action)){
      return {
        ...state,
        currentUser: action.payload
      }
    }

    if ( signOutSuccess.match(action)) {
      return {
        ...state,
        currentUser: null
      }
    }

    if ( signInFail.match(action) || signOutFail.match(action) || signUpFail.match(action)) {
      return {
        ...state,
        error: action.payload
      }
    }
    return state
}

