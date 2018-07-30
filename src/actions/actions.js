import {
  SELECT_SUBREDDIT,
  INVALIDATE_SUBREDDIT,
  REQUEST_POSTS,
  RECEIVE_POSTS,
} from './actionTypes';

// export const selectSubreddit = (subreddit) => {
//   return {
//     type: SELECT_SUBREDDIT,
//     subreddit,
//   };
// };

// export const invalidateSubreddit = (subreddit) => {
//   return {
//     type: INVALIDATE_SUBREDDIT,
//     subreddit,
//   };
// };

export const requestPosts = (subreddit) => {
  return {
    type: REQUEST_POSTS,
    subreddit,
  }
}

export const receivePosts = (subreddit, items) => {
  return {
    type: RECEIVE_POSTS,
    subreddit,
    items,
    // receivedAt: Date.now(),
  }
}

export const fetchPosts = (subreddit) => {
  return dispatch => {
    dispatch(requestPosts(subreddit))
    return fetch(`https://www.reddit.com/r/${subreddit}.json`)
      .then(res => res.json())
      .then(body => dispatch(receivePosts(subreddit, json)))
  }
}