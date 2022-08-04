import { CATEGORIES_ACTION_TYPES, Category } from './category.types';
import { CategoryAction, fetchCategoriesStart, fetchCategoriesSuccess, fetchCategoriesFail } from './category.action';

export type CategoriesState = {
  readonly categoriesArray: Category[];
  readonly isLoading: boolean;
  readonly error: Error | null;
}

export const CATEGORIES_INITIAL_STATE: CategoriesState= {
  categoriesArray: [],
  isLoading: false,
  error: null,
}

export const categoriesReducer = (state = CATEGORIES_INITIAL_STATE, action = {} as CategoryAction) => {
  if (fetchCategoriesStart.match(action)) {
    return {
      ...state,
      isLoading: true
    }
  }

  if (fetchCategoriesSuccess.match(action)) {
    return {
      ...state,
      categoriesArray: action.payload,
      isLoading: false
    }
  }

  if (fetchCategoriesFail.match(action)) {
    return {
      ...state,
      error: action.payload,
      isLoading: false
    }
  }

  return state
}