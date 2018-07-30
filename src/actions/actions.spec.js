import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

import {
  SELECT_SUBREDDIT,
  INVALIDATE_SUBREDDIT,
  REQUEST_POSTS,
  RECEIVE_POSTS,
} from "./actionTypes";
import {
  selectSubreddit,
  invalidateSubreddit,
  requestPosts,
  receivePosts,
  fetchPosts,
} from './actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const items = [
    { text: 'Post 1'},
    { text: 'Post 2'},
    { text: 'Post 3'},
]

describe('Synchronous Actions', () => {
  xdescribe('Select Subreddit', () => {
    let expectedAction;
    const subreddit = 'selected subreddit';
    it('returns correct action when selecting subreddit', () => {
      expectedAction = {
          type: SELECT_SUBREDDIT,
          subreddit,
        };
      expect(selectSubreddit(subreddit)).toEqual(expectedAction);
    });
    it('returns correct action when invalidating subreddit', () => {
      expectedAction = {
        type: INVALIDATE_SUBREDDIT,
        subreddit,
      };
      expect(invalidateSubreddit(subreddit)).toEqual(expectedAction)
    });
  })
});

describe('Async Actions', () => {
  let expectedAction;
  const subreddit = 'selected subreddit';
  it('returns correct action when requesting', () => {
    expectedAction = {
      type: REQUEST_POSTS,
      subreddit,
    }
    expect(requestPosts(subreddit)).toEqual(expectedAction);
  })
  
  it('returns correct action when receiving', () => {
    expectedAction = {
      type: RECEIVE_POSTS,
      subreddit,
      items,
      // receivedAt: Date.now(),
    }
    expect(receivePosts(subreddit, items)).toEqual(expectedAction);
  })
})

describe('Async Actions', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  })
  it('dispatches RECEIVE_POSTS on successful fetching', () => {
    const subreddit = 'gifs';
    fetchMock
      .getOnce(`https://www.reddit.com/r/${subreddit}.json`, { body: { items: [] } })

    const expectedActions = [
      { type: REQUEST_POSTS },
      { type: RECEIVE_POSTS, subreddit, items: [] },
    ];

    const store = mockStore({
      selectedSubreddit: subreddit,
      postsBySubreddit: {
        isFetching: false,
        didInvalidate: false,
        items: [],
      }
    })
    
    return store.dispatch(fetchPosts()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    })

    expect(fetchPosts(subreddit)).toEqual()
  })
})