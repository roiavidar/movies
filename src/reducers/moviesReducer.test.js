import moviesReducer from './moviesReducer';
import {
    MOVIE_REQUESTED,
  } from "../constants";

it('action movie requested should set loading to true', () => {
    const movieRequestsAction = {
        type: MOVIE_REQUESTED,
        payload: {
        searcherId: 'test'
        }
    }
    const newState = moviesReducer({}, movieRequestsAction)
    expect(newState).toEqual({"test": {"loading": true}});
});