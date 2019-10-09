import React from 'react';
import { shallow } from 'enzyme';
import MovieCard from './MovieCard';

it('renders movie card if movie data is passed as prop', () => {
  const movieCard = shallow(<MovieCard movie={{}} />);
  expect(movieCard.type()).not.toEqual(null)
});

it('component type returns null if movie data is not passed as prop', () => {
    const movieCard = shallow(<MovieCard />);
    expect(movieCard.type()).toEqual(null)
})