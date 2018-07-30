import { combineReducers } from 'redux';
import { 
  SELECT_SUBREDDIT,
  INVALIDATE_SUBREDDIT,
  REQUEST_POSTS,
  RECEIVE_POSTS,
} from '../actions/actionTypes';

export const selectedSubreddit = (state = '', action) => {
  switch (action.type) {
    case SELECT_SUBREDDIT:
      return action.subreddit;
    default:
      return state;
  }
};

export const posts = (
  state = {
    isFetching: false,
    didInvalidate: false,
    items: [],
  },
  action
) => {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
      return { ...state, didInvalidate: true }
    case REQUEST_POSTS:
      return { ...state, isFetching: true }
    case RECEIVE_POSTS:
      return { ...state, isFetching: false, items: action.items }
    default:
      return state;
  }
};

export const postsBySubreddit = (state = {}, action) => {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
    case REQUEST_POSTS:
    case RECEIVE_POSTS:
      
      return ({
        ...state,
        [action.subreddit]: posts(state[action.subreddit], action),
      })
    default:
      return state;
  }
}

export const rootReducer = combineReducers({
  postsBySubreddit,
  selectedSubreddit,
})