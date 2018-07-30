import {
  SELECT_SUBREDDIT,
  INVALIDATE_SUBREDDIT,
  REQUEST_POSTS,
  RECEIVE_POSTS,
} from '../actions/actionTypes';
import {
  selectedSubreddit,
  posts,
  postsBySubreddit,
} from './reducers';

describe('Synchronous Reducers', () => {
  describe('selectedSubreddit reducer', () => {
    it('returns the initial state', () => {
      expect(selectedSubreddit(undefined, {})).toEqual('')
    });
    it('handles SELECT_SUBREDDIT', () => {
      const action = { type: SELECT_SUBREDDIT, subreddit: 'apple' };
      const nextAction = { type: SELECT_SUBREDDIT, subreddit: 'gifs' };
  
      expect(selectedSubreddit(undefined, action)).toEqual('apple');
      expect(selectedSubreddit(undefined, nextAction)).toEqual('gifs')
  
    });
  });
});

describe('Asynchronous Reducers', () => {
  describe('posts reducer', () => {
    let action;
    let state;
    it('returns state', () => {
      state = {
        isFetching: false,
        didInvalidate: false,
        items: [],
      }
      expect(posts(undefined, {})).toEqual(state)
    });

    it('handles INVALIDATE_SUBREDDIT', () => {
      action = { type: INVALIDATE_SUBREDDIT };
      state = {
        isFetching: false,
        didInvalidate: true,
        items: [],
      };
      expect(posts(undefined, action)).toEqual(state)
    });

    it('handles REQUEST_POSTS', () => {
      action = { type: REQUEST_POSTS }
      state = {
        isFetching: true,
        didInvalidate: false,
        items: [],
      }
      expect(posts(undefined, action)).toEqual(state);
    });
    it('handles RECEIVE_POSTS', () => {
      const data = [
        { text: 'Post 1' },
        { text: 'Post 2' },
        { text: 'Post 3' },
      ]

      action = {
        type: RECEIVE_POSTS,
        items: data
      };
      state = {
        isFetching: false,
        didInvalidate: false,
        items: data,
        // lastUpdated: action.receivedAt
      }
      expect(posts(undefined, action)).toEqual(state);
    });
  });
  describe('postsBySubreddit reducer', () => {
    it('returns state', () => {
      expect(postsBySubreddit(undefined, {})).toEqual({});
    })
    it('handles INVALIDATE_SUBREDDIT', () => {
      const action = {
        type: INVALIDATE_SUBREDDIT,
        subreddit: 'gifs',
      };

      const state = {
        isFetching: false,
        didInvalidate: true,
        items: [],
      };
      expect(postsBySubreddit({}, action)).toEqual({ [action.subreddit]: state })
    });
    it('handles REQUEST_POSTS', () => {
      const action = {
        type: REQUEST_POSTS,
        subreddit: 'gifs',
        items: [],
      };

      const state = {
        isFetching: true,
        didInvalidate: false,
        items: [],
      };
      expect(postsBySubreddit({}, action)).toEqual({ [action.subreddit]: state })
    });
    it('handles RECEIVE_POSTS', () => {
      const action = {
        type: RECEIVE_POSTS,
        subreddit: 'gifs',
        items: [
          {text: 'Post 1'},
          {text: 'Post 2'},
          {text: 'Post 3'},
        ]
      }
      const state = {
        isFetching: false,
        didInvalidate: false,
        items: [
          {text: 'Post 1'},
          {text: 'Post 2'},
          {text: 'Post 3'},
      ],
      }
      expect(postsBySubreddit(undefined, action)).toEqual({ [action.subreddit]: state })
    })
  })
});